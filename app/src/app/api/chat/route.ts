import { createSupabaseServerClient } from "@/lib/supabase-server"
import OpenAI from "openai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const json = await req.json()
        const { messages } = json
        const latestMessage = messages[messages.length - 1]?.content

        if (!latestMessage) {
            return NextResponse.json({ error: 'No message provided' }, { status: 400 })
        }

        const supabase = createSupabaseServerClient()

        // 1. Auth & Session Check (Real session check)
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check & Increment Usage
        const { checkAndIncrementUsage } = await import('@/lib/usage')
        const usage = await checkAndIncrementUsage(user.id)
        if (!usage.allowed) {
            return NextResponse.json({ error: 'Daily limit reached' }, { status: 429 })
        }

        // 2. Vector Search (Real RAG Implementation)
        const { getEmbedding } = await import("@/lib/embeddings")
        const embedding = await getEmbedding(latestMessage)

        const { data: documents, error: searchError } = await supabase.rpc('match_documents', {
            query_embedding: embedding,
            match_threshold: 0.1, // Adjusted for broader matching during initial build
            match_count: 5
        })

        if (searchError) {
            console.error('Vector Search Error:', searchError)
        }

        const context = documents?.length
            ? documents.map((d: any) => `[Source: ${d.metadata?.regulation} ${d.metadata?.section || ''} ${d.metadata?.title || ''}]\n${d.content}`).join("\n\n---\n\n")
            : "No specific regulatory context found for this query."

        // 3. Provider Selection
        const useDeepSeekDirect = !!process.env.DEEPSEEK_API_KEY
        const apiKey = useDeepSeekDirect ? process.env.DEEPSEEK_API_KEY : process.env.OPENROUTER_API_KEY
        const baseURL = useDeepSeekDirect ? "https://api.deepseek.com" : "https://openrouter.ai/api/v1"
        const model = useDeepSeekDirect ? "deepseek-chat" : "deepseek/deepseek-chat"

        if (!apiKey) {
            return NextResponse.json({ error: 'LLM API key (OpenRouter or DeepSeek) not configured' }, { status: 500 })
        }

        const openai = new OpenAI({
            baseURL,
            apiKey,
            defaultHeaders: !useDeepSeekDirect ? {
                'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
                'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'FARchat',
            } : undefined,
        })

        // 4. LLM Call with Streaming
        const response = await openai.chat.completions.create({
            model,
            messages: [
                {
                    role: 'system',
                    content: `You are FARchat, a professional federal contracting assistant. 
                              Use the provided context to answer questions accurately. 
                              ALWAYS cite your sources using the exact format: [FAR 1.101]. 
                              If the answer is not in the context, say you don't know based on the provided regulations.
                              
                              Context:
                              ${context}`
                },
                ...messages
            ],
            stream: true,
        })

        // Convert OpenAI stream to a Web Stream for Next.js response
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of response) {
                    const content = chunk.choices[0]?.delta?.content || ""
                    controller.enqueue(new TextEncoder().encode(content))
                }
                controller.close()
            },
        })

        return new Response(stream)

    } catch (error: any) {
        console.error('Chat API Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

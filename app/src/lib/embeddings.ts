import OpenAI from 'openai'

/**
 * Generates an embedding for a given text using OpenRouter (OpenAI-compatible).
 */
export async function getEmbedding(text: string): Promise<number[]> {
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY
    const baseURL = process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1' : undefined
    const model = process.env.EMBEDDING_MODEL || 'openai/text-embedding-3-small'
    const dimensions = parseInt(process.env.EMBEDDING_DIM || '1536')

    if (!apiKey) {
        throw new Error('LLM API key (OpenRouter or OpenAI) not configured for embeddings')
    }

    const openai = new OpenAI({
        apiKey,
        baseURL,
        defaultHeaders: process.env.OPENROUTER_API_KEY ? {
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'FARchat',
        } : undefined,
    })

    // Clean text for embedding
    const input = text.replace(/\n/g, ' ')

    const response = await openai.embeddings.create({
        model,
        input,
        // Dimensions are only supported by some OpenAI models (like text-embedding-3-small/large)
        // Pass it only if it's an OpenAI model
        ...(model.toLowerCase().includes('openai') ? { extra_body: { dimensions } } : {}),
    } as any)

    const data = (response as any).data
    if (!data || data.length === 0) {
        throw new Error('No valid embedding returned from API')
    }

    return data[0].embedding
}

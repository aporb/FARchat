import { NextRequest, NextResponse } from "next/server"

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5 // 5 requests per minute

function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const record = rateLimitMap.get(ip)

    if (!record) {
        rateLimitMap.set(ip, { count: 1, timestamp: now })
        return false
    }

    if (now - record.timestamp > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, timestamp: now })
        return false
    }

    if (record.count >= MAX_REQUESTS) {
        return true
    }

    record.count++
    return false
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
            request.headers.get("x-real-ip") ||
            "unknown"

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            )
        }

        const body = await request.json()
        const { name, email, company, subject, message } = body

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            )
        }

        // In production, you would:
        // 1. Send email via SendGrid, AWS SES, or similar
        // 2. Store in database
        // 3. Send to CRM like HubSpot or Salesforce

        // For now, log the submission (replace with actual implementation)
        console.log("Contact form submission:", {
            name,
            email,
            company: company || "Not provided",
            subject,
            message,
            timestamp: new Date().toISOString(),
        })

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        return NextResponse.json(
            { success: true, message: "Message sent successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Contact form error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

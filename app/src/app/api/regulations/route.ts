import { NextResponse } from 'next/server'
import { createSupabaseBasicClient } from '@/lib/supabase-server'

export interface RegulationStats {
  regulation: string
  documentCount: number
}

export interface RegulationsApiResponse {
  stats: RegulationStats[]
  totalDocuments: number
  lastUpdated: string | null
}

/**
 * GET /api/regulations
 *
 * Returns document counts grouped by regulation from the document_chunks table.
 * Uses the metadata->>'regulation' field to group documents.
 */
export async function GET() {
  try {
    const supabase = createSupabaseBasicClient()

    // Query to get document counts per regulation
    // Uses raw SQL via rpc for the GROUP BY operation
    const { data, error } = await supabase.rpc('get_regulation_stats')

    if (error) {
      // If the function doesn't exist, fall back to a simpler query
      if (error.code === '42883') {
        // Function not found - use alternative approach
        const { data: chunks, error: chunksError } = await supabase
          .from('document_chunks')
          .select('metadata')

        if (chunksError) {
          console.error('Error fetching document chunks:', chunksError)
          return NextResponse.json(
            { error: 'Failed to fetch regulation stats' },
            { status: 500 }
          )
        }

        // Count documents per regulation manually
        const counts: Record<string, number> = {}
        let total = 0

        for (const chunk of chunks || []) {
          const regulation = chunk.metadata?.regulation
          if (regulation) {
            counts[regulation] = (counts[regulation] || 0) + 1
            total++
          }
        }

        const stats: RegulationStats[] = Object.entries(counts).map(
          ([regulation, documentCount]) => ({
            regulation,
            documentCount,
          })
        )

        return NextResponse.json({
          stats,
          totalDocuments: total,
          lastUpdated: new Date().toISOString(),
        } satisfies RegulationsApiResponse)
      }

      console.error('Error fetching regulation stats:', error)
      return NextResponse.json(
        { error: 'Failed to fetch regulation stats' },
        { status: 500 }
      )
    }

    // Calculate total
    const stats: RegulationStats[] = data || []
    const totalDocuments = stats.reduce(
      (sum, stat) => sum + stat.documentCount,
      0
    )

    return NextResponse.json({
      stats,
      totalDocuments,
      lastUpdated: new Date().toISOString(),
    } satisfies RegulationsApiResponse)
  } catch (error) {
    console.error('Unexpected error in regulations API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

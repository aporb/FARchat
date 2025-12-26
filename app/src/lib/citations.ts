/**
 * Regulation URL mapping for acquisition.gov
 * Reference: https://www.acquisition.gov/content/regulations
 */
export const REGULATION_URLS: Record<string, string> = {
    'FAR': 'https://www.acquisition.gov/far/',
    'DFARS': 'https://www.acquisition.gov/dfars/',
    'VAAR': 'https://www.acquisition.gov/vaar/',
    'GSAM': 'https://www.acquisition.gov/gsam/',
    'AFARS': 'https://www.acquisition.gov/afars/',
    'DARS': 'https://www.acquisition.gov/dars/',
    'DLAD': 'https://www.acquisition.gov/dlad/',
    'DOLAR': 'https://www.acquisition.gov/dolar/',
    'DOSAR': 'https://www.acquisition.gov/dosar/',
    'EDAR': 'https://www.acquisition.gov/edar/',
    'EPAAR': 'https://www.acquisition.gov/epaar/',
    'HHSAR': 'https://www.acquisition.gov/hhsar/',
    'HSAR': 'https://www.acquisition.gov/hsar/',
    'HUDAR': 'https://www.acquisition.gov/hudar/',
    'IAAR': 'https://www.acquisition.gov/iaar/',
    'JAR': 'https://www.acquisition.gov/jar/',
    'LIFAR': 'https://www.acquisition.gov/lifar/',
    'NFS': 'https://www.acquisition.gov/nfs/',
    'NRCAR': 'https://www.acquisition.gov/nrcar/',
    'TAR': 'https://www.acquisition.gov/tar/',
    'TRANSFAR': 'https://www.acquisition.gov/transfar/',
    'AIDAR': 'https://www.acquisition.gov/aidar/',
    'AGAR': 'https://www.acquisition.gov/agar/',
    'CAR': 'https://www.acquisition.gov/car/',
    'DEAR': 'https://www.acquisition.gov/dear/',
    'DIAR': 'https://www.acquisition.gov/diar/',
}

/**
 * Generate a URL for a regulation citation
 * @param regulation - The regulation type (FAR, DFARS, etc.)
 * @param section - The section number (e.g., "52.212-1")
 * @returns The URL or null if regulation type is unknown
 *
 * @example
 * getCitationUrl('FAR', '52.212-1')
 * // Returns: 'https://www.acquisition.gov/far/52.212-1'
 *
 * getCitationUrl('DFARS', '252.225-7001')
 * // Returns: 'https://www.acquisition.gov/dfars/252.225-7001'
 */
export function getCitationUrl(regulation: string, section: string): string | null {
    const normalizedReg = regulation.toUpperCase().trim()
    const baseUrl = REGULATION_URLS[normalizedReg]

    if (!baseUrl) {
        console.warn(`Unknown regulation type: ${regulation}`)
        return null
    }

    // Format section: lowercase, replace spaces with hyphens
    const formattedSection = section.toLowerCase().replace(/\s+/g, '-')

    return `${baseUrl}${formattedSection}`
}

/**
 * Check if a regulation type is supported
 */
export function isKnownRegulation(regulation: string): boolean {
    return regulation.toUpperCase().trim() in REGULATION_URLS
}

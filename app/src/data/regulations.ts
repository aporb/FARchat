/**
 * Federal Acquisition Regulation Library Metadata
 *
 * This file contains static metadata for all regulation libraries available in FARchat.
 * Document counts are fetched dynamically from the database.
 */

export type RegulationCategory = 'core' | 'defense' | 'civilian'

export interface Regulation {
  /** Unique identifier matching metadata.regulation in document_chunks */
  id: string
  /** Display abbreviation (e.g., "FAR", "DFARS") */
  abbreviation: string
  /** Full official name */
  fullName: string
  /** Issuing agency */
  agency: string
  /** Agency abbreviation for badges */
  agencyAbbr: string
  /** Brief description of scope and purpose */
  description: string
  /** Parts coverage (e.g., "Parts 1-53") */
  coverage: string
  /** Regulation category for grouping */
  category: RegulationCategory
  /** Parent regulation ID if this is a supplement */
  parentRegulation?: string
  /** Official external URL */
  officialUrl: string
  /** FARchat search URL with pre-filter */
  searchUrl: string
  /** Whether this regulation is currently loaded in the RAG database */
  isActive: boolean
}

export const REGULATIONS: Regulation[] = [
  // ============================================
  // CORE FEDERAL REGULATIONS
  // ============================================
  {
    id: 'FAR',
    abbreviation: 'FAR',
    fullName: 'Federal Acquisition Regulation',
    agency: 'Government-wide',
    agencyAbbr: 'FAR',
    description: 'The primary regulation governing federal procurement. Establishes uniform policies and procedures for acquisition by all executive agencies.',
    coverage: 'Parts 1-53',
    category: 'core',
    officialUrl: 'https://www.acquisition.gov/far',
    searchUrl: '/search?regulation=FAR',
    isActive: true,
  },
  {
    id: 'DFARS',
    abbreviation: 'DFARS',
    fullName: 'Defense Federal Acquisition Regulation Supplement',
    agency: 'Department of Defense',
    agencyAbbr: 'DOD',
    description: 'Supplements the FAR with policies and procedures specific to defense acquisitions. Required for all DoD contracts.',
    coverage: 'Parts 201-253',
    category: 'core',
    parentRegulation: 'FAR',
    officialUrl: 'https://www.acquisition.gov/dfars',
    searchUrl: '/search?regulation=DFARS',
    isActive: true,
  },
  {
    id: 'DFARSPGI',
    abbreviation: 'DFARS PGI',
    fullName: 'DFARS Procedures, Guidance, and Information',
    agency: 'Department of Defense',
    agencyAbbr: 'DOD',
    description: 'Companion resource to DFARS providing detailed procedures, guidance, and information for implementing DFARS policies.',
    coverage: 'Parts 201-253',
    category: 'core',
    parentRegulation: 'DFARS',
    officialUrl: 'https://www.acquisition.gov/dfars/pgi',
    searchUrl: '/search?regulation=DFARSPGI',
    isActive: true,
  },

  // ============================================
  // DEFENSE AGENCY SUPPLEMENTS
  // ============================================
  {
    id: 'AFARS',
    abbreviation: 'AFARS',
    fullName: 'Army Federal Acquisition Regulation Supplement',
    agency: 'U.S. Army',
    agencyAbbr: 'ARMY',
    description: 'Implements and supplements DFARS for Army contracting activities. Provides Army-specific acquisition policies and procedures.',
    coverage: 'Parts 5101-5153',
    category: 'defense',
    parentRegulation: 'DFARS',
    officialUrl: 'https://www.acquisition.gov/afars',
    searchUrl: '/search?regulation=AFARS',
    isActive: true,
  },
  {
    id: 'DAFFARS',
    abbreviation: 'DAFFARS',
    fullName: 'Department of the Air Force Federal Acquisition Regulation Supplement',
    agency: 'U.S. Air Force',
    agencyAbbr: 'USAF',
    description: 'Air Force supplement to DFARS. Governs acquisition procedures for Air Force and Space Force contracting.',
    coverage: 'Parts 5301-5353',
    category: 'defense',
    parentRegulation: 'DFARS',
    officialUrl: 'https://www.acquisition.gov/daffars',
    searchUrl: '/search?regulation=DAFFARS',
    isActive: true,
  },
  {
    id: 'NMCARS',
    abbreviation: 'NMCARS',
    fullName: 'Navy Marine Corps Acquisition Regulation Supplement',
    agency: 'U.S. Navy & Marine Corps',
    agencyAbbr: 'NAVY',
    description: 'Supplements DFARS for Navy and Marine Corps acquisitions. Includes guidance for naval shipbuilding and marine equipment.',
    coverage: 'Parts 5201-5253',
    category: 'defense',
    parentRegulation: 'DFARS',
    officialUrl: 'https://www.acquisition.gov/nmcars',
    searchUrl: '/search?regulation=NMCARS',
    isActive: true,
  },
  {
    id: 'SOFARS',
    abbreviation: 'SOFARS',
    fullName: 'Special Operations Forces Acquisition Regulation Supplement',
    agency: 'U.S. Special Operations Command',
    agencyAbbr: 'SOCOM',
    description: 'DFARS supplement for USSOCOM acquisitions. Addresses unique requirements for special operations equipment and services.',
    coverage: 'Parts 5601-5653',
    category: 'defense',
    parentRegulation: 'DFARS',
    officialUrl: 'https://www.acquisition.gov/sofars',
    searchUrl: '/search?regulation=SOFARS',
    isActive: true,
  },
  {
    id: 'DLAD',
    abbreviation: 'DLAD',
    fullName: 'Defense Logistics Acquisition Directive',
    agency: 'Defense Logistics Agency',
    agencyAbbr: 'DLA',
    description: 'DLA supplement to DFARS. Covers logistics, supply chain, and wholesale acquisition procedures.',
    coverage: 'Parts 5101-5153',
    category: 'defense',
    parentRegulation: 'DFARS',
    officialUrl: 'https://www.acquisition.gov/dlad',
    searchUrl: '/search?regulation=DLAD',
    isActive: true,
  },

  // ============================================
  // CIVILIAN AGENCY SUPPLEMENTS
  // ============================================
  {
    id: 'GSAM',
    abbreviation: 'GSAM',
    fullName: 'General Services Administration Acquisition Manual',
    agency: 'General Services Administration',
    agencyAbbr: 'GSA',
    description: 'GSA supplement to the FAR. Essential for GSA Schedule contracts, federal supply schedules, and government-wide acquisition contracts.',
    coverage: 'Parts 501-570',
    category: 'civilian',
    parentRegulation: 'FAR',
    officialUrl: 'https://www.acquisition.gov/gsam',
    searchUrl: '/search?regulation=GSAM',
    isActive: true,
  },
  {
    id: 'VAAR',
    abbreviation: 'VAAR',
    fullName: 'Veterans Affairs Acquisition Regulation',
    agency: 'Department of Veterans Affairs',
    agencyAbbr: 'VA',
    description: 'VA supplement to the FAR. Includes special provisions for veteran-owned small businesses and healthcare acquisitions.',
    coverage: 'Parts 801-873',
    category: 'civilian',
    parentRegulation: 'FAR',
    officialUrl: 'https://www.acquisition.gov/vaar',
    searchUrl: '/search?regulation=VAAR',
    isActive: true,
  },
  {
    id: 'DARS',
    abbreviation: 'DARS',
    fullName: 'Department of Energy Acquisition Regulation Supplement',
    agency: 'Department of Energy',
    agencyAbbr: 'DOE',
    description: 'DOE supplement to the FAR. Covers energy research, nuclear facilities, and national laboratory acquisitions.',
    coverage: 'Parts 901-970',
    category: 'civilian',
    parentRegulation: 'FAR',
    officialUrl: 'https://www.acquisition.gov/dears',
    searchUrl: '/search?regulation=DARS',
    isActive: true,
  },
]

// Helper functions
export function getRegulationById(id: string): Regulation | undefined {
  return REGULATIONS.find(r => r.id === id)
}

export function getRegulationsByCategory(category: RegulationCategory): Regulation[] {
  return REGULATIONS.filter(r => r.category === category)
}

export function getActiveRegulations(): Regulation[] {
  return REGULATIONS.filter(r => r.isActive)
}

export function getCoreRegulations(): Regulation[] {
  return getRegulationsByCategory('core')
}

export function getDefenseSupplements(): Regulation[] {
  return getRegulationsByCategory('defense')
}

export function getCivilianSupplements(): Regulation[] {
  return getRegulationsByCategory('civilian')
}

// Category metadata for display
export const CATEGORY_INFO = {
  core: {
    title: 'Core Federal Regulations',
    description: 'Foundation regulations that apply across the federal government',
    color: 'blue',
  },
  defense: {
    title: 'Defense Agency Supplements',
    description: 'Military branch and defense agency-specific supplements to DFARS',
    color: 'slate',
  },
  civilian: {
    title: 'Civilian Agency Supplements',
    description: 'Non-defense agency supplements to the FAR',
    color: 'green',
  },
} as const

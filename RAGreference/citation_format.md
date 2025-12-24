# Citation Format for Regulatory References

## Standard Citation Formats

### Federal Acquisition Regulation (FAR)

| Format | Example | Description |
|--------|---------|-------------|
| Section | `[FAR 1.101]` | Basic section reference |
| Part | `[FAR Part 15]` | Entire part |
| Subpart | `[FAR Subpart 15.4]` | Subpart reference |
| Full | `[48 CFR Chapter 1, Part 15]` | CFR format |
| Section + Title | `[FAR 1.101 - Scope of part]` | Section with title |

### Defense FAR Supplement (DFARS)

| Format | Example | Description |
|--------|---------|-------------|
| Section | `[DFARS 252.234-7001]` | Basic section reference |
| Part | `[DFARS Part 225]` | Entire part |
| Appendix | `[DFARS Appendix F]` | Appendix reference |

### VA Acquisition Regulation (VAAR)

| Format | Example | Description |
|--------|---------|-------------|
| Section | `[VAAR 801.603]` | Basic section reference |
| Part | `[VAAR Part 801]` | Entire part |

## Citation Parsing

### Regular Expression Pattern
```regex
\[(FAR|DFARS|VAAR|AFARS|DFARS\s*[A-Z]+)\s*([\d\.\-]+)(?:\s*[-–]\s*([^\]]+))?\]
```

### Parsing Groups
1. **Regulation Type:** FAR, DFARS, VAAR, etc.
2. **Section Number:** The numeric portion (e.g., "1.101", "252.234-7001")
3. **Optional Title:** Text after dash (e.g., "Scope of part")

### Example Parsing
```typescript
const pattern = /\[(FAR|DFARS|VAAR|AFARS|DFARS\s*[A-Z]+)\s*([\d\.\-]+)(?:\s*[-–]\s*([^\]]+))?\]/gi;

const citations = [
    "[FAR 1.101]",              // { type: "FAR", section: "1.101" }
    "[DFARS 252.234-7001]",     // { type: "DFARS", section: "252.234-7001" }
    "[FAR 15.403-1 - Definitions]"  // { type: "FAR", section: "15.403-1", title: "Definitions" }
];
```

## Source Links

### URL Construction

| Regulation | Base URL | Example |
|------------|----------|---------|
| FAR | `https://www.acquisition.gov/far/` | `https://www.acquisition.gov/far/15.403` |
| DFARS | `https://www.acquisition.gov/dfars/` | `https://www.acquisition.gov/dfars/252.234` |
| VAAR | `https://www.va.gov/vaar/` | `https://www.va.gov/vaar/801.603` |

### Link Generation
```typescript
function getSourceUrl(regulation: string, section: string): string {
    const baseUrls: Record<string, string> = {
        'FAR': 'https://www.acquisition.gov/far/',
        'DFARS': 'https://www.acquisition.gov/dfars/',
        'VAAR': 'https://www.va.gov/vaar/',
    };

    const base = baseUrls[regulation] || baseUrls['FAR'];
    return `${base}${section}`;
}

// Examples
getSourceUrl('FAR', '1.101');        // https://www.acquisition.gov/far/1.101
getSourceUrl('DFARS', '252.234-7001');  // https://www.acquisition.gov/dfars/252.234
```

## Citation in AI Responses

### Required Format
All responses must cite sources using the format:
```
[FAR X.Y] or [DFARS X.Y-Z]
```

### Example Response
> The contracting officer must determine fair and reasonable pricing (see [FAR 15.403-1]).
> For commercial item determinations, refer to the definitions in [FAR 2.101].
> Sole source awards over $25M require additional documentation per [DFARS 215.304-70].

### Response Validation
```typescript
function validateCitationFormat(response: string): boolean {
    // Check that responses contain at least one citation
    const hasCitation = /\[(FAR|DFARS|VAAR|AFARS)\s*[\d\.\-]+\]/.test(response);
    return hasCitation;
}
```

## Best Practices

1. **Use exact section numbers** - Don't approximate
2. **Include context** - Reference the regulation's purpose
3. **Link to authoritative sources** - acquisition.gov is official
4. **Format consistently** - Use brackets: `[FAR X.Y]`
5. **Verify before citing** - Ensure the cited section exists

---
type: llm
---

PASS if it uses createTheme with colorSchemes for light and dark (or the CSS variables color-scheme API) and adds TypeScript module augmentation for the brand palette entry. FAIL if it hard-codes hex values without tokens, or the custom color has no type augmentation.

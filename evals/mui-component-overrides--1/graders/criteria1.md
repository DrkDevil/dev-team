---
type: llm
---

PASS if it uses theme components.MuiButton with styleOverrides (theme callback) and defines the ghost variant through variants plus module augmentation of ButtonPropsVariantOverrides. FAIL if it styles buttons with one-off sx or a global CSS file, or adds the variant without typing it.

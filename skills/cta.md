## LAYER 1: THE PROMPT (The "What" – Structural Blueprint)
Target Component: CTA_Section
Layout Rules:
- Render a centered layout container located directly beneath the design infrastructure catalog.
- Include a heading displaying the query text: "Need more Designs?".
- Center an action button with the lowercase text "sign in" beneath the heading.
- Apply a vertical height padding constraint (`padding: 60px 24px;`) to anchor the visual weight.

## LAYER 2: THE SKILL (The "How" – Abstract Design Tokens)
Skill Name: CTA_Glow_Engine
Execution Logic:
- IF element == "cta_container": Apply property `background-color: #000000` (or dynamic page background) AND `display: flex` AND `flex-direction: column` AND `align-items: center`.
- IF element == "cta_text": Apply property `font-family: "Geist Mono", monospace` AND `font-weight: 300` AND `font-size: 20px`.
- IF element == "cta_btn": Apply property `background-color: #ffffff` AND `color: #000000` AND `font-family: "Geist Mono", monospace` AND `font-weight: 500` AND `border: 2px solid transparent` AND `border-radius: 8px`.
- IF button_state == "glow": Apply a rotating Google-brand color gradient border animation (`linear-gradient(120deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4)`) and hover-state scale transformations.

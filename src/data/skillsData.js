export const SKILLS_DATA = [
  {
    id: 'landing-writings',
    category: 'landing',
    mdContent: `## LAYER 1: THE PROMPT (The "What" - Structural Blueprint)
Target Component: Stark_Action_Button
Layout Rules:
- Render a padding-constrained element (\`padding: 8px 16px;\`) with inline flex alignment.
- Constrain shape structure with a sharp corner radius (\`border-radius: 4px;\`).

## LAYER 2: THE SKILL (The "How" - Abstract Design Tokens)
Execution Logic:
- IF element == "button": Apply property \`background-color: #000000\` AND \`color: #FFFFFF\` AND \`border: 1px solid #000000\`
- IF button_state == "hover": Apply property \`background-color: #FFFFFF\` AND \`color: #000000\``
  },
  {
    id: 'landing-firecrawl',
    category: 'landing',
    mdContent: `## LAYER 1: THE PROMPT (The "What" - Structural Blueprint)
Target Component: Pill_Action_Button
Layout Rules:
- Render a capsule-like structure with complete rounded edges (\`border-radius: 9999px;\`).
- Provide horizontal padding of 20px and vertical of 8px.

## LAYER 2: THE SKILL (The "How" - Abstract Design Tokens)
Execution Logic:
- IF element == "button": Apply property \`background-color: #0c0817\` AND \`color: #00ffcc\` AND \`border: 1px solid #ff0055\`
- IF button_state == "hover": Apply property \`background-color: #ff0055\` AND \`color: #ffffff\``
  },
  {
    id: 'hero-monochrome',
    category: 'hero',
    mdContent: `## LAYER 1: THE PROMPT (The "What" - Structural Blueprint)
Target Component: Hero_Container
Layout Rules:
- Height bounded at 100px. Left-align display headers and track navigation.

## LAYER 2: THE SKILL (The "How" - Abstract Design Tokens)
Execution Logic:
- IF element == "hero_container": Apply property \`background-color: #FFFFFF\` AND \`border-bottom: 1px solid #000000\`
- IF element == "heading": Apply property \`font-family: "Geist Mono", monospace\` AND \`font-size: 24px\``
  },
  {
    id: 'hero-neon',
    category: 'hero',
    mdContent: `## LAYER 1: THE PROMPT (The "What" - Structural Blueprint)
Target Component: Hero_Panel
Layout Rules:
- Setup a horizontal panel with 120px height and padded margins.

## LAYER 2: THE SKILL (The "How" - Abstract Design Tokens)
Execution Logic:
- IF element == "hero_panel": Apply property \`background-color: #0c0817\` AND \`border-bottom: 2px solid #ff0055\``
  },
  {
    id: 'nav-minimal',
    category: 'nav',
    mdContent: `## LAYER 1: THE PROMPT (The "What" - Structural Blueprint)
Target Component: App_Top_Navigation_Bar
Layout Rules:
- Render a 100% full-width horizontal container positioned fixed at the top of the viewport.
- Set a strict container height boundary of 72px with a bottom border.

## LAYER 2: THE SKILL (The "How" - Abstract Design Tokens)
Execution Logic:
- IF element == "container": Apply property \`background-color: #FFFFFF\` AND \`border-bottom: 1px solid #000000\`
- IF element == "indented": Apply property \`font-family: "Geist Mono", monospace\` AND \`font-weight: 300\``
  },
  {
    id: 'nav-cyberpunk',
    category: 'nav',
    mdContent: `## LAYER 1: THE PROMPT (The "What" - Structural Blueprint)
Target Component: Cyberpunk_Navigation_Bar
Layout Rules:
- Render a 100% full-width horizontal container positioned fixed at the top of the viewport.
- Set container height boundary of 72px with a neon-pink bottom border.

## LAYER 2: THE SKILL (The "How" - Abstract Design Tokens)
Execution Logic:
- IF element == "container": Apply property \`background-color: #0c0817\` AND \`border-bottom: 2px solid #ff0055\`
- IF element == "logo": Apply property \`font-family: "Geist Mono", monospace\` AND \`color: #00ffcc\` AND \`text-shadow: 0 0 8px rgba(0, 255, 204, 0.4)\`
- IF element == "nav_links": Apply property \`color: #ff0055\` AND \`font-size: 14px\``
  },
  {
    id: 'footer-stark',
    category: 'footer',
    mdContent: `## LAYER 1: THE PROMPT (The "What" - Structural Blueprint)
Target Component: Global_System_Footer
Layout Rules:
- Apply a vertical height constraint of 64px. Positioned fixed at bottom of viewport.

## LAYER 2: THE SKILL (The "How" - Abstract Design Tokens)
Execution Logic:
- IF element == "footer_container": Apply property \`background-color: #FFFFFF\` AND \`border-top: 1px solid #000000\`
- IF element == "copyright_text": Apply property \`font-family: "Geist Mono", monospace\` AND \`font-weight: 300\``
  },
  {
    id: 'pricing-monochrome',
    category: 'pricing',
    mdContent: `## LAYER 1: THE PROMPT (The "What" - Structural Blueprint)
Target Component: Founder_Pricing_Plans
Layout Rules:
- Layout cards in side-by-side flex grid configuration with 1px solid lines separating them.

## LAYER 2: THE SKILL (The "How" - Abstract Design Tokens)
Execution Logic:
- IF element == "pricing_card": Apply property \`border: 1px solid #000000\` AND \`background-color: #FFFFFF\`
- IF card_state == "hover": Apply property \`background-color: #000000\` AND \`color: #FFFFFF\``
  },
  {
    id: 'pricing-cyberpunk',
    category: 'pricing',
    mdContent: `## LAYER 1: THE PROMPT (The "What" - Structural Blueprint)
Target Component: Cyberpunk_Pricing_Plans
Layout Rules:
- Layout cards in side-by-side flex grid configuration with glowing neon borders.

## LAYER 2: THE SKILL (The "How" - Abstract Design Tokens)
Execution Logic:
- IF element == "pricing_card": Apply property \`border: 1px solid #ff0055\` AND \`background-color: #0c0817\`
- IF card_state == "hover": Apply property \`background-color: #ff0055\` AND \`color: #ffffff\` AND \`box-shadow: 0 0 15px rgba(255, 0, 85, 0.4)\``
  },
  {
    id: 'faq-stark',
    category: 'faq',
    mdContent: `## LAYER 1: THE PROMPT (The "What" - Structural Blueprint)
Target Component: FAQ_Grid
Layout Rules:
- Layout questions in vertical lists separated by 1px solid borders.

## LAYER 2: THE SKILL (The "How" - Abstract Design Tokens)
Execution Logic:
- IF element == "faq_card": Apply property \`background-color: #FFFFFF\` AND \`border-bottom: 1px solid #000000\`
- IF element == "question": Apply property \`font-weight: 500\``
  },
  {
    id: 'faq-glass',
    category: 'faq',
    mdContent: `## LAYER 1: THE PROMPT (The "What" - Structural Blueprint)
Target Component: FAQ_Grid
Layout Rules:
- Render list of boxes on a blurred glass element backdrop.

## LAYER 2: THE SKILL (The "How" - Abstract Design Tokens)
Execution Logic:
- IF element == "faq_card": Apply property \`background-color: rgba(20,16,28,0.4)\` AND \`backdrop-filter: blur(10px)\``
  }
];

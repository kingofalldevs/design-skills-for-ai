## LAYER 1: THE PROMPT (The "What" – Structural Blueprint)
Target Component: Features_Section
Layout Rules:
- Render a grid layout containing 4 feature cards representing the technical specifications of Design Infrastructure for Agents.
- The outer container must be centered with a max-width limit of 1100px.
- Heading text must read: "features_and_specifications".
- Each card will display a monospace header and short descriptive text, formatted with an icon aligned at the top left.

## LAYER 2: THE SKILL (The "How" – Abstract Design Tokens)
Skill Name: Features_Grid_Engine
Execution Logic:
- IF element == "features_container": Apply property `width: 90%` AND `max-width: 1100px` AND `margin: 0 auto` AND `border-top: 1px solid rgba(255, 255, 255, 0.08)` (or light mode equivalent).
- IF element == "features_header": Apply property `font-family: "Geist Mono", monospace` AND `font-size: 16px` AND `text-transform: lowercase` AND `opacity: 0.6`.
- IF element == "features_grid": Apply property `display: grid` AND `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))` AND `gap: 32px`.
- IF element == "feature_card": Apply property `border: 1px solid rgba(255, 255, 255, 0.05)` (light mode: `rgba(0, 0, 0, 0.05)`) AND `border-radius: 8px` AND `padding: 24px` AND transition transitions for hover transforms.
- IF card_state == "hover": Apply property `transform: translateY(-2px)` AND `border-color: var(--border-color)`.

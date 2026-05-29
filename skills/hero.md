## LAYER 1: THE PROMPT (The "What" – Structural Blueprint)
Target Component: Marketplace_Hero_Zone
Layout Rules:
- Render a strict, 100px-height container (`height: 100px;`) spanning 100% full-width to keep the core viewport compact and focused.
- Inside the main hero space, vertically center (`align-items: center;`) a single, prominent display heading that introduces the product inventory: "Design Infrastructure for Agents".
- Directly below the 100px boundary, render an attached horizontal navigation track containing exactly three inline text links: "buttons", "hero", and "faq".
- Format the track links using a flex-row container with a precise 24px gap, left-aligned to the main viewport padding grid.
- Ensure all text within the links utilizes explicit lowercase formatting for a clean, developer-centric aesthetic.

## LAYER 2: THE SKILL (The "How" – Abstract Design Tokens)
Skill Name: Hero_Styling_Engine
Execution Logic:
- IF element == "hero_container": Apply property `background-color: #FFFFFF` AND `border-bottom: 1px solid #000000`.
- IF element == "heading": Apply property `font-family: "Geist Mono", monospace` AND `color: #000000` AND `font-weight: 700` AND `font-size: 32px` AND `letter-spacing: -0.02em`.
- IF element == "nav_track_links": Apply property `color: #000000` AND `font-size: 13px` AND `font-family: "Geist Mono", monospace` AND `text-decoration: none`.
- IF link_state == "active/hover": Apply property `border-bottom: 2px solid #000000` AND `padding-bottom: 4px` (Provides a sharp visual underline marker for the active view).
- Validation Step: Double-check the total vertical footprint of the main hero to ensure it does not bleed past the rigid 100px constraint. Verify that all internal text elements render in absolute black (`#000000`) or white (`#FFFFFF`) with zero gray shades injected.
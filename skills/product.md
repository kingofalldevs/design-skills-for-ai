## LAYER 1: THE PROMPT (The "What" – Structural Blueprint)
Target Component: Marketplace_Product_Grid
Layout Rules:
- Render a multi-column CSS Grid container that automatically adapts to the viewport width (`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));`).
- Enforce a strict 0px gap between grid items, relying entirely on shared 1px solid borders to separate the individual component slots.
- Inside each grid slot, place a fixed-aspect-ratio container (1:1 square or 16:10 rectangle) at the top to display the component's live image/render preview.
- Directly beneath the image zone inside the slot, position a structured metadata row containing the Component Name left-aligned, and the Token Engine tag right-aligned.
- Constrain the entire grid layout with a top padding threshold that perfectly clears the fixed 72px navigation bar wrapper.

## LAYER 2: THE SKILL (The "How" – Abstract Design Tokens)
Skill Name: Grid_Asset_Engine
Execution Logic:
- IF element == "grid_slot_card": Apply property `background-color: #FFFFFF` AND `border: 1px solid #000000` (Creates a stark, boxy frame for each item).
- IF element == "component_image_zone": Apply property `background-color: #FFFFFF` AND `border-bottom: 1px solid #000000` AND `overflow: hidden`.
- IF element == "component_title_text": Apply property `font-family: "Geist Mono", monospace` AND `font-weight: 600` AND `font-size: 14px` AND `color: #000000`.
- IF element == "engine_tag": Apply property `font-family: "Geist Mono", monospace` AND `font-size: 11px` AND `background-color: #000000` AND `color: #FFFFFF` AND `padding: 2px 6px`.
- IF slot_state == "hover": Apply property `background-color: #000000` to the slot card AND change all internal structural text/tags to `#FFFFFF` (Inverts colors completely to create an intense black-and-white interaction signature).
- Validation Step: Double-check the grid alignment algorithm. Ensure images never stretch out of aspect ratio and that the borders on adjacent grid items align perfectly without doubling line thickness.
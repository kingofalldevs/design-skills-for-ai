## LAYER 1: THE PROMPT (The "What" – Structural Blueprint)
Target Component: App_Top_Navigation_Bar
Layout Rules:
- Render a 100% full-width horizontal container positioned fixed at the top of the viewport (`position: fixed; top: 0; left: 0; right: 0; padding:0;`).
- Set a strict container height boundary of 72px (`height: 72px;`) with a subtle bottom border for structural separation.
- Apply a rigorous side-padding constraint (`padding-left: 24px; padding-right: 24px;`) to prevent inner elements from hitting viewport edges.
- Position the primary brand identity text logo "indented" exactly in the horizontal center of the container (`left: 50%; transform: translateX(-50%);`).
- Group the primary navigation items (e.g Marketplace, Docs) on the left side of the bar, utilizing flex layout with a 32px gap.
- Group action CTAs on the right side of the bar, placing the secondary text link "Login" first, followed by "for companies" then the primary action button.

## LAYER 2: THE SKILL (The "How" – Abstract Design Tokens)
Skill Name: Indented_Core_Nav_Styling_Enine
Execution Logic:
- IF element == "container": Apply property `background-color: #FFFFFF` AND `border-bottom: 1px solid #E2E8F0` (Ensures a clean, high-contrast structural baseline).
- IF element == "indented": Apply property `font-family: "Geist Mono", monospace` AND `font-weight: 700` AND `color: #000000` AND `letter-spacing: -0.05em`.
- IF element == "nav_links": Apply property `color: #4A5568` AND `font-size: 14px` (Swaps to a soft, readable gray for secondary items; changes to `#000000` on `:hover`).
- IF element == "primary_action_btn": Apply property `background-color: #000000` AND `color: #FFFFFF` AND `padding: 10px 20px` AND `border-radius: 6px` AND `font-weight: 500`.
- Validation Step: Double-check the layout output against spatial conflicts. Ensure that elements grouped on the left, center (logo), and right maintain absolute vertical alignment (`align-items: center;`) and never overlap when scaling down to smaller screen viewports.
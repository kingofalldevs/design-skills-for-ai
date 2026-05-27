## LAYER 1: THE PROMPT (The "What" – Structural Blueprint)
Target Component: Global_System_Footer
Layout Rules:
- Render a 100% full-width horizontal box pinned to the absolute bottom of the page flow.
- Apply a vertical height constraint of 64px (`height: 64px;`) to keep the footprint minimal.
- Use a flex row layout with `justify-content: space-between` and `align-items: center` to push contents to opposite outer edges.
- Apply the identical side-padding parameters as the navigation file (`padding-left: 24px; padding-right: 24px;`) to preserve the page's vertical alignment axis.
- Place the copyright string on the left edge, and group system meta-details (e.g., status, version) on the right edge.

## LAYER 2: THE SKILL (The "How" – Abstract Design Tokens)
Skill Name: System_Footer_Engine
Execution Logic:
- IF element == "footer_container": Apply property `background-color: #FFFFFF` AND `border-top: 1px solid #000000`.
- IF element == "copyright_text": Apply property `font-family: "Geist Mono", monospace` AND `font-size: 12px` AND `color: #000000`.
- IF element == "status_indicator": Apply property `font-family: "Geist Mono", monospace` AND `font-size: 11px` AND `color: #000000` AND `text-transform: uppercase`.
- IF element == "status_dot": Apply property `background-color: #000000` AND `width: 6px` AND `height: 6px` AND `border-radius: 50%` AND `display: inline-block` AND `margin-right: 6px` (A sharp, solid black dot signifying system operational readiness).
- Validation Step: Ensure the footer perfectly terminates the layout scroll boundary. Verify that all typography uses the uniform monospace scale and that the layout handles micro-screens gracefully by stacking elements vertically only if the viewport drops below 480px.
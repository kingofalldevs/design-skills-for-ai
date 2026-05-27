## 2. GLOBAL SYSTEM TOKENS
These global rules apply across every single component on the page to maintain strict visual consistency:

* **Typography Baseline:** - All headings, navigation labels, button text, and metadata *must* use a monospace typeface (`font-family: "Geist Mono", monospace;`).
* **The Color Space:** - Strictly limited to high-contrast monochrome. 
  - Backgrounds are absolute white (`#FFFFFF`) or absolute black (`#000000`).
* **The Boundary Rule:**
  - Components are separated by crisp, sharp borders (`1px solid #000000`) instead of modern drop-shadows or gradients.

---

## 3. EXECUTION RULE FOR BUILDING THE PAGE
When you prompt the AI to generate the landing page code:
- **Step 1:** Read the layout skeleton rules from Layer 1 of each file to map the structure.
- **Step 2:** Apply the `IF/THEN` style logic from Layer 2 using the absolute black-and-white color tokens.
- **Step 3:** Ensure that text inside links, buttons, and titles matches the exact string definitions provided in each component file.
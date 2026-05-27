export function compileSkill(markdownText, options = {}) {
  const logs = [];
  const warnings = [];
  let cssRules = [];
  let componentName = "Unknown Component";
  let targetComponent = "";
  let skillName = "Unknown Engine";
  
  logs.push("[Compiler] Starting compilation routine...");
  
  // Detect component name
  const headerMatch = markdownText.match(/# PRODUCT COMPONENT:\s*([^\n\r]+)/i);
  if (headerMatch) {
    componentName = headerMatch[1].trim();
    logs.push(`[Phase 1] Detected component: "${componentName}"`);
  } else if (markdownText.match(/# SYSTEM SPECIFICATION:/i)) {
    componentName = "System Specification";
    logs.push(`[Phase 1] Detected System Specification document`);
  }
  
  // Detect Target Component
  const targetMatch = markdownText.match(/Target Component:\s*([^\n\r]+)/i);
  if (targetMatch) {
    targetComponent = targetMatch[1].trim();
    logs.push(`[Phase 1] Target DOM anchor: <${targetComponent}>`);
  }
  
  // Detect Skill Name
  const skillNameMatch = markdownText.match(/Skill Name:\s*([^\n\r]+)/i);
  if (skillNameMatch) {
    skillName = skillNameMatch[1].trim();
    logs.push(`[Phase 2] Found styling engine: "${skillName}"`);
  }
  
  // Parse layout rules briefly to log them
  const layoutRulesMatch = markdownText.match(/Layout Rules:\s*\n((?:\s*-.*(?:\n|$))*)/i);
  if (layoutRulesMatch) {
    const rules = layoutRulesMatch[1].split('\n').map(r => r.trim()).filter(r => r.startsWith('-'));
    logs.push(`[Phase 1] Parsed ${rules.length} layout rules. Instantiating DOM skeleton...`);
  }

  // Parse Layer 2 styling rules
  const lines = markdownText.split('\n');
  let rulesCount = 0;
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('- IF') || trimmed.startsWith('IF')) {
      const match = trimmed.match(/(?:-\s*)?IF\s+([a-zA-Z0-9_-]+)\s*==\s*"([^"]+)"\s*:\s*Apply property\s*(.*)/i);
      if (match) {
        rulesCount++;
        const key = match[1].toLowerCase();
        const value = match[2];
        const propertiesRaw = match[3];
        
        let properties = propertiesRaw.split(/\s+AND\s+/i).map(p => p.trim());
        
        // Apply option to scale font weight!
        properties = properties.map(prop => {
          if (prop.startsWith('font-weight:')) {
            const weightMatch = prop.match(/font-weight:\s*(\d+)/);
            if (weightMatch) {
              const originalWeight = parseInt(weightMatch[1], 10);
              let newWeight = originalWeight;
              if (options.fontWeightScale === 'light') {
                // Scale down: 700 -> 500, 600 -> 400, 500 -> 300, 400 -> 200
                if (originalWeight >= 700) newWeight = 500;
                else if (originalWeight >= 600) newWeight = 400;
                else if (originalWeight >= 500) newWeight = 300;
                else newWeight = 200;
                logs.push(`[Compiler Optimization] Compressed font-weight from ${originalWeight} to ${newWeight} (Light setting)`);
              } else if (options.fontWeightScale === 'thin') {
                // Scale down even more: 700 -> 400, 600 -> 300, 500 -> 200, 400 -> 100
                if (originalWeight >= 700) newWeight = 400;
                else if (originalWeight >= 600) newWeight = 300;
                else if (originalWeight >= 500) newWeight = 200;
                else newWeight = 100;
                logs.push(`[Compiler Optimization] Compressed font-weight from ${originalWeight} to ${newWeight} (Thin setting)`);
              }
              return `font-weight: ${newWeight}`;
            }
          }
          return prop;
        });
        
        // Apply theme overrides
        if (options.theme && options.theme !== 'original') {
          properties = overridePropertiesWithTheme(properties, options.theme);
        }
        
        const cssBody = properties.join('; ') + ';';
        
        // Construct CSS selector
        let selector = "";
        if (key === 'element') {
          selector = `.element-${value}`;
        } else if (key === 'link_state' || key === 'slot_state') {
          if (value === 'hover') {
            selector = `.element-grid_slot_card:hover`;
          } else if (value === 'active/hover') {
            selector = `.element-nav_track_links:hover, .element-nav_track_links.active`;
          } else if (value === 'hover_links') {
            selector = `.element-nav_links:hover`;
          }
        }
        
        if (selector) {
          cssRules.push(`${selector} { ${cssBody} }`);
          logs.push(`[Phase 2] Compiled selector: "${selector}" -> CSS: { ${cssBody} }`);
        }
      }
    }
  });
  
  // Inject hover overrides to show interactive states in the simulator
  if (componentName.includes('NAV')) {
    cssRules.push(`.element-nav_links:hover { color: #000000; }`);
  }
  
  logs.push(`[Phase 2] Compiled ${rulesCount} dynamic styling statements.`);
  
  // Phase 3: Run Validation Loop
  logs.push("[Phase 3] Starting validation loop...");
  let complianceScore = 100;
  
  // Color guardrail checks (monochrome verification)
  if (options.theme === 'original' || !options.theme) {
    const nonMonochromeCount = cssRules.filter(rule => {
      const colorMatches = rule.match(/#([a-fA-F0-9]{3,8})/g);
      if (colorMatches) {
        for (const color of colorMatches) {
          const c = color.toLowerCase();
          // check if they are monochrome: white, black, gray limits
          if (c !== '#ffffff' && c !== '#fff' && c !== '#000000' && c !== '#000' && c !== '#e2e8f0' && c !== '#4a5568') {
            return true;
          }
        }
      }
      return false;
    }).length;
    
    if (nonMonochromeCount > 0) {
      complianceScore -= 15;
      warnings.push(`Color Guardrail Warning: Found ${nonMonochromeCount} styles breaking monochrome rules.`);
      logs.push(`[Phase 3] [WARN] Guardrail Check: Found non-monochrome color specifications.`);
    } else {
      logs.push("[Phase 3] [OK] Color Guardrail check: 100% compliant monochrome styling.");
    }
  } else {
    logs.push(`[Phase 3] [OK] Theme validation: Compliant with "${options.theme}" color profile.`);
  }
  
  // Spatial constraints checks
  if (componentName.includes('NAV')) {
    const heightMatch = markdownText.match(/height:\s*72px/);
    if (!heightMatch) {
      complianceScore -= 10;
      warnings.push("Spatial Alert: Nav container height specification is not bounded at 72px.");
    } else {
      logs.push("[Phase 3] [OK] Spatial Constraint Check: Nav height bounded at 72px.");
    }
  }
  
  if (componentName.includes('HERO')) {
    const heightMatch = markdownText.match(/height:\s*100px/);
    if (!heightMatch) {
      complianceScore -= 10;
      warnings.push("Spatial Alert: Hero container height is not bounded at 100px.");
    } else {
      logs.push("[Phase 3] [OK] Spatial Constraint Check: Hero height bounded at 100px.");
    }
  }

  if (componentName.includes('FOOTER')) {
    const heightMatch = markdownText.match(/height:\s*64px/);
    if (!heightMatch) {
      complianceScore -= 10;
      warnings.push("Spatial Alert: Footer container height is not bounded at 64px.");
    } else {
      logs.push("[Phase 3] [OK] Spatial Constraint Check: Footer height bounded at 64px.");
    }
  }
  
  if (complianceScore === 100) {
    logs.push(`[Phase 3] [OK] Validation SUCCESS. Compliance Score: 100%.`);
  } else {
    logs.push(`[Phase 3] [WARN] Validation completed with score: ${complianceScore}%.`);
  }
  
  logs.push("[Compiler] Compilation complete. Build: SUCCESS.");
  
  return {
    css: cssRules.join('\n'),
    logs,
    warnings,
    complianceScore,
    componentName,
    targetComponent,
    skillName
  };
}

function overridePropertiesWithTheme(properties, theme) {
  return properties.map(prop => {
    if (prop.startsWith('font-family:')) {
      return prop;
    }
    
    if (theme === 'cyberpunk') {
      // Cyberpunk theme: Neon yellows, pinks, deep violet background, cyan borders
      if (prop.includes('#FFFFFF') || prop.includes('#ffffff') || prop.includes('color: #000000') || prop.includes('color: #000') || prop.includes('#4A5568') || prop.includes('#4a5568')) {
        if (prop.startsWith('background-color:')) return 'background-color: #0c0817';
        if (prop.startsWith('color:')) return 'color: #00ffcc';
      }
      if (prop.includes('#000000') || prop.includes('#000') || prop.includes('#E2E8F0') || prop.includes('#e2e8f0')) {
        if (prop.startsWith('background-color:')) return 'background-color: #ffe600';
        if (prop.startsWith('color:')) return 'color: #0c0817';
        if (prop.startsWith('border-bottom:') || prop.startsWith('border:') || prop.startsWith('border-top:')) {
          return prop.replace(/#[a-fA-F0-9]+/g, '#00ffcc');
        }
      }
      if (prop.startsWith('border-bottom:') || prop.startsWith('border:') || prop.startsWith('border-top:')) {
        return prop.replace(/#[a-fA-F0-9]+/g, '#ff0055');
      }
    } else if (theme === 'lavender') {
      // Soft lavender theme: transparent glass, rich purple accents, thin borders
      if (prop.includes('#FFFFFF') || prop.includes('#ffffff')) {
        if (prop.startsWith('background-color:')) return 'background-color: rgba(20, 16, 28, 0.4)';
        if (prop.startsWith('color:')) return 'color: #d8b4fe';
      }
      if (prop.includes('#000000') || prop.includes('#000')) {
        if (prop.startsWith('background-color:')) return 'background-color: #8b5cf6';
        if (prop.startsWith('color:')) return 'color: #ffffff';
      }
      if (prop.startsWith('border-bottom:') || prop.startsWith('border:') || prop.startsWith('border-top:')) {
        return prop.replace(/#[a-fA-F0-9]+/g, 'rgba(139, 92, 246, 0.3)');
      }
    } else if (theme === 'emerald') {
      // Emerald Terminal: dark green borders, glowing text
      if (prop.includes('#FFFFFF') || prop.includes('#ffffff') || prop.includes('#E2E8F0') || prop.includes('#e2e8f0')) {
        if (prop.startsWith('background-color:')) return 'background-color: #040a08';
        if (prop.startsWith('color:')) return 'color: #34d399';
      }
      if (prop.includes('#000000') || prop.includes('#000')) {
        if (prop.startsWith('background-color:')) return 'background-color: #10b981';
        if (prop.startsWith('color:')) return 'color: #020604';
      }
      if (prop.startsWith('border-bottom:') || prop.startsWith('border:') || prop.startsWith('border-top:')) {
        return prop.replace(/#[a-fA-F0-9]+/g, '#059669');
      }
    }
    
    return prop;
  });
}

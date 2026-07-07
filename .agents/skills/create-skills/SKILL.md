---
name: create-skills
description: Helps the agent understand how to create, structure, and register new agent skills based on the Antigravity skills system. Trigger this skill when the user asks to create a new skill or learn about skills.
---

# Agent Skills Creation Guide

This skill provides the instructions for creating new agent skills in the Antigravity system. 
Follow these guidelines when the user asks you to create a new skill.

## 1. Customization Roots
Skills are automatically discovered from these standard customization roots:
- **Global Customizations Root**: `C:\Users\Mackung\.gemini\config`
- **Workspace Customizations Root**: `.agents` (relative to the workspace root)

## 2. Skill Structure
A skill is essentially a directory containing a `SKILL.md` file and optional supporting folders.
Place the skill directory inside the `skills/` folder of the customization root.

**Location**: `skills/<skill_name>/` (relative to the customization root)

### The `SKILL.md` File
The `SKILL.md` file must contain YAML frontmatter and a Markdown body.
Keep the Markdown body under 500 lines. Use the `references/` subdirectory for longer documentation.

**Format Example**:
```yaml
---
name: your-skill-name
description: A clear description of what the skill does. This is used for trigger-matching.
---
# Skill Instructions
Write the step-by-step instructions and guidelines for the agent here.
```

### Optional Subdirectories
You can extend the skill with additional resources by creating these folders inside the skill directory:
- `scripts/`: Helper scripts and utilities that extend the agent's capabilities.
- `examples/`: Reference implementations and usage patterns.
- `resources/`: Additional files, templates, or assets the skill may reference.
- `references/`: Contains additional documentation that agents can read when needed (use this if the main instructions exceed 500 lines).

## 3. Registration (For Non-Standard Locations)
If a skill is placed in a non-standard location (e.g., shared team directories outside the standard roots), you must create or update a `skills.json` file in the customization root.

**`skills.json` Example**:
```json
{
  "entries": [
    { "path": "path/to/custom/skills" }
  ],
  "inherits": [
    { "path": "path/to/shared/skills.json" }
  ],
  "exclude": ["some_skill_to_ignore"]
}
```

## 4. Execution Workflow
When you create a new skill:
1. Determine the appropriate scope (Workspace-scoped `.agents/skills` or Global-scoped `C:\Users\Mackung\.gemini\config\skills`).
2. Create the skill directory `skills/<skill_name>`.
3. Create the `SKILL.md` file with the required frontmatter (`name` and `description`).
4. Write the instructions in the markdown body.
5. Create optional subdirectories if the skill needs scripts, examples, or extensive reference documentation.
6. Get explicit user confirmation before modifying existing shared or non-personal skills to avoid unnecessary code churn.

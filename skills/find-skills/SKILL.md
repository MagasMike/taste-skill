---
name: find-skills
description: >-
  Finds and installs agent skills with the open `npx skills` CLI. Use when the user asks "is there a
  skill for X", "find a skill that can...", "how do I do X" where X is a common task a ready-made skill
  may already cover (design, testing, deployment, docs, data, a specific framework), or wants to extend
  what the agent can do. Searches the skills directory, shows the best matches with their install
  commands, and installs the one the user picks.
---

# find-skills

A skill someone already wrote and tested usually beats instructions improvised on the spot. This skill
searches the open skills directory ([skills.sh](https://skills.sh)) with the
[`npx skills`](https://github.com/vercel-labs/skills) CLI and installs what the user chooses.

## When to use it

- The user asks for a skill, or whether one exists for a task.
- The task is a common, well-trodden one (a framework's conventions, a test or release workflow, a
  document format, a design discipline) and no installed skill covers it.

Do not search when an installed skill already covers the task; use that one.

## Steps

1. **Turn the request into a short query.** Two or three words naming the domain and the task:
   `react testing`, `pdf forms`, `landing page design`, `changelog release`.

2. **Search.**

   ```bash
   npx skills find <query>
   ```

   If nothing useful comes back, try a broader word or a synonym once (`e2e` → `testing`,
   `ui` → `design`) before reporting that nothing fits.

3. **Show the user the best two or three matches**, each with what it does, its source repo and the
   install command, for example:

   ```text
   design-taste-frontend (Leonxlnx/taste-skill): art direction for websites, checked in a real browser.
   npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend
   ```

   Prefer skills from known publishers and repos with real use. Say so when a match looks unmaintained
   or thin.

4. **Install only after the user picks one.** A skill is instructions and scripts the agent will run,
   so the user decides what goes in.

   ```bash
   npx skills add <owner/repo or URL> --skill <name>        # this project
   npx skills add <owner/repo or URL> --skill <name> -g     # every project (global)
   ```

5. **Use it.** Read the installed skill's `SKILL.md` and carry on with the user's task under it. Some
   agents only pick up new skills in a new session; if the skill does not load, say so.

## Keeping skills current

```bash
npx skills list      # what is installed
npx skills check     # which installed skills have updates
npx skills update    # update them
```

## If nothing fits

Say so plainly, do the task directly, and mention that a recurring workflow could become its own skill
(`npx skills init <name>` scaffolds one).

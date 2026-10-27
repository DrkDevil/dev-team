// Prints the team rules (tier 1) into the main session at start-up.
// Subagents get the same file through the `skills:` list in their frontmatter.
const fs = require("fs");
const path = require("path");

const root = process.env.CLAUDE_PLUGIN_ROOT || path.join(__dirname, "..");
const file = path.join(root, "skills", "team-rules", "SKILL.md");

try {
  const text = fs.readFileSync(file, "utf8");
  // Drop the frontmatter so only the rules reach the session.
  const body = text.replace(/^---[\s\S]*?\n---\r?\n/, "");
  process.stdout.write("Dev Team rules (tier 1). These apply to every task in this session.\n\n" + body);
} catch (err) {
  process.stdout.write("Dev Team: could not read the team rules at " + file + ".\n");
}

// Keeps the five gatekeepers read-only. Runs before Bash, Write, Edit and NotebookEdit calls,
// and blocks file changes when the agent running the tool is a gatekeeper. Gatekeepers already
// have no Write or Edit tool; this is the backstop for shell commands.
const GATEKEEPERS = new Set([
  "test-checker",
  "accessibility-reviewer",
  "design-qa",
  "code-reviewer",
  "security-reviewer",
]);

// Shell patterns that change files or git state. Redirects to /dev/null and 2>&1 are allowed.
const WRITES = [
  /(^|[;&|]\s*)(rm|rmdir|mv|cp|touch|truncate|chmod|chown|tee|dd)\b/,
  /\bsed\s+(-[a-zA-Z]*i|--in-place)/,
  /\bperl\s+-[a-zA-Z]*i/,
  /\bgit\s+(add|commit|push|checkout|switch|reset|restore|rebase|merge|stash|cherry-pick|revert|clean|apply|am|tag|branch\s+-[dDmM])\b/,
  /\b(Set-Content|Add-Content|Out-File|Remove-Item|Move-Item|Copy-Item|New-Item)\b/i,
  /(^|[^0-9&])>{1,2}\s*(?!\/dev\/null|&|\s*\$null)[^\s&|;]/,
];

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0); // Not our business if the payload is unreadable.
  }
  const agent = String(input.agent_type || "").split(":").pop();
  if (!GATEKEEPERS.has(agent)) process.exit(0);

  const tool = input.tool_name;
  let reason = null;
  if (tool === "Write" || tool === "Edit" || tool === "NotebookEdit") {
    reason = "Gatekeepers check work; they don't change files.";
  } else if (tool === "Bash") {
    const cmd = String((input.tool_input && input.tool_input.command) || "");
    if (WRITES.some((re) => re.test(cmd))) {
      reason = "Gatekeepers run checks only. This command would change files or git state: " + cmd;
    }
  }
  if (!reason) process.exit(0);
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: reason + " Report the problem in your verdict instead.",
      },
    })
  );
});

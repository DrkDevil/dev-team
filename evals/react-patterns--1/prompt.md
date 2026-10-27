---
max_turns: 6
timeout_seconds: 240
allowed_tools: [Read, Write, Edit, Glob, Grep, Skill]
tags: [react-patterns]
---

Review this: const [total, setTotal] = useState(0); useEffect(() => setTotal(items.reduce((s,i)=>s+i.price,0)), [items]);

---
title: "Chat is just the laziest interface you can build for an AI agent"
description: "The 'Beyond the Chatbox' framework argues for task-specific screens and visible reasoning over generic chat, predicting 40% of enterprise apps will have agents by end of 2026."
pubDate: 2026-09-13
tags: ["AI", "MCP", "APIs"]
lang: "en"
image: "/posts-images/2026-09-13-alem-do-chatbox.svg"
linkedin: |
  If an AI agent is about to take a real action in your system, a generic chat box is almost always the worst interface you could give it.

  I read about the "Beyond the Chatbox" framework, which argues for visible reasoning, human approval checkpoints and task-specific screens. None of that feels like a design manifesto to me. It's where I ended up out of plain necessity with my personal MCP agent: knowing which module it's looking at, tracing where each review comment came from, and signing off before anything touches the code.

  Generic chat is cheap to ship. A decent approval screen is real work.

  If 40% of enterprise apps have agents by the end of 2026, how many will actually show you what they're doing?
---

A design agency put out a framework called "Beyond the Chatbox" arguing for something that, to me, should've been obvious for a while: if an AI agent is going to take a real action in your system, a generic text box is almost always the worst possible interface for that. The pitch is to make the agent's reasoning visible, add human approval checkpoints, and use task-specific screens (a form here, a table there) instead of dumping everything back as one long chat reply. The prediction cited is that by the end of 2026 about 40% of enterprise applications will include AI agents for specific tasks, up from less than 5% in 2025.

## This is basically what I already do with my own MCP agent

I run a Model Context Protocol agent scoped to my work context, with a custom code-review skill grounded in articles I've read about code review and AI. I document everything as a graph in Obsidian, where each node is a module, submodule, or feature the agent understands. If I'd designed that agent to only ever respond in a wall of chat text, it would be a lot less useful than it actually is.

What makes an agent like that genuinely work isn't the answer itself, it's the structure around it: I know exactly which module it's looking at, I can trace where a review comment came from, and, the important part, there's a clear approval point before anything turns into a real change in the code. That's essentially the "human approval checkpoint" the framework describes, except I got there out of practical necessity, not by reading a design manifesto.

My guess for why this kind of interface is still rare is that generic chat is just so much cheaper to ship than task-specific UI. You can throw anything into a text box and call it an "AI product." Building a proper approval screen, one that surfaces the agent's reasoning in a way that actually helps whoever's reviewing it, takes real work: it's practically its own product.

If that 40%-by-end-of-2026 projection holds, I think the question left over isn't "will agents show up in enterprise apps": that part's already a given. It's how many of those agents will have an interface actually designed to show what they're doing, versus how many will just be another chat box glued on for decoration.

---
title: Self-hosted assistant over my own documents
description: One chat window over a document archive, notes, a wiki and a photo library — tools instead of a vector database, with the model running on a desktop GPU that is woken on demand.
order: 2
---

Ask "all payslips from May to August" or "that pancake recipe" and get an answer
with links to the sources. The interface is Open WebUI, installed as an app on
the phone; behind it a small MCP server gives the model read-only tools over four
sources: a scanned-document archive, an Obsidian vault, a wiki and a photo
library. It sits behind the same sign-in as everything else.

**Tools, not a vector database.** With hundreds of notes and dozens of
documents, "everything in a date range" is a filter query, not a nearest-neighbour
search, and it has to be exact. So the model gets search and fetch tools against
each source's own API and runs queries in two languages, rather than retrieving
from an embedding index that would answer *approximately* and drop documents
whose wording differs. Every tool is read-only: the assistant can never write to
the archive.

**The model runs where the GPU is.** The server has no graphics card, so
inference happens on the desktop PC. A gateway on the server exposes an
OpenAI-compatible endpoint, wakes the PC over the network if it is asleep, and
asks the GPU arbiter for a lease; the model is loaded on the first question and
unloaded once the chat goes idle, so the card is free for everything else. If
the owner is playing a game, the chat says so instead of queueing forever.

**Identity comes from the proxy.** The sign-in already happened at the edge, so
the chat trusts a header from the auth service and does not run a second user
system. Two household accounts, different access to different sources.

*Private repository. The stack is Open WebUI, an MCP server in Python, a small
gateway service, and a local Qwen model in LM Studio.*

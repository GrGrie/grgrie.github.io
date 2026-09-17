---
title: TMDB show watcher
description: A service that finds new episodes of tracked shows across sources, reconciles them against TMDB and proposes an edit for a human to approve — never acting on its own.
order: 5
---

A daily job watches the sources where a few shows are actually published, parses
episode numbering out of messy titles, reads the season from the official TMDB
API and reconciles the two without silently skipping gaps. The result is a
candidate edit plus an audit record, delivered over Telegram for approval.

What I care about here is that the automation is **deliberately timid**. It
starts in dry-run mode, submits nothing without an explicit approval, keeps every
decision in an audit log, and treats a parse it is not sure about as a refusal
rather than a guess. A new source is a `SourceAdapter`; new shows are added at
runtime from a chat command instead of a redeploy. It also exposes a small API
that the household media tracker uses to put a working "Watch" button on episode
pages.

Python, SQLite, Docker Compose. *Private repository.*

---
title: Teaching whiteboard
description: A reworked fork of WBO used in my olympiad-math lessons — one private board per student, teacher sign-in, and a second entrance for students whose networks block the tunnel.
order: 7
---

I teach olympiad math, and lessons need a shared board that a student can open
from a link with no account. WBO does that; this fork adds what teaching needs —
one private board per student, teacher-only pages behind sign-in, and per-board
access tokens.

Two details worth mentioning. Some Russian mobile networks cut connections to
the tunnel's address ranges after the first few kilobytes, so students could not
load the board at all; it is therefore published a second time through a direct
entrance with its own certificate and its own trust settings, and a small DDNS
script keeps that record pointing at a home IP that changes. And the code is
currently being refactored behind a test suite, because a board that drops a
stroke in the middle of a lesson is worse than one that is missing a feature.

Node.js, WebSockets. *Private fork.*

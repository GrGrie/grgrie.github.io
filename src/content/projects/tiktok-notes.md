---
title: Video to written notes
description: Share a video to a Telegram bot and get a Markdown note in the Obsidian vault plus a TL;DR back in chat — transcription and vision running on a home GPU, queued for when it is awake.
order: 6
---

Interesting recipes and how-tos arrive as short videos, which are a terrible
format to search later. This turns one into a note: the bot accepts a link, a
worker pulls the video, transcribes the audio with Whisper, samples frames for
the steps that are only shown and not said, and a local model writes a Markdown
note into the Obsidian vault. A short summary comes back in the chat.

The interesting part is the split. The analysis needs a GPU and the desktop PC is
not always on, so the server holds only the queue and the chat, while the worker
on the PC long-polls for jobs whenever it is awake and asks the GPU arbiter for a
lease. Links sent to a sleeping PC simply wait; nothing is lost and nothing keeps
the machine on for no reason.

Python, SQLite queue, yt-dlp, Whisper, a local vision-language model. *Private
repository.*

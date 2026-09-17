---
title: Home lab
description: A self-hosted platform for a dozen services behind one reverse proxy, one sign-in and encrypted backups, rebuildable from a repository of Compose files and docs.
order: 1
---

A single Ubuntu machine at home runs about fifteen services — a photo library, a
document archive, a password manager, a wiki, a media tracker, a whiteboard used
for teaching — and everything about how they are set up lives in one private Git
repository: Compose files, configs, deployment scripts and a written guide per
service. The rule I hold it to is that the machine can be rebuilt from scratch
from that repository plus one encrypted archive, without remembering anything.

## Design decisions worth naming

**No open ports.** The provider puts the connection behind CGNAT and blocks 80
and 443, so public traffic arrives through an outbound tunnel instead of port
forwarding. Certificates are issued over a DNS challenge, since an HTTP
challenge cannot reach the host. One service that some mobile networks refuse to
reach through the tunnel also listens on a forwarded high port, with its own
entry point and its own trust settings.

**One reverse proxy, one sign-in.** Every container declares how it wants to be
reached through labels; the proxy discovers them. A forward-auth service puts a
single sign-in page in front of everything, with both a social login and a local
password, and doubles as an OpenID Connect provider for the one app that speaks
it. Per-service allowlists decide who sees what.

**Backups that are actually restorable.** One command produces a single
encrypted archive: every service's environment file, full dumps of five
PostgreSQL databases, the Docker volumes that hold real data, and the host-level
pieces that are easy to forget — cron, systemd units, tunnel credentials. It
runs on a schedule and copies itself to a second machine. The restore procedure
is written down and has been followed, which is the part that usually is not.

**Additions outside the image.** Where an upstream image was missing something,
the extra behaviour lives beside the container instead of in a fork: a sidecar
that injects a small script, scheduled jobs that talk to the app's own API, and
startup patches that are removed as soon as upstream fixes the bug. Automatic
image updates then stay safe.

**Sharing one GPU.** Jobs that need a graphics card run on the desktop PC rather
than the server, behind a small arbiter with a strict priority order: the person
using the PC always wins, then the assistant chat, then document OCR, then face
recognition, then video notes. A higher-priority job evicts a lower one — the
model is unloaded, the lease revoked, and the displaced worker waits instead of
failing. The server wakes the PC over the network when a job needs it.

*Private repository. Happy to walk through the setup or the docs on request.*

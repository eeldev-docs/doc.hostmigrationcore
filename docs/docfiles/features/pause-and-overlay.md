---
sidebar_position: 6
title: Pause and overlay
---

# Pause and overlay

## Pause

**Pause During Grace Period** (default on): the new host pauses the game while previous players reconnect, and
unpauses when the grace period ends, the migration fails or the host yields.

- Players cannot lift this pause.
- Pauses your game sets itself are not touched.
- If everyone is already back while the map loads, nothing is paused.

## Built-in overlay

**Show Migration Overlay** (default on): a dimmed "reconnecting" screen with the current status on every machine while
a migration runs. It lets input through and is added again after every map load. After a failed migration it shows
"Could not continue the match" for **Failed Overlay Seconds**.

## Your own overlay

Set **Overlay Widget Class** to any UMG widget. It is created and removed at the same times as the built-in one.

Bind its text to **Get Status Text** on the subsystem. It is localized, for example
"Waiting for players to return (2 left)". You can also use **Get State**, **Get Num Players Awaited** and
**On State Changed** for your own layout.

To handle everything yourself, turn **Show Migration Overlay** off and bind **On State Changed**.

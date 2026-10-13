---
sidebar_position: 99
title: Changelog
---

# Changelog

## 1.0.0
Initial release for Unreal Engine 5.8.

- Host migration for listen servers: crash and graceful leave, chained migrations.
- Delta snapshots with hash verification and automatic resync.
- Actors, components, PlayerStates, GameState and GameMode; references between migrated actors.
- Players who come back get their state and pawn back (`InactivePlayerTimeout`, `LeavingPlayerPawn`).
- Rejoin, reconnect retries and split-brain resolution.
- ServerTravel, seamless travel, `LeaveSession` and `QuitGame`.
- A host closing the game window hands the match over first (`bHandOverOnWindowClose`).
- Pause during the grace period and a built-in or custom overlay.
- Steam lobby adapter with automatic lobby detection, Null adapter, Blueprint adapter.

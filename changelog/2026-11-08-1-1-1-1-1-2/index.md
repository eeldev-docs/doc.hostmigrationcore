---
title: HostMigrationCore 1.1.1 / 1.1.2
slug: 1-1-1-1-1-2
---

## Added

- [Wait For Game Ready](/docfiles/features/game-ready) lets games such as Lyra defer restoring the snapshot until they call Notify Game Ready. Is Restore Pending lets the game skip setup such as a new warmup, and Game Ready Timeout resumes restoration if the signal never arrives.
- Restore Into Game Pawn applies the returning player's saved state and position to the pawn spawned by the game. Players who reconnect later also wait for their game-spawned pawn.
- Added the [Lyra Sample Project tutorial](/docfiles/tutorials/lyra-match).
- Is Host Migration Network Failure lets a session plugin's error handler identify migration-related failures and keep the session open.

## Fixed

- The successor carries over the previous host's map URL options, including game mode parameters such as `?Experience=X?NumBots=0`.
- Clients that lose lobby membership during migration no longer start a second host. Steam and EOS clients try to rejoin the lobby, then fall back to connecting directly to the successor's platform address.

[Original release notes](https://eeldev.com/index.php/host-migration-1-1-1/)

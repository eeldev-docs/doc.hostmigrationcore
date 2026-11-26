---
title: HostMigrationCore 1.0.3
slug: 1-0-3
---

## Added

- Added the Connect Attempt Timeout setting.

## Fixed

- Resolved a crash when the host election picked a client that was still trying to rejoin the host.
- Fixed clients disconnecting a few seconds after they reached the new host.
- Restored the previous host's state and pawn on reconnection during the grace period.
- Corrected rejoin handling for host addresses that contain a colon.

[Original release notes](https://eeldev.com/index.php/host-migration-1-0-3/)

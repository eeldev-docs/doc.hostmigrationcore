---
title: Changelog
---

# Changelog

## 1.1.0

### New

- **EOS adapter.** New **EOS Lobby** adapter in the `HostMigrationCoreEOS` module. It uses EOS lobby membership for
  presence and lobby member attributes for host announcements, and keeps the current host as lobby owner so
  **Join Session** works after a migration. It works with OnlineSubsystemEOS, EOSCore or your own EOS SDK code. See
  [EOS](docfiles/features/eos).
- **Adapter picked from the platform.** With **Adapter Class** empty, the plugin now also picks **EOS Lobby** when
  `DefaultPlatformService` is `EOS` or `EOSCore`, as it already did for Steam.

### Fixed

- **Non-seamless ServerTravel.** A client that cannot follow the host to the new map, while the host is still in the
  session, now rejoins the host instead of being dropped to the wait map. This mainly happens on EOS, where the host
  closes its P2P socket when it loads the new map.
- The warning about a Null adapter next to a Steam or EOS net driver now names the matching adapter.

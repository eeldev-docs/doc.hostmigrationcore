---
title: Changelog
---

# Changelog

## 1.1.0

### New

- **EOS support.** New **EOS Adapter** in the `HostMigrationCoreEOS` module. It uses EOS lobby membership to see who
  is still in the match and lobby member attributes to announce the new host. It keeps the current host as lobby
  owner, so **Join Session** works after a migration. It works with OnlineSubsystemEOS, EOSCore (1.9.8.9 or later) or
  your own EOS SDK code, and finds the lobby by itself. See [EOS](docfiles/features/eos).
- **Adapter picked from the platform.** With **Adapter Class** empty, the plugin now also picks the **EOS Adapter**
  when `DefaultPlatformService` is `EOS` or `EOSCore`, as it already did for Steam.

### Changed

- The Steam adapter is now called **Steam Adapter** in Project Settings (before: Steam Lobby). Saved settings keep
  working, only the name shown changed.

### Fixed

- **Non-seamless ServerTravel.** A client that cannot follow the host to the new map, while the host is still in the
  session, now rejoins the host instead of being dropped to the wait map. This mainly happens on EOS, where the host
  closes its P2P socket when it loads the new map.
- The warning about a Null adapter next to a Steam or EOS net driver now names the matching adapter.
- **Get Steam Lobby** and **Get EOS Lobby** can now be used from Blueprint. They needed an adapter object that
  Blueprint had no way to get. In C++ they are now static and take a world context, like **Set Steam Lobby** and
  **Set EOS Lobby**.

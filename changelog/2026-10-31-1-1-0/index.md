---
title: HostMigrationCore 1.1.0
slug: 1-1-0
---

## Added

- Added the [EOS Adapter](/docfiles/features/eos) in the `HostMigrationCoreEOS` module. It discovers the lobby, tracks who is still in the match, and advertises the new host through member attributes. It keeps lobby ownership with the current host so Join Session still works after a handoff. It supports OnlineSubsystemEOS, EOSCore 1.9.8.9 or later, and direct EOS SDK integrations.
- An empty Adapter Class now selects the EOS Adapter automatically when `DefaultPlatformService` is `EOS` or `EOSCore`.

## Changed

- Renamed Steam Lobby to Steam Adapter in Project Settings. Existing configurations still work.

## Fixed

- During non-seamless `ServerTravel`, clients that miss the map change can reconnect if the host remains in the session. This handles cases such as EOS closing the host's P2P socket while the map loads.
- The warning about using the Null adapter with a Steam or EOS net driver now identifies the corresponding adapter.
- Get Steam Lobby and Get EOS Lobby are now callable in Blueprint. Their C++ versions are static and take a world context, like the corresponding setters.

[Original release notes](https://eeldev.com/index.php/host-migration-1-1-0/)

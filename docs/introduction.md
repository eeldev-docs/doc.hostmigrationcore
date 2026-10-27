---
sidebar_position: 1
slug: /
title: Introduction
---

# HostMigrationCore

**Listen Server Host Migration for Unreal Engine.**

In a listen server game the match normally ends the moment the host leaves or crashes. HostMigrationCore keeps it
going: one of the remaining players takes over as host, the others reconnect to them, and everyone gets their state
back. Scores, inventories, placed and spawned actors, pawns and the GameState all carry over.

No custom GameEngine, GameMode or GameInstance is needed. Add a component to the actors that should survive, tick
**SaveGame** on the variables to carry over, and pick your online backend.

Everything is available from **Blueprint and C++**.

**Get it on [Fab](https://www.fab.com/listings/01eebf59-f05a-42be-bc3f-6f4256edd33c).**

:::tip
New to the plugin? Start with [Installing the plugin](docfiles/getting_started/installing-plugin) and the
[Quick Start](docfiles/getting_started/quick-start), or download the
[Example Project](docfiles/getting_started/example-project) to see a working setup.
:::

## Demo video

<iframe width="100%" height="420" src="https://www.youtube.com/embed/TIQQrdchQfY" title="HostMigrationCore demo" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

[Watch on YouTube](https://www.youtube.com/watch?v=TIQQrdchQfY)

## Features

| Feature | Description |
|---|---|
| **[Host migration](docfiles/getting_started/how-it-works)** | Host crash or graceful leave, a successor takes over and restores the match. Chained migrations work. |
| **[What gets saved](docfiles/features/what-gets-saved)** | SaveGame variables on actors, components, PlayerStates, GameState and GameMode. References between actors survive. |
| **[Delta snapshots](docfiles/features/snapshot-traffic)** | Only what changed is sent, verified by hash. About 10× less traffic than full snapshots. |
| **[Players who come back](docfiles/features/players-coming-back)** | Players who leave or miss the migration get their state and pawn back when they rejoin. |
| **[Lost connection](docfiles/features/lost-connection)** | Tells a dead host from a player's own network hiccup. Rejoin, reconnect retries and split-brain resolution. |
| **[Map changes](docfiles/features/map-changes)** | ServerTravel and seamless travel work as usual. `LeaveSession` hands the match over before the host leaves. |
| **[Pause and overlay](docfiles/features/pause-and-overlay)** | Pauses while players reconnect and shows a "reconnecting" screen. Bring your own widget if you like. |
| **[Steam](docfiles/features/steam)** | Steam lobby adapter, detects the lobby by itself whichever API joined it. |
| **[EOS](docfiles/features/eos)** | EOS lobby adapter for OnlineSubsystemEOS, EOSCore or your own EOS SDK code. |
| **[Blueprint](docfiles/blueprint/blueprint-overview) + [C++](docfiles/cpp/cpp-overview)** | Events, nodes, a Blueprint adapter for your own backend, and a native interface for custom data. |

## Supported engine versions

| Engine | Status |
|---|---|
| Unreal Engine 5.8 | ✅ Supported |
| Unreal Engine 5.7 | ✅ Supported |
| Unreal Engine 5.6 | ✅ Supported |
| Unreal Engine 5.5 | ✅ Supported |

## Supported platforms and backends

| Backend | Status |
|---|---|
| Steam (lobby + SteamSockets) | ✅ Supported |
| LAN / Null | ✅ Supported (no presence or announcements) |
| Your own backend | ✅ Through the [Blueprint adapter](docfiles/blueprint/blueprint-adapter) or a [C++ adapter](docfiles/cpp/custom-adapter) |
| EOS (lobby + NetDriverEOS or EOSCore) | ✅ Supported |

Windows, Linux and Mac.

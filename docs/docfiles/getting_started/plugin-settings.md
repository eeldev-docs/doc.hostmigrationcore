---
sidebar_position: 4
title: Plugin Settings
---

# Plugin Settings

**Project Settings → Plugins → Host Migration**, stored in `DefaultGame.ini` under
`[/Script/HostMigrationCore.HostMigrationSettings]`.

The most important ones:

| Setting | Default | What it does |
|---|---|---|
| **Hand Over On Window Close** | on | Host closing the window hands the match over first instead of counting as a crash. |
| **Adapter Class** | empty | The online backend. **Steam Adapter** for Steam, **EOS Adapter** for EOS. Empty: picked from `DefaultPlatformService` (Steam, SteamCore, EOS, EOSCore), otherwise Null. |
| **Client Wait Map** | none | Optional map clients wait in. Empty: they stay in the match world with the connection closed. See [Where clients wait](../features/lost-connection#where-clients-wait). |
| **Snapshot Interval** | 3 s | How often the host sends state. Lower = less lost progress, more traffic. |
| **Max Snapshot Bytes** | 512 KB | Compressed size above which a full snapshot is not sent. See [Snapshot traffic](../features/snapshot-traffic#size-limit). |
| **Max Snapshot Bytes Per Second Per Client** | 0 (no limit) | Caps snapshot traffic to each client. See [Snapshot traffic](../features/snapshot-traffic#tuning). |
| **Candidate Timeout** | 12 s | How long clients wait for a successor to announce itself. |
| **Max Candidate Load Time** | 90 s | How long clients keep waiting for a successor that reports it is still loading the map. |
| **Rejoin Timeout** | 20 s | How long a client tries to rejoin a host that is still in the lobby. 0 = migrate right away. |
| **Connect Attempt Timeout** | 30 s | How long one connection attempt may take before it is cancelled and retried. 0 = no limit. |
| **Heartbeat Interval** | 5 s | How often the host updates its heartbeat in the lobby. |
| **Heartbeat Timeout** | 15 s | A host whose heartbeat has not changed for this long counts as gone. Keep it at least three times the interval. See [Lost connection](../features/lost-connection). |
| **Successor Score Hysteresis** | 30 ms | Ping change needed before a successor moves in the list. See [Choosing the successor](../features/lost-connection#choosing-the-successor). |
| **Manage Lobby Ownership** | on | Steam and EOS: make the current host the lobby owner, so **Join Session** finds it. See [Steam](../features/steam) and [EOS](../features/eos). |
| **Reconnect Grace Period** | 30 s | How long the new host waits for previous players. |
| **Inactive Player Timeout** | 300 s | How long a player who left keeps their state for a rejoin. |
| **Leaving Player Pawn** | Keep In World | What happens to the pawn of a player who leaves. |
| **Keep Host URL Options** | on | The new host opens the map with the host's URL options (game mode settings), minus **Skipped Host URL Options**. |
| **Wait For Game Ready** | off | The new host restores after **Notify Game Ready**, for games that set up the match after the map loads. See [Games that set up the match later](../features/game-ready). |
| **Restore Into Game Pawn** | off | A returning player keeps the pawn the game spawns for them, with the saved pawn's state and position loaded into it. |
| **Destroy Unsaved Runtime Actors** | on | The new host removes runtime actors it spawned itself that are not in the snapshot, so they do not exist twice. Exceptions go in **Keep Unsaved Runtime Actor Classes**. See [Actors the game spawns at runtime](../features/game-ready#actors-the-game-spawns-at-runtime). |
| **Keep Client Join Options** | on | Clients reconnect to a new host with the URL options they joined with. |
| **Reconnect URL Options** | empty | Extra URL options for reconnecting, e.g. `?Team=2`. See [Connecting to the new host](../features/lost-connection#connecting-to-the-new-host). |
| **Travel On Failure** | on | Travel to **Failure Travel URL** (empty: the Game Default Map) when a migration fails. See [When a migration fails](../features/lost-connection#when-a-migration-fails). |
| **Pause During Grace Period** | on | Pause while players reconnect. |
| **Show Migration Overlay** | on | Show a "reconnecting" screen during a migration. |
| **Show Debug Overlay** | off | Draw the [debug overlay](testing#debug-overlay) on every machine. |
| **Debug Overlay Corner** | Top Right | Screen corner the debug overlay is drawn in: Top Left, Top Right, Bottom Left or Bottom Right. |

Every setting has a tooltip in **Project Settings → Plugins → Host Migration**.

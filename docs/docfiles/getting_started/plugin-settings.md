---
sidebar_position: 4
title: Plugin Settings
---

# Plugin Settings

**Project Settings → Plugins → Host Migration**, stored in `DefaultGame.ini` under
`[/Script/HostMigrationCore.HostMigrationSettings]`.

All settings are listed below. Use the config keys under the section above when editing `DefaultGame.ini` directly.

| Setting | Config key | Default | What it does |
|---|---|---|---|
| **Enabled** | `bEnabled` | on | Enables host migration. |
| **Hand Over On Window Close** | `bHandOverOnWindowClose` | on | Host closing the window hands the match over first instead of counting as a crash. |
| **Adapter Class** | `AdapterClass` | empty | The online backend. **Steam Adapter** for Steam, **EOS Adapter** for EOS. Empty: picked from `DefaultPlatformService` (Steam, SteamCore, EOS, EOSCore, or Crossplay with its adapter available). If no adapter loads, uses Null. |
| **Client Wait Map** | `ClientWaitMap` | none | Optional map clients wait in. Empty: they stay in the match world with the connection closed. See [Where clients wait](../features/lost-connection#where-clients-wait). |
| **Snapshot Interval** | `SnapshotInterval` | 3 s | How often the host sends state. Lower = less lost progress, more traffic. |
| **Use Delta Snapshots** | `bUseDeltaSnapshots` | on | Sends changes relative to a client's snapshot when possible. |
| **Chunk Size** | `ChunkSize` | 16 KiB | Compressed bytes per reliable RPC. |
| **Max Snapshot Bytes** | `MaxSnapshotBytes` | 512 KB | Compressed size above which a full snapshot is not sent. See [Snapshot traffic](../features/snapshot-traffic#size-limit). |
| **Max Snapshot Bytes Per Second Per Client** | `MaxSnapshotBytesPerSecondPerClient` | 0 (no limit) | Caps snapshot traffic to each client. See [Snapshot traffic](../features/snapshot-traffic#tuning). |
| **Candidate Timeout** | `CandidateTimeout` | 12 s | How long clients wait for a successor to announce itself. |
| **Max Candidate Load Time** | `MaxCandidateLoadTime` | 90 s | How long clients keep waiting for a successor that reports it is still loading the map. |
| **Rejoin Timeout** | `RejoinTimeout` | 20 s | How long a client tries to rejoin a host that is still in the lobby. 0 = migrate right away. |
| **Migrate When Host Unreachable** | `bMigrateWhenHostUnreachable` | off | After unsuccessful rejoin attempts, allows migration while the old host is still in the lobby if it appears to have no other players. |
| **Max Reconnect Attempts** | `MaxReconnectAttempts` | 3 | Attempts per announced host before moving on. |
| **Reconnect Retry Delay** | `ReconnectRetryDelay` | 2 s | Delay between connection attempts. |
| **Connect Attempt Timeout** | `ConnectAttemptTimeout` | 30 s | How long one connection attempt may take before it is cancelled and retried. 0 = no limit. |
| **Heartbeat Interval** | `HeartbeatInterval` | 5 s | How often the host updates its heartbeat in the lobby. |
| **Heartbeat Timeout** | `HeartbeatTimeout` | 15 s | A host whose heartbeat has not changed for this long counts as gone. Keep it at least three times the interval. See [Lost connection](../features/lost-connection). |
| **Successor Score Hysteresis** | `SuccessorScoreHysteresis` | 30 ms | Ping change needed before a successor moves in the list. See [Choosing the successor](../features/lost-connection#choosing-the-successor). |
| **Manage Lobby Ownership** | `bManageLobbyOwnership` | on | Steam and EOS: make the current host the lobby owner, so **Join Session** finds it. See [Steam](../features/steam) and [EOS](../features/eos). |
| **Reconnect Grace Period** | `ReconnectGracePeriod` | 30 s | How long the new host waits for previous players. |
| **Inactive Player Timeout** | `InactivePlayerTimeout` | 300 s | How long a player who left keeps their state for a rejoin. |
| **Leaving Player Pawn** | `LeavingPlayerPawn` | Keep In World | What happens to the pawn of a player who leaves. |
| **Destroy Pawn When Inactive Expires** | `bDestroyPawnWhenInactiveExpires` | on | Destroys the inactive player's saved pawn on expiry if it is unpossessed. |
| **Listen Options** | `ListenOptions` | `listen` | URL options used when the successor opens the map. |
| **Keep Host URL Options** | `bKeepHostURLOptions` | on | The new host opens the map with the host's URL options (game mode settings), minus **Skipped Host URL Options**. |
| **Skipped Host URL Options** | `SkippedHostURLOptions` | `listen`, `Name`, `closed`, `failed`, `SpectatorOnly` | Options excluded when **Keep Host URL Options** is on. |
| **Wait For Game Ready** | `bWaitForGameReady` | off | The new host restores after **Notify Game Ready**, for games that set up the match after the map loads. See [Games that set up the match later](../features/game-ready). |
| **Game Ready Timeout** | `GameReadyTimeout` | 30 s | With **Wait For Game Ready** on, restores after this delay if the game has yet to signal readiness. |
| **Restore Into Game Pawn** | `bRestoreIntoGamePawn` | off | A returning player keeps the pawn the game spawns for them, with the saved pawn's state and position loaded into it. |
| **Destroy Unsaved Runtime Actors** | `bDestroyUnsavedRuntimeActors` | on | The new host removes runtime actors it spawned itself that are not in the snapshot, so they do not exist twice. Exceptions go in **Keep Unsaved Runtime Actor Classes**. See [Actors the game spawns at runtime](../features/game-ready#actors-the-game-spawns-at-runtime). |
| **Keep Unsaved Runtime Actor Classes** | `KeepUnsavedRuntimeActorClasses` | empty | Classes exempt from **Destroy Unsaved Runtime Actors**. |
| **Keep Client Join Options** | `bKeepClientJoinOptions` | on | Clients reconnect to a new host with the URL options they joined with. |
| **Reconnect URL Options** | `ReconnectURLOptions` | empty | Extra URL options for reconnecting, e.g. `?Team=2`. See [Connecting to the new host](../features/lost-connection#connecting-to-the-new-host). |
| **Travel On Failure** | `bTravelOnFailure` | on | Travel to **Failure Travel URL** (empty: the Game Default Map) when a migration fails. See [When a migration fails](../features/lost-connection#when-a-migration-fails). |
| **Failure Travel URL** | `FailureTravelURL` | empty | Destination when **Travel On Failure** is on. Empty uses the Game Default Map. |
| **Save Snapshot On Failure** | `bSaveSnapshotOnFailure` | off | Saves the last valid snapshot locally when migration fails. |
| **Failure Snapshot Slot** | `FailureSnapshotSlot` | `HostMigrationFailure` | Slot used by **Save Snapshot On Failure**. See [Saved snapshots](../features/saved-snapshots). |
| **Pause During Grace Period** | `bPauseDuringGracePeriod` | on | Pause while players reconnect. |
| **Show Migration Overlay** | `bShowMigrationOverlay` | on | Show a "reconnecting" screen during a migration. |
| **Overlay Widget Class** | `OverlayWidgetClass` | empty | Custom widget for **Show Migration Overlay**. Empty uses the built-in overlay. |
| **Overlay ZOrder** | `OverlayZOrder` | 1000 | Viewport stacking order for the migration overlay. |
| **Failed Overlay Seconds** | `FailedOverlaySeconds` | 4 s | How long to show the failure message. |
| **Show Debug Overlay** | `bShowDebugOverlay` | off | Draw the [debug overlay](testing#debug-overlay) on every machine. |
| **Debug Overlay Corner** | `DebugOverlayCorner` | Top Right | Screen corner the debug overlay is drawn in: Top Left, Top Right, Bottom Left or Bottom Right. |

Every setting has a tooltip in **Project Settings → Plugins → Host Migration**.

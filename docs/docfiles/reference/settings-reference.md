---
sidebar_position: 1
title: Settings Reference
---

# Settings Reference

**Project Settings → Plugins → Host Migration**. Stored in `Config/DefaultGame.ini`:

```ini
[/Script/HostMigrationCore.HostMigrationSettings]
AdapterClass=/Script/HostMigrationCoreSteam.HostMigrationAdapter_Steam
ClientWaitMap=/Game/Maps/WaitMap.WaitMap
```

## General

| Setting | Default | Description |
|---|---|---|
| `bEnabled` | true | Turns host migration on or off. |
| `bHandOverOnWindowClose` | true | Host closing the window hands the match over first, then closes ~1.5 s later. Not in PIE. |
| `AdapterClass` | Null | The online backend. |

## Snapshot

| Setting | Default | Description |
|---|---|---|
| `SnapshotInterval` | 3 s | How often the host sends a snapshot. Unchanged snapshots are skipped. Min 0.5. |
| `bUseDeltaSnapshots` | true | Send only what changed. |
| `ChunkSize` | 16384 | Compressed bytes per reliable RPC (1024–60000). |
| `MaxSnapshotBytes` | 524288 | Compressed snapshots larger than this are dropped with a warning. |

## Election

| Setting | Default | Description |
|---|---|---|
| `CandidateTimeout` | 12 s | How long to wait for a candidate to announce itself before trying the next one. |
| `RejoinTimeout` | 20 s | How long to try to rejoin a host that is still in the session. 0 disables. |
| `bMigrateWhenHostUnreachable` | false | If the host is still in the session but cannot be reached: false = give up, true = migrate anyway. |
| `MaxReconnectAttempts` | 3 | Connection attempts to a new host before moving to the next candidate. |
| `ReconnectRetryDelay` | 2 s | Pause between connection attempts. |

## Restore

| Setting | Default | Description |
|---|---|---|
| `ReconnectGracePeriod` | 30 s | How long the new host waits for previous players. |
| `InactivePlayerTimeout` | 300 s | How long a player who left keeps their state for a rejoin. 0 disables. |
| `LeavingPlayerPawn` | KeepInWorld | Destroy, KeepInWorld or RespawnOnRejoin. See [Players who come back](../features/players-coming-back). |
| `bDestroyPawnWhenInactiveExpires` | true | Destroy the unpossessed pawn when a record expires. |
| `ListenOptions` | `listen` | URL options the successor opens the map with. |
| `ClientWaitMap` | none | Map clients wait in. Strongly recommended. |

## Presentation

| Setting | Default | Description |
|---|---|---|
| `bPauseDuringGracePeriod` | true | Pause on the new host while players reconnect. |
| `bShowMigrationOverlay` | true | Show a "reconnecting" overlay during a migration. |
| `OverlayWidgetClass` | none | Your own overlay widget. Empty = built-in. |
| `OverlayZOrder` | 1000 | Z-order of the overlay. |
| `FailedOverlaySeconds` | 4 s | How long "could not continue" shows after a failed migration. |

## Null adapter

Set on the adapter class (or a Blueprint subclass of it):

| Setting | Default | Description |
|---|---|---|
| `ListenPort` | 7777 | Port the successor listens on. |
| `AssumedHostDelay` | 4 s | Time the successor gets to load the map before clients connect. |

## Console variables

| Variable | Description |
|---|---|
| `HostMigration.Debug.DropEveryNthDelta N` | Client: drop every Nth delta to test resyncs. 0 = off. |

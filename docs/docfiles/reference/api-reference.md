---
sidebar_position: 2
title: API Reference
---

# API Reference

## UHostMigrationSubsystem

GameInstance subsystem. `#include "HostMigrationSubsystem.h"`

| Function | Description |
|---|---|
| `void LeaveSession(const FString& TravelURL)` | Leave and travel to TravelURL. On the host, migrate the others first. |
| `void BeginGracefulMigration()` | Host: final snapshot, everyone migrates now. Leave about 1 s later. |
| `EHostMigrationState GetState()` | Current state. |
| `int32 GetEpoch()` | Increases with each migration. |
| `FText GetStatusText()` | Localized status line. Empty while Running. |
| `int32 GetNumPlayersAwaited()` | Players the new host is still waiting for. |
| `bool IsLocalHost()` | True on the hosting machine. |
| `bool IsMigrating()` | True during a migration. |
| `FString GetHostAddress()` | Address of the current host. |
| `bool FindHostInLobby(FString& Address, int32& Epoch)` | For players not connected yet. |
| `int32 GetNumInactivePlayers()` | Host: players whose state is kept. |
| `FHostMigrationSnapshotStats GetSnapshotStats()` | Host: snapshot sizes and traffic. |
| `UHostMigrationSessionAdapter* GetAdapter()` | The active adapter. |
| `void RefreshHostAnnouncement()` | Publish the host announcement again. |

| Delegate | Parameters |
|---|---|
| `OnStateChanged` | `EHostMigrationState OldState, EHostMigrationState NewState` |
| `OnPlayerRestored` | `APlayerController* PlayerController` |
| `OnHostChanged` | `const FUniqueNetIdRepl& HostId, const FString& HostAddress, bool bIsLocalHost, int32 Epoch` |

## States

`EHostMigrationState`

| State | Meaning |
|---|---|
| `Running` | Normal play. |
| `Electing` | The host was lost; picking a successor. |
| `BecomingHost` | This machine is the successor and is loading the map. |
| `WaitingForHost` | Waiting for the successor to announce itself. |
| `Reconnecting` | Connecting to the new host. |
| `GracePeriod` | New host: waiting for previous players. |
| `RejoiningHost` | Connection dropped but the host is still in the session; reconnecting to it. |
| `Failed` | The migration did not succeed. |

## UHostMigrationBlueprintLibrary

| Function | Description |
|---|---|
| `FGuid GetMigrationId(const AActor*)` | Id across migrations. Invalid without a Host Migration Id. |
| `AActor* FindActorByMigrationId(WorldContext, FGuid)` | The actor with that id now. |
| `bool IsHostMigrationInProgress(WorldContext)` | True during a migration. |
| `bool IsMigrationHost(WorldContext)` | True on the hosting machine. |
| `FString UniqueNetIdToString(const FUniqueNetIdRepl&)` | Player id string form. |

## Components and interfaces

| Type | Description |
|---|---|
| `UMigrationIdComponent` | Host Migration Id. Stable id for an actor. `GetMigrationId()`. |
| `IHostMigrationEvents` | `OnHostMigrationSave`, `OnHostMigrationRestored`. Blueprint and C++. |
| `IHostMigratable` | `SaveMigrationState`, `RestoreMigrationState`, `PostMigrationRestore`. C++ only. |

## Adapters

| Class | Module |
|---|---|
| `UHostMigrationSessionAdapter` | Base class. See [Custom Adapter](../cpp/custom-adapter). |
| `UHostMigrationAdapter_Null` | HostMigrationCore. LAN. |
| `UHostMigrationAdapter_Blueprint` | HostMigrationCore. See [Blueprint Adapter](../blueprint/blueprint-adapter). |
| `UHostMigrationAdapter_Steam` | HostMigrationCoreSteam. `SetSteamLobby`, `GetSteamLobby`. |

## Structs

**FHostMigrationAnnouncement:** `HostKey`, `Address`, `Epoch`, `NumPlayers`.

**FHostMigrationCandidate:** `NetId`, `IpAddress`, `Score` (lower is better).

**FHostMigrationSnapshotStats:** `FullBytes`, `LastDeltaBytes`, `LastChangedRecords`, `TotalRecords`,
`BytesPerSecond`, `FullsSent`, `DeltasSent`, `ResyncRequests`.

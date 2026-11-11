---
sidebar_position: 10
title: What gets saved
---

# What gets saved

## Which objects

| Object | Needs a Host Migration Id? |
|---|---|
| Placed actors | Yes |
| Actors spawned at runtime | Yes. They are spawned again on the new host. |
| Player pawns | Yes |
| PlayerStates | No. Matched to the returning player by unique net id. |
| GameState, GameMode | No |
| Components | No. Saved with their owner. |

A placed actor that was destroyed before the migration stays destroyed on the new host.

## Which data

- **SaveGame variables.** Tick **SaveGame** on Blueprint variables (Advanced section), or use `UPROPERTY(SaveGame)` in
  C++. Structs, arrays, maps and object references are supported. For structs, see [below](#structs).
- **Custom data (C++).** Implement [`IHostMigratable`](../cpp/host-migratable) for anything SaveGame cannot express.
- The actor's transform is always saved.
- A restored or respawned actor already has its saved Host Migration Id in **BeginPlay**.

## Owner, Instigator and attachments

- **Owner and Instigator** are restored when they point at a migrated actor. An owner that is a player's
  PlayerController is set again once that player is connected: right away for the new host's own player, and on
  reconnect for players who return during the grace period.
- **Attachments:** an actor attached to a migrated actor is attached again, to the same component (matched by name)
  and socket.

## AI controllers

A pawn that had an AI controller gets one again on the new host.

- **The controller has a Host Migration Id:** it is migrated like any other actor and possesses the pawn again, so
  its SaveGame variables come along.
- **No id:** a new controller of the same class is spawned. Its blackboard, behavior tree progress and other state
  start fresh. A pawn that already got a controller on spawn (**Auto Possess AI**) keeps that one.

## Match state

With a GameMode based on `AGameMode` (not `AGameModeBase`), a match that was in progress is started again on the new
host, and a match that had ended is ended again. Custom match states are not restored.

## World time

The new host's world clock starts from zero, so a **Get Game Time in Seconds** value saved on the old host means
nothing on the new one. Convert it with **To Restored World Time** on the subsystem. **Get Migrated World Time
Offset** returns the difference. Both are set before **On Host Migration Restored** runs.

## Components

Every component with SaveGame variables (or `IHostMigratable`) is saved with its owner: default components,
components added in the Blueprint editor and components added at runtime. This works on actors, PlayerStates, the
GameState and the GameMode alike, so an inventory component on the PlayerState just works.

Components are matched by name. A component that was added at runtime and is missing on the new host is created again
with the same name and class.

## Structs

:::warning Every struct member needs SaveGame too
Marking a struct variable (or an array of structs) as SaveGame is not enough. Inside the struct, only members that are
**also** marked SaveGame are saved; the others come back with their default values. This applies at every level, also
to structs inside structs.
:::

- **Blueprint structs:** open the struct and tick **SaveGame** on each member that should carry over.
- **C++ structs:** add `SaveGame` to each member's `UPROPERTY`.

Example: an inventory component with a SaveGame array of items.

```cpp
USTRUCT(BlueprintType)
struct FInventoryItem
{
	GENERATED_BODY()

	UPROPERTY(SaveGame, BlueprintReadWrite)
	FName ItemId;              // saved

	UPROPERTY(SaveGame, BlueprintReadWrite)
	int32 Count = 0;           // saved

	UPROPERTY(BlueprintReadWrite)
	int32 Durability = 0;      // NOT saved: 0 after a migration
};

UCLASS()
class UInventoryComponent : public UActorComponent
{
	GENERATED_BODY()

	UPROPERTY(SaveGame)
	TArray<FInventoryItem> Items;
};
```

After a migration `Items` has the same entries with the same `ItemId` and `Count`, and `Durability` is 0.

### Items as UObjects

Items created as objects (`NewObject<UInventoryItem>(this)`, or Blueprint "Construct Object") are not saved: a
reference to them points at an object that does not exist on the new host, so it is null after the migration. Use
structs for item data, or in C++ save the items yourself with [`IHostMigratable`](../cpp/host-migratable).

## References

Object references are stored so they still point at the right thing after the migration:

| Reference to | Stored as | After the migration |
|---|---|---|
| An actor with a Host Migration Id, or one of its components | Migration id | Points at the same actor, even if it was spawned again. |
| A PlayerState | Unique net id | Resolves if that player is connected when the object is loaded. Otherwise null. |
| Assets, classes, placed actors without an id | Path | As before. |

Raw pointers, `TObjectPtr`, `TWeakObjectPtr` and references written through `IHostMigratable` all work.

## What is not saved

- Variables without the SaveGame flag, including struct members without it.
- Objects created at runtime that are not actors or components (`NewObject`, "Construct Object").
- Actors without a Host Migration Id.
- Owners that are neither migrated actors nor a player's PlayerController (for example a PlayerState), and owners
  whose player does not return during the grace period.
- The state of AI controllers without a Host Migration Id.
- Timers, animation state, physics velocity, in-flight RPCs. Save what you need in
  [On Host Migration Save](../blueprint/events) and restart it in **On Host Migration Restored**.
- Progress made after the last snapshot (at most one Snapshot Interval). A graceful leave sends a final snapshot.

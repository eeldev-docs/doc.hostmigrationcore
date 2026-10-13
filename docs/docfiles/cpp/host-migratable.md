---
sidebar_position: 2
title: IHostMigratable
---

# IHostMigratable

A native interface for state that `UPROPERTY(SaveGame)` cannot express. Implement it on migrated actors, their
components, PlayerStates, the GameMode or the GameState.

```cpp
#include "HostMigratable.h"

UCLASS()
class AMyActor : public AActor, public IHostMigratable
{
	GENERATED_BODY()

public:
	virtual void SaveMigrationState(FArchive& Ar) override
	{
		Ar << Waypoints;
		Ar << TargetId;
	}

	virtual void RestoreMigrationState(FArchive& Ar) override
	{
		Ar << Waypoints;
		Ar << TargetId;
	}

	virtual void PostMigrationRestore() override
	{
		// Every migrated actor exists now.
	}

private:
	TArray<FVector> Waypoints;
	FGuid TargetId;
};
```

| Function | When |
|---|---|
| `SaveMigrationState(FArchive&)` | On the host, when a snapshot is built, after SaveGame properties are written. |
| `RestoreMigrationState(FArchive&)` | On the new host, before BeginPlay. Must read exactly what was written. |
| `PostMigrationRestore()` | On the new host, once every migrated actor has been restored. |

Object references written to the archive (`Ar << SomeActorPtr`) are stored by migration id and resolve on the new host,
the same as SaveGame references. You can also store an `FGuid` and look it up with
`UHostMigrationBlueprintLibrary::FindActorByMigrationId`.

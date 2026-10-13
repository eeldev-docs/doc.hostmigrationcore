---
sidebar_position: 1
title: C++ Overview
---

# C++ Overview

Add the module to your `Build.cs`:

```csharp
PublicDependencyModuleNames.Add("HostMigrationCore");
```

## Saving state

```cpp
UPROPERTY(SaveGame)
int32 Score = 0;

UPROPERTY(SaveGame)
TObjectPtr<AActor> CarriedItem; // survives if the item has a Host Migration Id
```

Add `UMigrationIdComponent` to actors that should survive:

```cpp
AMyPickup::AMyPickup()
{
	MigrationId = CreateDefaultSubobject<UMigrationIdComponent>(TEXT("MigrationId"));
}
```

## Events

Implement `IHostMigrationEvents` (the same interface Blueprint uses):

```cpp
UCLASS()
class AMyGameState : public AGameStateBase, public IHostMigrationEvents
{
	GENERATED_BODY()

	virtual void OnHostMigrationSave_Implementation() override;
	virtual void OnHostMigrationRestored_Implementation() override;

	UPROPERTY(SaveGame)
	float RemainingTime = 0.f;
};
```

For data SaveGame cannot express, use [`IHostMigratable`](host-migratable).

## The subsystem

```cpp
#include "HostMigrationSubsystem.h"

UHostMigrationSubsystem* Migration = GetGameInstance()->GetSubsystem<UHostMigrationSubsystem>();
Migration->OnHostChanged.AddDynamic(this, &ThisClass::HandleHostChanged);

// Leaving the match
Migration->LeaveSession(TEXT("/Game/Maps/MainMenu"));
```

See the [API Reference](../reference/api-reference).

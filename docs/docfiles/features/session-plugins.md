---
sidebar_position: 7
title: Session plugins
---

# Session plugins

Many session plugins and GameInstances bind `GEngine->OnNetworkFailure` and destroy the session when the connection to
the host is lost. During a host migration that breaks the match:

- With Steam and EOS, destroying the session also leaves the lobby. The adapter needs the lobby to announce the new
  host and to find it, so a client that left cannot see the new host. When it times out, it becomes a second host.
- When every member has left, Steam and EOS delete the lobby. Nobody can find the match again, not even the old host.

So a session plugin must not destroy the session or leave the lobby while a migration runs.

## Check the failure first

**Is Host Migration Network Failure** returns true when a network failure starts a host migration or belongs to one:
the host left or crashed, or a migration is already running. It does not depend on whether your handler runs before or
after the plugin's own handler.

In C++, call it first in the handler that destroys the session:

```cpp
#include "HostMigrationBlueprintLibrary.h"

void UMyGameInstance::HandleNetworkFailure(UWorld* World, UNetDriver* NetDriver, ENetworkFailure::Type FailureType, const FString& Error)
{
	if (UHostMigrationBlueprintLibrary::IsHostMigrationNetworkFailure(this, FailureType))
	{
		return;
	}
	DestroyGameSession();
}
```

In Blueprint, use it in the GameInstance's **Event Network Error** before the node that destroys the session or leaves
the lobby. Only continue on **False**.

![GameInstance Event NetworkError: Is Host Migration Network Failure into a Branch, Destroy Session only on False](../../../static/img/blueprints/NetworkErrorCheck.png)

**Is Host Migration In Progress** is true for the whole migration. Use it for session code that runs later, for example
a timer that checks whether the player is still in a session.

If the session plugin is not your own code, override its failure handler in your GameInstance, or turn the behaviour
off in its settings if it has one.

To leave the match on purpose, use **Leave Session** or **Quit Game** on the Host Migration subsystem. On the host
they hand the match over first. On a client, **Leave Session** marks the leave as a map change, so the network failure
that follows is not a migration failure. Destroying the session afterwards is safe in both cases.

## Example: Advanced Multiplayer Sessions

Advanced Multiplayer Sessions (AMS) destroys the GameSession on every network failure in its GameInstance. With Steam,
that leaves the lobby on every client as soon as the host hands the match over. Override the failure handler in your
GameInstance, and skip the session destroy when **Is Host Migration Network Failure** is true.
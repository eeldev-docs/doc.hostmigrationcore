---
sidebar_position: 8
title: EOS
---

# EOS

## Setup

1. Set **Adapter Class** to **EOS Lobby**. With **Adapter Class** empty, the plugin picks it by itself when
   `DefaultPlatformService` is `EOS` or `EOSCore`.
2. Use an EOS P2P net driver whose addresses are `EOS:<ProductUserId>:...`: **NetDriverEOS** (engine,
   SocketSubsystemEOS) or **NetDriverEOSCore** (EOSCore).
3. Keep every player in an **EOS lobby** for the whole match. The lobby outlives the host, so it is what the players
   use to find each other again. A session created with `bUseLobbiesIfAvailable = true` is a lobby. A plain EOS
   session (without lobbies) is not enough.
4. Log every player in with **EOS Connect**, so they have a Product User Id. The adapter uses the first logged-in
   Connect user.

```ini
[/Script/Engine.GameEngine]
!NetDriverDefinitions=ClearArray
+NetDriverDefinitions=(DefName="GameNetDriver",DriverClassName="/Script/SocketSubsystemEOS.NetDriverEOS",DriverClassNameFallback="/Script/OnlineSubsystemUtils.IpNetDriver")

[/Script/HostMigrationCore.HostMigrationSettings]
AdapterClass=/Script/HostMigrationCoreEOS.HostMigrationAdapter_EOS
```

## The EOS platform

The adapter never creates or ticks an EOS platform itself. It uses the one your EOS layer already runs, found in this
order:

| Your EOS layer | What to do |
|---|---|
| **OnlineSubsystemEOS** (engine) | Nothing. The adapter finds the platform through the engine's EOS SDK manager. |
| **EOSCore** (1.9.8.9 or later) | Nothing. EOSCore shares its platform through the `EOSPlatformHandleProvider` modular feature. |
| **Your own EOS SDK code** | Call `UHostMigrationAdapter_EOS::SetPlatformHandle(Platform)` before hosting or joining, or register an `IEOSPlatformHandleProvider` (see `EOSPlatformHandleProvider.h`). |

## The lobby

The adapter detects the lobby by itself. It listens for EOS lobby updates and uses the lobby the local user is a
member of. It also picks up the lobby behind the `GameSession` of the online subsystem. So it works whichever API
joined the lobby: the Online Subsystem session nodes, EOSCore or the EOS SDK directly.

If players are in more than one lobby (a party lobby and a match lobby), call **Set EOS Lobby** with the match lobby's
id on every machine. **Get EOS Lobby** returns the lobby in use.

## Join Session works after a migration

With lobby sessions, the Online Subsystem connects a joining player to the **lobby owner**. The adapter keeps the
current host as lobby owner: whoever owns the lobby promotes the current host. This takes a second or two after a
migration.

So players coming back, or joining late, can use the usual **Find Sessions** and **Join Session** nodes.

## What the adapter does

| Question | Answer from EOS |
|---|---|
| Is a player still in the session? | Lobby membership. |
| Where is the host? | The host's own lobby member attributes: `hm_addr`, `hm_epoch`, `hm_players`, `hm_id`. |
| What is my address? | The net driver's address, or `EOS:<my ProductUserId>`. |

Member attributes of a player who left disappear with them, so only live hosts are listed.

## After a migration

**On Host Changed** fires on every machine with the new host's id and address. On the new host, use it to update
things that point at the old host, such as lobby attributes your matchmaking reads.

Players who are not connected yet can use **Join Session** (see above), or call **Find Host In Lobby** to get the
current host's address.

## Map changes

**Seamless travel is recommended on EOS.** The connections stay open and nothing special happens.

With non-seamless ServerTravel, the host closes its EOS socket when it loads the new map, which drops clients that
already started connecting to it. The plugin handles this: when a client cannot follow the host to the new map and the
host is still in the lobby, it rejoins the host (state `RejoiningHost`) after **Reconnect Retry Delay**. Clients sit in
the wait map for a few seconds before they reach the new map. This needs **Rejoin Timeout** above 0 (default 20 s).

## Crash timing

After a host crash, clients first try to rejoin it while EOS still lists it in the lobby. The migration starts when EOS
reports the crashed host as gone, so a crash takes longer than a graceful leave.

Over the internet, give the successor a bit more time to load and announce itself:

```ini
[/Script/HostMigrationCore.HostMigrationSettings]
CandidateTimeout=15.0
ReconnectGracePeriod=30.0
```

The net driver's own timeouts decide how fast a lost connection is noticed:

```ini
[/Script/SocketSubsystemEOS.NetDriverEOS]
ConnectionTimeout=10.0
InitialConnectTimeout=25.0
```

## Testing on one machine

Use the **Developer Authentication Tool** from the EOS SDK, with one credential per instance:

```bash
UnrealEditor.exe MyProject.uproject -game -AUTH_TYPE=developer -AUTH_LOGIN=localhost:1111 -AUTH_PASSWORD=<credential name>
```

Start the host, create the lobby and open the map as listen server, then start the clients with their own credentials
and join the lobby. Close or kill the host to see the migration.

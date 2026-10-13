---
sidebar_position: 7
title: Steam
---

# Steam

## Setup

1. Set **Adapter Class** to **Steam Lobby**.
2. Use the **SteamSockets** net driver. Clients connect to `steam.<SteamID64>`.
3. Keep every player in a **Steam lobby** for the whole match. The lobby outlives the host, so it is what the players
   use to find each other again.
4. Something must initialise Steam and pump its callbacks: OnlineSubsystemSteam, SteamCorePRO, or your own code.

## The lobby

The adapter detects the lobby by itself. It listens for Steam's `LobbyEnter_t`, which fires whenever the local user
enters a lobby, whichever API joined it: OnlineSubsystemSteam, SteamCorePRO, Advanced Steam Sessions or raw Steamworks.
The most recently entered lobby is used.

If players are in more than one lobby (a party lobby and a match lobby), call **Set Steam Lobby** with the match
lobby's id on every machine. **Get Steam Lobby** returns the lobby in use.

Lobby ownership does not need to change hands when the host changes.

## What the adapter does

| Question | Answer from Steam |
|---|---|
| Is a player still in the session? | Lobby membership. |
| Where is the host? | The host's own lobby member data: `hm_addr`, `hm_epoch`, `hm_players`. |
| What is my address? | `steam.<my SteamID64>`. |

Member data of a player who left disappears with them, so only live hosts are listed.

## After a migration

**On Host Changed** fires on every machine with the new host's id and address. On the new host, use it to update
things that point at the old host: lobby data your matchmaking reads, rich presence connect strings, or a session you
advertise.

Players who are not connected yet (late joiners, returning players) can call **Find Host In Lobby** to get the current
host's address. If several members have announced, the one with the most players wins, then the highest epoch.

## Crash timing

After a host crash, clients first try to rejoin it while Steam still lists it in the lobby. The migration starts when
Steam removes the crashed host from the lobby, so a crash takes longer than a graceful leave.

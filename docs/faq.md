---
sidebar_position: 3
title: FAQ
---

# FAQ and Troubleshooting

## The host left and the match just ended

Check, in order:

1. The players had received at least one snapshot. A player gets the first one within one
   **Snapshot Interval** (3 s by default) of joining. A host that dies before that has nothing to hand over.
2. An adapter is set in **Project Settings → Plugins → Host Migration**.
3. On Steam, every player is still in the Steam lobby. See [Steam](./docfiles/features/steam).
4. A host that quits with a plain `open <map>` ends the match on purpose. Use
   [LeaveSession](./docfiles/features/map-changes#leaving-the-match).

The output log category is `LogHostMigration`. It logs every state change and why.

## A player's score was reset after the migration

The variable needs the **SaveGame** flag (Blueprint: variable details → Advanced → SaveGame) and the object needs to be
migrated. PlayerStates, GameState and GameMode always are. Other actors need a **Host Migration Id** component.

## An actor I spawned at runtime is gone on the new host

Add a **Host Migration Id** component to it (or to its Blueprint class). Actors without one are not migrated.

## My timer / AI / effect does not continue

Timers, animation state, physics velocity and in-flight RPCs are not saved automatically. Copy what you need into
SaveGame variables in **On Host Migration Save** and restart it in **On Host Migration Restored**. See
[Events](./docfiles/blueprint/events).

## Clients end up in the main menu while waiting

Set **Client Wait Map** to an empty map. Without it, clients wait in the game's default map.

## On Steam, the migration takes a while after a crash

Clients first try to rejoin the old host while Steam still lists it in the lobby. That protects against a single
player's network hiccup splitting the match. Once Steam drops the crashed host from the lobby, the migration starts.
A graceful leave (`LeaveSession` or `Begin Graceful Migration`) is immediate.

## Two hosts showed up

That can happen on LAN/Null, which has no way to see other hosts. With Steam (or an adapter that implements
announcements) the weaker host yields and moves its players over. See
[Lost connection](./docfiles/features/lost-connection#two-hosts-at-once).

## Can I test in the editor?

Yes, with separate processes. See [Testing](./docfiles/getting_started/testing).

## Need more help?

Join the [eelDev Discord](https://discord.gg/3Yu7pEy).

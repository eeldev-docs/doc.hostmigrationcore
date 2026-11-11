---
sidebar_position: 6
title: Players who come back
---

# Players who come back

When a player leaves, the host keeps their PlayerState data for **Inactive Player Timeout** seconds (default 300). The
same goes for a player who does not return within a migration's grace period, and for the host that was lost.

If they rejoin with the same unique net id, they get their state back, and their old pawn if it still exists and nobody
else controls it. These records travel in the snapshot, so they survive further migrations. **On Player Restored**
fires on the host when it happens.

## The pawn of a player who leaves

Unreal destroys the pawn of a player who leaves. **Leaving Player Pawn** decides what happens instead. The pawn needs a
Host Migration Id.

| Option | Behaviour |
|---|---|
| **Keep In World** (default) | The pawn stays, unpossessed, with the same id and state. The player takes it over again on rejoin. Destroyed when the record expires. |
| **Respawn On Rejoin** | The pawn disappears. Its state (with components) is kept in the player's record, also across migrations, and it is spawned again where it was when the player returns. |
| **Destroy** | Unreal's behaviour. The player gets their PlayerState back and a new pawn. |

**On Host Migration Restored** also fires on a kept or respawned pawn.

When a record expires, the player's unpossessed pawn is destroyed (**Destroy Pawn When Inactive Expires**).

## Kicked players

Kick players with **Kick Player** (Player Controller, Reason) on the subsystem, on the host:

- The client is told it was removed, then kicked through the game session.
- It does not rejoin the host or start a migration. **On Removed By Host** (Reason) fires on it, and it leaves through
  Unreal's normal disconnect handling. **Is Host Migration Network Failure** returns false for that disconnect, so
  your own error handling runs.
- The host keeps no state for the player, so they do not get it back if they return.

A player removed another way (the GameSession's Kick Player, or destroying the PlayerController) is also not kept on
the host. The client treats it as a kick when its PlayerController is destroyed while the connection is still open,
and fires **On Removed By Host** with an empty reason. Use **Kick Player** when you can: it does not depend on this.

## New players

Players who join after a migration join like any other player. Players who are not connected yet can find the current
host with **Find Host In Lobby**. See [Steam](steam) and [EOS](eos).

A Rejoin button for a player who is still in the lobby:

![Rejoin button: Find Host In Lobby, then open the Host Address with Execute Console Command, or print a message if no host was found](../../../static/img/blueprints/WBP_RejoinMenu_EventGraph.png)

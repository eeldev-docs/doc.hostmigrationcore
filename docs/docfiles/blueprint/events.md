---
sidebar_position: 2
title: Events
---

# Host Migration Events

Implement the **Host Migration Events** interface (Class Settings → Interfaces → Add) on an actor, a component, the
PlayerState, the GameState or the GameMode.

## On Host Migration Save

Runs on the host right before the object is written into a snapshot. Copy transient state into SaveGame variables here,
for example the remaining time of a timer or the current AI target.

It runs every snapshot interval, so keep it cheap.

## On Host Migration Restored

Runs on the new host after everything is restored and references to other migrated actors point at the right actors
again. Restart timers, effects and AI here.

- PlayerStates get it when their player reconnects.
- Kept and respawned pawns of [returning players](../features/players-coming-back) get it too.

## Example: a round timer

1. Add a SaveGame float `RemainingTime` to the GameState.
2. **On Host Migration Save:** `RemainingTime = Get Timer Remaining Time by Handle (RoundTimer)`.
3. **On Host Migration Restored:** `Set Timer by Event (RoundEnded, RemainingTime)`.

## Showing a "reconnecting" message

The built-in overlay already does this. For your own UI, bind **On State Changed** on the subsystem, or set an
**Overlay Widget Class**. See [Pause and overlay](../features/pause-and-overlay).

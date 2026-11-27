---
title: HostMigrationCore 1.2.0
slug: 1-2-0
---

Unreal Engine 5.8. Steam, EOS and Null adapters.

## Added

- **Level streaming and World Partition.** Placed actors in levels that are not loaded yet are restored when their level is added. Until then their saved state stays in new snapshots.
- **Destroy Unsaved Runtime Actors** (on by default) and **Keep Unsaved Runtime Actor Classes**. After a restore, the new host removes actors with a Host Migration Id that the game spawned itself but that are not in the snapshot. Controllers, PlayerStates, the GameState, the GameMode and player pawns are never removed.
- **Max Snapshot Bytes Per Second Per Client** caps snapshot traffic per client. 0 means no limit.
- **On Migration Failed** event, **Get Last Failure Reason**, and the settings **Travel On Failure** and **Failure Travel URL**. With Travel On Failure off, your game decides what happens.
- **Keep Client Join Options** (on by default), **Reconnect URL Options** and the node **Set Reconnect URL Options**. Clients reconnect with `?Name=`, passwords and your own login options.
- **Heartbeat Interval** and **Heartbeat Timeout** settings (defaults 5 s and 15 s).
- **Successor Score Hysteresis** (default 30 ms) keeps the successor order stable.
- **Manage Lobby Ownership** (on by default) controls whether the Steam and EOS adapters make the host the lobby owner.
- **Steam:** the lobby is also found through the online subsystem's game session when it was joined before the adapter started listening. A warning is logged after 10 s in a networked match without a lobby.

## Changed

- **Client Wait Map is optional.** Without it, clients stay in the match world with the connection closed while they wait for the new host. The engine's disconnect travel is held back during a migration and for 1.5 s after the host closes the connection.
- **Delta snapshots.** The host keeps the hashes of the last 8 states, so a client that is a few snapshots behind gets a delta from the state it holds.
- **Graceful handover** waits until the clients have acknowledged the last snapshot (up to 5 s) before the host leaves.
- **Kick detection.** A removed local PlayerController counts as a kick only after 1 s, and only if the connection is still open, no new PlayerController has arrived and no map change is running.
- **Successor order.** Equal pings are ordered by net id. Small ping changes no longer reorder or resend the list.
- **EOS adapter.** Uses the platform where the local player's product user id is logged in (PIE, EOSCore), uses the online subsystem of the game instance's own world, merges attribute writes into one lobby update at a time, and retries after "too many requests".
- The failure message of an earlier migration no longer shows on the overlay when a new migration starts.

## Fixed

- Chunks of an abandoned snapshot transfer could be mixed with a new one. A new transfer now starts at chunk 0.
- A duplicated actor could carry the same Host Migration Id as the original. The id is now transient and not copied on duplicate, and a warning is logged on id collisions.
- A changed Host Migration Id was not replicated to clients after it was reassigned.
- The new host could save and resend stale state for placed actors in not-yet-loaded levels.
- Compile errors in strict (non-unity) builds and packaged plugin builds.
- Compile error on UE 5.7 caused by `GetPhysicsLinearVelocity`.

## Upgrade notes

- No changes to the saved snapshot format are required for these fixes.
- If your game uses the lobby owner for something else, turn off **Manage Lobby Ownership**.
- If your game spawns actors with a Host Migration Id at runtime on its own, check **Destroy Unsaved Runtime Actors** and, if needed, add classes to **Keep Unsaved Runtime Actor Classes**.
- The Steam and EOS modules now depend on `OnlineSubsystemUtils` (the Build.cs files are updated).
- Custom PlayerState variables are only carried over seamless travel if you copy them in `CopyProperties`. This is Unreal behaviour; see [Map changes](/docfiles/features/map-changes).

---
sidebar_position: 3
title: How it works
---

# How it works

## While the match runs

The host builds a **snapshot** of everything marked for migration every **Snapshot Interval** (3 s by default) and
sends it to every client, compressed and in chunks over reliable RPCs. Clients that already have the previous snapshot
only get what changed ([delta snapshots](../features/snapshot-traffic)).

Each snapshot also contains an ordered **successor list**: the players who may take over, best first (lowest ping by
default).

Every host announces itself through the adapter while it hosts. On Steam and EOS that is lobby member data.

## When the host is lost

1. **Electing.** Clients lose the connection. If the adapter says the host is still in the session, they first try
   to [rejoin it](../features/lost-connection). Otherwise every client walks the same successor list and picks the
   first player who is still there.
2. **BecomingHost.** The successor opens the same map as a listen server and restores the snapshot. Actors are created
   first and loaded second, so actors that reference each other work in any order.
3. **WaitingForHost / Reconnecting.** Everyone else loads the **Client Wait Map**, waits for the new host's
   announcement and connects. Connections are retried **Max Reconnect Attempts** times. If the successor never
   shows up, they move on to the next candidate.
4. **GracePeriod.** The new host waits up to **Reconnect Grace Period** for the previous players. Each returning player
   gets their PlayerState and pawn back, matched by unique net id. The game is paused meanwhile (optional).
5. **Running.** The match goes on. Players who did not make it can still [come back later](../features/players-coming-back).

```text
Running -> Electing -> BecomingHost (successor) -> GracePeriod -> Running
                    \-> WaitingForHost (others) -> Reconnecting -> Running
Running -> RejoiningHost (host still in session) -> Running   | or -> Electing if the host leaves
```

Each migration increases the **epoch**, so chained migrations (the new host leaves too) work the same way.

## Graceful leave

A host that leaves on purpose with **Leave Session**, **Quit Game** (or **Begin Graceful Migration**) sends a final
snapshot and tells everyone to migrate right away. Nothing is lost and nobody waits for a timeout. Closing the game
window does the same.

## What does not need changing

No custom GameEngine, GameMode, GameInstance or PlayerController class. The subsystem is a GameInstance subsystem and
adds a small component to each remote PlayerController for the snapshot RPCs.

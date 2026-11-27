---
title: HostMigrationCore 1.2.1
slug: 1-2-1
---

Fix release on top of 1.2.0. There are no new settings, no new Blueprint nodes and no changes to the saved snapshot format.

## Fixed

- **Graceful handover.**
  - The host takes one snapshot when the handover starts and sends that same snapshot to every client.
  - The host waits until each client has acknowledged that snapshot and has no chunks left to receive. A client that stops receiving chunks for 10 s (longer when a bandwidth cap is set) no longer holds the host back.
  - Calling handover again, or closing the window again, while a handover is already running does nothing.
  - Leaving the session while the window is being closed is ignored until the handover is done.
- **Owner restoration.**
  - Actors whose owner was a player controller get that owner back when the player joins the new host, also when the player joins late or comes back as an inactive player.
  - Pending owners are dropped when the actor is destroyed, when the player's inactive time expires, and when the map changes.
  - A pending owner is also written into new snapshots, so a second migration does not lose it.
- **Restore order.** Dynamic components are now added to all restored actors first and the saved data is read afterwards, also for placed actors in levels that load later. A saved component whose class has changed is skipped instead of being read with the wrong layout.
- **Snapshot size checks.** A snapshot that is empty, that decompresses to more than 64 MB, or whose chunk count is out of range is refused on the host instead of being queued.
- **Full snapshot request.** A client that asks for a full snapshot now also resets its acknowledged sequence.
- **EOS.** Pending and in-flight attribute writes are discarded when the lobby changes. A write for the old lobby is no longer sent to the new one or retried after the old lobby is gone.
- **Steam.** The lobby owner data is compared to the exact new value and written whenever it differs, and `OWNINGID` and `OWNINGNAME` no longer depend on `P2PADDR` changing.

## Upgrade notes

- Drop-in replacement for 1.2.0. No settings or assets need to change.
- Handover now waits for the final snapshot to be fully acknowledged. With a very low **Max Snapshot Bytes Per Second Per Client** and a large world, the host can take longer to leave.

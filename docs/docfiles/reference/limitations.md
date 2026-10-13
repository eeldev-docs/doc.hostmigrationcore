---
sidebar_position: 3
title: Known Limitations
---

# Known Limitations

- **Progress since the last snapshot** is lost on a crash (at most one Snapshot Interval). A graceful leave sends a
  final snapshot.
- **Not saved:** in-flight RPCs, physics velocity, timers and animation state, unless you save them in
  [On Host Migration Save](../blueprint/events).
- **Actors without a Host Migration Id** are not migrated. References to them only survive for placed actors.
- **Deltas work per record:** a record that changes at all is resent whole. Large records that change often cost their
  full size each interval.
- **A kept pawn** (`KeepInWorld`) is a new actor with the old pawn's id and state. References to the old pawn object
  from objects that are not migrated go stale.
- **References to PlayerStates** of players who have not reconnected yet come back as null. Store the unique net id if
  you need it later.
- **Soft object pointers** (`TSoftObjectPtr`) to runtime-spawned actors do not survive. Use hard or weak pointers.
- **Rejoin and split-brain handling** need an adapter with presence and announcements (Steam). With Null, two hosts
  can still happen on LAN.
- **On Steam after a crash,** clients keep trying to rejoin until Steam removes the crashed host from the lobby, which
  delays the migration.
- **During a map change** a lost host is not migrated.
- **EOS** is not supported yet.

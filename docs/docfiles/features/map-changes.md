---
sidebar_position: 5
title: Map changes and leaving
---

# Map changes and leaving

## ServerTravel

ServerTravel, seamless or not, works as usual. After the change, the new map's state streams to clients from scratch,
starting with a full snapshot.

- **During a map change** (from the host's travel until the new map is loaded), a lost connection does not start a
  migration, because the state is being replaced right then. If the host dies exactly then, Unreal's normal disconnect
  handling applies.
- **A snapshot is only used on the map it was taken on.** Right after a seamless travel, before the first snapshot of
  the new map has arrived, losing the host is not migrated either.
- **Players who stepped away** keep their PlayerState data across map changes. Their pawn belonged to the old map, so
  they get a new one.
- Players moving with a seamless travel are not treated as leaving.
- Seamless travel keeps PlayerStates only through your PlayerState's `CopyProperties`, as usual in Unreal.

## Leaving the match

Use **Leave Session** (with the map to go to) instead of a plain `open <map>`:

| Who | What happens |
|---|---|
| Host | Hands the match over (graceful migration) before travelling. The others play on. |
| Client | Just leaves. The host keeps the player's state for a rejoin. |

A host that leaves with a plain `open` ends the match for everyone, as it would without the plugin.

**Begin Graceful Migration** is the lower-level version for the host: it sends a final snapshot and tells everyone to
migrate. Leave about a second later, so the messages get out.

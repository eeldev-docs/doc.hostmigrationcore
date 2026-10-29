---
sidebar_position: 5
title: Testing
---

# Testing

A host migration closes the host's game and turns a client into a host. Test with **separate game processes**, one per
player, rather than several players inside one editor process.

## Local, Null adapter

Set **Adapter Class** to **Null** and start several standalone instances from the command line:

```bash
UnrealEditor.exe "C:/Path/YourGame.uproject" /Game/Maps/YourMap?listen -game -log -windowed -ResX=960 -ResY=540
```

```bash
UnrealEditor.exe "C:/Path/YourGame.uproject" 127.0.0.1 -game -log -windowed -ResX=960 -ResY=540
```

Start the host first, then two or more clients. Wait a few seconds (one snapshot interval), then close the host
window. Watch the clients' logs for `LogHostMigration`:

```text
LogHostMigration: Host lost (ConnectionLost: ...); starting migration
LogHostMigration: State Running -> Electing
...
LogHostMigration: Restored player ... (with pawn)
```

:::note
The Null adapter has no presence and no announcements: clients assume the successor is up after a short delay, and
lost-connection handling (rejoin, split brain) does not apply. Use Steam or EOS to test those.
:::

## Steam

Steam needs one Steam account per machine. Package a Development build, start it on two or more machines, put all
players in the same Steam lobby, start the match and close or kill the host. See [Steam](../features/steam).

## EOS

EOS can be tested on one machine: run several instances, each logged in with its own Developer Authentication Tool
credential. See [EOS](../features/eos#testing-on-one-machine).

## Tips

- Bind **On State Changed** in the GameInstance and print the state to see where a migration is. See the
  [Blueprint Overview](../blueprint/blueprint-overview#subsystem-events).
- **Get Snapshot Stats** shows snapshot sizes and traffic. A summary is also logged every 30 s.
- `HostMigration.Debug.DropEveryNthDelta N` (console variable, client) drops deltas on purpose to test resyncs.

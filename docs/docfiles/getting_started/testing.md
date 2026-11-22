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

Start the host first, then two or more clients. Change a recognizable value such as a score or an actor's
position. Use the [debug overlay](#debug-overlay) to confirm each client has received a recent snapshot before
testing either path.

| Test | Action | Expected result |
|---|---|---|
| Graceful handover | Use the subsystem's **Quit Game** node on the host. You can also close the host window with **Hand Over On Window Close** enabled. | The host starts the handover and attempts to send a final snapshot before exiting. |
| Host crash | Start a fresh match, confirm snapshot delivery, then end the host process directly instead of closing its window. | Clients detect the lost connection and migrate using their last usable snapshot. Changes made after that snapshot may be lost. |

For each test, check that one client becomes host, the others reconnect, and the saved score or actor state
is restored. During a crash test, look for `LogHostMigration` messages such as `Host lost`,
`Becoming host` and `Restored player`.
:::note
The Null adapter has no presence and no announcements: clients assume the successor is up after a short delay, and
lost-connection handling (rejoin, split brain) does not apply. Use Steam or EOS to test those.
:::

### LAN sessions

With OnlineSubsystem Null, a player who joined a LAN session does not advertise it. When that player becomes the host,
the Null adapter takes over the `GameSession`: it recreates it with this machine as owner, without firing the
create, start or destroy session events, and registers the players again. **Find Sessions** on LAN then finds the new
host. See [LAN fallback settings](../blueprint/blueprint-adapter#lan-fallback-settings) for **Take Over Session** and the other Null adapter defaults.

:::note Lyra
Lyra's CommonSessionSubsystem joins through a reservation beacon on the host, which the new host does not have. Set
`bUseBeacons=false` so players can join the new host:

```ini
[/Script/CommonUser.CommonSessionSubsystem]
bUseBeacons=false
```
:::

## Steam

Steam needs one Steam account per machine. Package a Development build, start it on two or more machines, put all
players in the same Steam lobby, start the match and close or kill the host. See [Steam](../features/steam).

## EOS

EOS can be tested on one machine: run several instances, each logged in with its own Developer Authentication Tool
credential. See [EOS](../features/eos#testing-on-one-machine).

## Debug overlay

The debug overlay shows what host migration sees on this machine. It is drawn in the top right corner. Change the corner with **Debug Overlay Corner**. Turn it on with one of these:

- **Show Debug Overlay** in **Project Settings → Plugins → Host Migration**.
- The console variable `HostMigration.Debug.Overlay`: `1` shows it, `-1` hides it, `0` uses the setting. From the
  command line: `-ExecCmds="HostMigration.Debug.Overlay 1"`.
- **Set Debug Overlay Visible** in Blueprint.

:::caution
The overlay also works in Shipping builds and shows the host's address. Keep it off in released games.
:::

| Line | What it shows |
|---|---|
| **HostMigration** | `HOST`, `CLIENT` or `OFFLINE`, the epoch, the state and how long it has lasted. Green on the host, blue on a client, yellow during a migration, red when it failed. |
| **Host** | The host's player id and epoch, and `(this machine)` on the host. |
| **Address** | The address clients connect to. |
| **Successors** | The successors in order, with their presence in the lobby. `(you)` marks this machine, `>` the candidate a migration waits for. |
| **Players** | Players in the match, players the new host still waits for, and players who left and can come back. |
| **Snapshot** | On the host: sequence, records, sizes and traffic. On a client: the last snapshot it got and how long ago. |
| **Adapter** | The adapter, and for Steam and EOS the lobby, whether this machine is in it, the members and the owner. |
| **Election** | During a migration: the candidate and the time left before the next one is tried. |

Every machine should show the same epoch, host and successors. A machine with a different epoch or host is the first
place to look when a migration goes wrong.

## Tips

- Bind **On State Changed** in the GameInstance and print the state to see where a migration is. See the
  [Blueprint Overview](../blueprint/blueprint-overview#subsystem-events).
- **Get Snapshot Stats** shows snapshot sizes and traffic. A summary is also logged every 30 s.
- `HostMigration.Debug.DropEveryNthDelta N` (console variable, client) drops deltas on purpose to test resyncs.

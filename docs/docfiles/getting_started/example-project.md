---
sidebar_position: 6
title: Example Project
---

# Example Project

See HostMigrationCore working over Steam, either as a ready-to-run demo or as a project to open in the editor.

| Download | What it is | Needs the plugin? |
|---|---|---|
| [**Demo** (HostMigrationExample.zip)](http://eeldev.com/tmp/HostMigrationExample.zip) | A packaged build. Unzip and run it on two machines to see host migration in action. | No |
| [**Example project** (GitHub releases)](https://github.com/eeldev-ue4/HostMigrationExample/releases) | The Unreal Engine project, to see how it is set up. | Yes |
| [**Demo video** (YouTube)](https://www.youtube.com/watch?v=TIQQrdchQfY) | The demo in action, if you do not have two machines at hand. | No |

:::info Unreal Engine 5.8 only
The example project is only available for **Unreal Engine 5.8**. The plugin itself supports 5.5, 5.6, 5.7 and 5.8,
but the project's assets cannot be opened in older engine versions.
:::

:::warning Steam AppId 480
The example uses Steam AppId **480** (Spacewar), Valve's shared test app. It is fine for trying things out, but Steam
limits it: you share it with everyone else testing on 480, so lobby searches can be slow or return other games'
lobbies, and some Steam features may not behave as they would for a real game.

For your own game, use your **own AppId**.
:::

## Trying the demo

1. Start Steam on two machines (one Steam account each).
2. Unzip the demo on both and run it. Host on one machine and join from the other.
3. Close the host's game window. The other player takes over as host and the match goes on.
4. Start the demo again on the first machine and join. It connects to the new host and gets its state back.

See [Testing](testing) for what to look for in the logs.

## Opening the project

The project needs Unreal Engine 5.8 with HostMigrationCore installed; see
[Installing the plugin](installing-plugin). Open the `.uproject`, and the settings under
**Project Settings → Plugins → Host Migration** show the setup used.

To test with your own AppId, set it in `Config/DefaultEngine.ini`:

```ini
[OnlineSubsystemSteam]
SteamDevAppId=<your AppId>
```

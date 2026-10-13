---
sidebar_position: 1
title: Installing the plugin
---

# Installing the plugin

## Install from Fab

1. Open the **Epic Games Launcher** and go to **Unreal Engine → Library → Fab Library**.
2. Search for **HostMigrationCore**.
3. Click **Install to Engine** and select **5.8**.

## Enable the plugin

Open your project, go to **Edit → Plugins**, search for **HostMigrationCore** and make sure it is enabled.
Restart the editor when asked. The plugin has no plugin dependencies; for Steam, enable your Steam layer as usual
(OnlineSubsystemSteam + SteamSockets, or SteamCore PRO).

## Installing manually (project plugin)

You can also place the plugin in your project instead of the engine:

```text
YourProject/
└── Plugins/
    └── HostMigrationCore/
        ├── HostMigrationCore.uplugin
        ├── Config/
        ├── Resources/
        └── Source/
```

Right click your `.uproject` → **Generate Visual Studio project files**, then build your project.

## Modules

| Module | Type | Contents |
|---|---|---|
| `HostMigrationCore` | Runtime | The subsystem, components, interfaces, Null and Blueprint adapters, overlay. |
| `HostMigrationCoreSteam` | Runtime | The Steam lobby adapter. |
| `HostMigrationCoreTests` | DeveloperTool | Automation tests (not packaged in Shipping). |

C++ projects that call the API add `HostMigrationCore` to their module's `PublicDependencyModuleNames`
(and `HostMigrationCoreSteam` if they call the Steam adapter directly).

---
sidebar_position: 1
title: Installing the plugin
---

# Installing the plugin

## Install from Fab

Get the plugin from [HostMigrationCore on Fab](https://www.fab.com/listings/01eebf59-f05a-42be-bc3f-6f4256edd33c), then:

1. Open the **Epic Games Launcher** and go to **Unreal Engine → Library → Fab Library**.
2. Search for **HostMigrationCore**.
3. Click **Install to Engine** and select your engine version (**5.5**, **5.6**, **5.7** or **5.8**).

## Enable the plugin

Open your project, go to **Edit → Plugins**, search for **HostMigrationCore** and make sure it is enabled.
Restart the editor when asked. The plugin enables the engine's **EOSShared** and **OnlineSubsystem** plugins. For
Steam, enable your Steam layer as usual (OnlineSubsystemSteam + SteamSockets, or SteamCore PRO). For EOS, enable
yours (OnlineSubsystemEOS + SocketSubsystemEOS, or EOSCore).

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
| `HostMigrationCoreEOS` | Runtime | The EOS lobby adapter. |

C++ projects that call the API add `HostMigrationCore` to their module's `PublicDependencyModuleNames`
(and `HostMigrationCoreSteam` or `HostMigrationCoreEOS` if they call the Steam or EOS adapter directly).

---
sidebar_position: 6
title: Example Project
---

# Example Project

A ready-made Unreal Engine project that shows a working HostMigrationCore setup over Steam.

**Download:** [github.com/eeldev-ue4/HostMigrationExample/releases](https://github.com/eeldev-ue4/HostMigrationExample/releases)

## What you get

- A project with the plugin set up: project settings, Steam configuration and a map to play on.
- Host and join through Steam with the engine's **Create Session**, **Find Sessions** and **Join Session** nodes.
- A packaged build on the releases page, so you can try host migration on two machines without building anything.

## Trying it

1. Start Steam on two machines (one Steam account each).
2. Run the example on both. Host on one machine and join from the other.
3. Close the host's game window. The other player takes over as host and the match goes on.
4. Start the example again on the first machine and join. It connects to the new host and gets its state back.

See [Testing](testing) for what to look for in the logs.

## Opening the project

The project needs HostMigrationCore installed for the same engine version; see
[Installing the plugin](installing-plugin). Open the `.uproject`, and the settings under
**Project Settings → Plugins → Host Migration** show the setup used.

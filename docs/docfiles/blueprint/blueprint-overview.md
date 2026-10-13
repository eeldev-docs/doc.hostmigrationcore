---
sidebar_position: 1
title: Blueprint Overview
---

# Blueprint Overview

Everything you need for host migration works without C++.

## State

Tick **SaveGame** on Blueprint variables (variable details → Advanced → **SaveGame**). They travel like
`UPROPERTY(SaveGame)` in C++, on actors and components alike, including object references to other migrated actors.

Add the **Host Migration Id** component to every actor that should survive.

## Subsystem

Get it with **Get HostMigrationSubsystem** (it's a GameInstance subsystem).

| Node | What it does |
|---|---|
| **Leave Session** | Leave the match. On the host, hands it over first. |
| **Quit Game** | Quit the game. On the host, hands it over first. Use instead of the engine's Quit Game. |
| **Begin Graceful Migration** | Host: send a final snapshot and tell everyone to migrate now. |
| **Get State** | Current [state](../reference/api-reference#states). |
| **Is Migrating** | True during a migration (not Running, not Failed). |
| **Is Local Host** | True on the machine that hosts. |
| **Get Epoch** | Increases with each migration. |
| **Get Status Text** | Localized status line for UI. |
| **Get Num Players Awaited** | Players the new host is still waiting for. |
| **Get Host Address** | Address of the current host. |
| **Find Host In Lobby** | For players not connected yet: where the current host is. |
| **Get Num Inactive Players** | Host: players whose state is kept for a rejoin. |
| **Get Snapshot Stats** | Host: snapshot sizes and traffic. |

## Subsystem events

| Event | When |
|---|---|
| **On State Changed** (Old State, New State) | Every state change, on every machine. |
| **On Player Restored** (Player Controller) | Host: a returning player got their state back. |
| **On Host Changed** (Host Id, Host Address, Is Local Host, Epoch) | The session has a new host. Use it to update lobby data or rich presence. |

## Library nodes

| Node | What it does |
|---|---|
| **Get Migration Id** | The id that identifies an actor across migrations. |
| **Find Actor By Migration Id** | The actor that carries an id now. |
| **Is Host Migration In Progress** | Same as Is Migrating, from any world context. |
| **Is Migration Host** | True on the machine that hosts. |
| **Unique Net Id To String** | The string form used for player ids. |

## Steam

**Get Steam Lobby** and **Set Steam Lobby** (only to override the detected lobby). See [Steam](../features/steam).

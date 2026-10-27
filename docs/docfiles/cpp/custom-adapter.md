---
sidebar_position: 3
title: Custom Adapter
---

# Custom Adapter

Everything platform specific sits behind `UHostMigrationSessionAdapter`. Subclass it (or `UHostMigrationAdapter_Null`
for the LAN fallbacks) and pick your class in **Project Settings → Plugins → Host Migration → Adapter Class**.

An adapter answers three questions:

1. Is a player still in the session (presence)?
2. How does a host announce itself so the others can find it?
3. What is this machine's address?

| Function | Purpose |
|---|---|
| `GetConnectAddress(Candidate)` | **Required.** Address for ClientTravel to reach a candidate once it hosts. |
| `GetLocalHostAddress()` | Address others use to reach this machine while it hosts. |
| `GetMemberPresence(PlayerId)` | Present / Gone / Unknown. Enables rejoin and skipping candidates who left. |
| `IsCandidateAvailable(Candidate)` | Election: false skips the candidate. Default: not known to be gone. |
| `PublishHostReady(Epoch, NumPlayers)` | Announce that this machine hosts. Called when hosting starts and when the player count changes. |
| `ClearHostReady()` | This machine stopped hosting. |
| `GetAnnouncedHosts(OutHosts)` | Every announcement visible in the backend. Return false if there is no such channel. |
| `FindAnnouncedHost(...)` | For players not connected yet. Default: most players, then highest epoch. |
| `ScoreCandidate(PlayerState)` | Host side, lower is better. Default: ping. |
| `BeginWaitingForHost` / `StopWaitingForHost` | Client side, while waiting for a candidate. |
| `Initialize` / `Deinitialize` | Lifetime, tied to the subsystem. |

If your backend pushes events, call `UHostMigrationSubsystem::HandleHostAnnounced` when an announcement arrives. When
your backend becomes usable after hosting started, call `RefreshHostAnnouncement`.

## Why not one adapter on top of the Online Subsystem?

Host migration needs per-member data that every member can write.

- **OSSv1** (`IOnlineSubsystem`): only the session owner writes session data, and member settings are not
  implemented by every backend. EOS has them, Steam does not.
- **OSSv2** (`UE::Online::ILobbies`): has member attributes and member-left events, but in 5.8 only EOS and Null
  implement Lobbies.

So Steam and EOS each have their own adapter, working on Steam lobbies and EOS lobbies directly.

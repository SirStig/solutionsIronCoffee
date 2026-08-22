---
title: "Reverse-engineering a 2002 space sim so it runs on an iPhone"
date: "2026-08-02"
tags: [swift, games, reverse-engineering]
excerpt: "NovaSwift is a from-scratch Swift rebuild of EV Nova. The engine was the easy half."
---

[EV Nova](https://github.com/SirStig/NovaSwift) came out in 2002 and there has
never been a good way to play it on modern hardware. So I rebuilt the engine from
scratch in Swift — not an emulator, not a wrapper — and it now runs natively on
Mac, iPad, iPhone and Apple TV.

Writing Newtonian flight physics is a solved problem. The interesting part was
everything before that.

## The game is mostly data

EV Nova's behaviour lives in resource tables, not in code. Ship AI, mission
chains, star systems, outfits — all of it is data the original engine reads at
runtime. Which means a rebuild is not really a rendering project. It is an
archaeology project: work out the format, then reimplement the code that consumes
it.

The ship AI in particular runs off decision tables that had to be reconstructed
field by field before a single ship could be made to behave correctly. Get one
offset wrong and the ships fly, they just fly *stupidly* — which is a far worse
debugging experience than a crash, because nothing tells you it is broken.

## Ship no data you do not own

NovaSwift contains zero copyrighted game content. You bring your own data files,
exactly the way [OpenMW](https://openmw.org) and [OpenRA](https://www.openra.net)
work. The repo is the engine; the game is yours.

This is not just a legal hedge, it is a design constraint that improves things.
If the engine cannot assume the data, the data layer has to be a real, documented
boundary — which is what made the plug-in store possible later.

## Structure

Splitting it into modules early paid off more than anything else:

```
NovaSwiftKit      — resource parsing and the data layer
NovaSwiftEngine   — flight physics and combat
NovaSwiftStory    — missions and dialogue
NovaSwiftNet      — multiplayer netcode
NovaSwiftSync     — state reconciliation
NovaSwiftPluginStore
```

The extraction CLI lives outside the app entirely, which meant I could iterate on
format parsing without launching a game every time.

It is in public TestFlight now. A Godot port for Linux and Windows is in progress
and, at time of writing, kinda broken.

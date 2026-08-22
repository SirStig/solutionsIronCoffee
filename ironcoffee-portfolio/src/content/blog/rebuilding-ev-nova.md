---
title: "Rebuilding EV Nova, the game that ate my childhood"
date: "2026-08-08"
tags: [swift, games]
excerpt: "I'm rebuilding EV Nova from scratch in Swift because I loved it as a kid and it barely runs anymore. It's still rough, and I'm fine saying so."
---

[EV Nova](https://github.com/SirStig/NovaSwift) is a space sim from 2002. I
played it constantly as a kid — flying around, trading, fighting, and messing
with the mission computer and plugins way more than a normal kid probably
should have. I've loved this game for a long time.

A while back I saw people using Claude to help rebuild old games — stuff like
Command & Conquer Generals, but for iPad. I thought that was a genuinely cool
idea, and EV Nova doesn't really run well on anything modern anymore, so I
figured I'd try the same thing with it.

I did not expect that to mean building an entire game engine, natively, in
Swift. But that's what it turned out to mean, so that's what I'm doing.

![NovaSwift's flight HUD, mid-dogfight](projects/novaswift/flight-hud)

## I don't actually know how a lot of this works

I can't reverse-engineer the original game especially well. I don't know how
its AI works internally, and honestly there's a lot else I'm just as unsure
about — mission logic, pricing, all of it. Nobody wrote any of this down
anywhere I can find. What I have is the EV Bible, the original `.rez` resource
files, my own memory of how the game behaved, and whatever Wikipedia and old
forum posts still exist. A lot of this has been reconstructing behavior from
the outside by watching what the original game actually did and guessing at
the rest.

That's genuinely the hardest part. Not the flight physics, not the rendering —
figuring out what the game is even supposed to do when I can't read the source.

> Because I'm working from data I don't have any rights to, NovaSwift doesn't
> ship any of the original game's files. You bring your own legally-owned copy
> of EV Nova and the engine reads it at runtime — the same model OpenMW and
> OpenRA use for Morrowind and Command & Conquer. It felt like the only honest
> way to put this out there.

## Performance was rough for a while

Decoding the resource files and running ship AI at the same time was slow
enough to be a real problem early on. I ended up adding a caching layer for
decoded resource data so it's not re-parsing the same files over and over, and
that alone fixed most of it.

While I was in there fixing performance, I also built out a pretty extensive
set of debug and profiling tools. As a side effect, those same tools let you
fully control the game and cheat as much as you want — something the original
EV Nova never had. That wasn't really the plan, it just fell out of needing
good instrumentation.

## Where it's at

It runs natively on Mac, iPad, iPhone, and Apple TV, with controller support.

![The galaxy map, showing the full system layout](projects/novaswift/galaxy-map)

I've got full multiplayer working, though "working" is generous — it's still
kind of buggy and finicky and I wouldn't trust it for anything serious yet.

![Two ships in a multiplayer session](projects/novaswift/multiplayer)

There's a pile of other stuff in there too: an in-game plugin store so people
can install community content without digging through folders, and a Godot
port for Linux and Windows I'm building on the side, sharing the same Swift
engine underneath. There's a public TestFlight beta if anyone wants to poke at
it.

![The in-game plugin store](projects/novaswift/plugin-store)

I should also just say plainly that most of the engine, and the digging
through resource formats behind it, was built working alongside Claude Code.
I'd rather say that outright than have someone assume otherwise.

Honestly, the whole thing has just been really fun to build. It's also very
clearly not done — the biggest gap right now is getting it to actually *feel*
like the original game, not just run like it. AI behavior especially still has
a long way to go.

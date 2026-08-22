---
title: "The Lab: testing Beyond25 against itself"
date: "2026-08-22"
tags: [ai, music]
excerpt: "I built an admin-only lab that lets me swap the model behind every single step of Beyond25 and run five configurations head to head. It has paid for itself several times over."
---

[Beyond25](/work/beyond25) is an AI music curator, and the thing people
usually get wrong about it is assuming there's one model in there doing
everything. There isn't. There's a model that names the chat. A model that
writes research queries and another that synthesizes what comes back. Models
for cover art, for voice, for the NSFW check, for curation itself. It's a
chain, and every link in that chain has its own cost, its own latency, and its
own ways of being subtly wrong.

For a long time I was tuning that chain by feel. Change a prompt, run a
playlist, see if it felt better. That works right up until it doesn't, which is
roughly the point where you have a dozen steps and no idea which one is eating
your time.

So I built the Lab. It's admin-only — nobody else sees it, and it isn't a
product feature. It's a test harness.

## What it actually does

The Lab lets me create profiles, and a profile can override *every single*
model slot in the pipeline independently. Chat naming, research synthesis,
image generation, voice, cover art, the NSFW check, curation — all of it,
per profile. We run through Gemini and OpenRouter, so in practice I can point
any slot at almost any model I want.

Then it instruments the whole run. Every tool call, every credit charged, every
fraction of a cent of provider cost, every step's duration. A run comes out as
a report I can actually read instead of a vibe, and the spend gets attributed
two ways: by model, and by job. By model tells me what I paid each provider.
By job tells me *which part of the pipeline* caused it — curation, chat title,
liner notes, research synthesis. Those two views disagree more often than you'd
think, and the disagreement is usually the interesting part. A model that looks
expensive by model is frequently just one that ran seven times instead of four.

The part I use most is the head-to-head. I can fire five profiles at the same
brief simultaneously and compare them on speed, cost, tool calls made, tracks
returned, and whether the result is any good. I can also arm a profile for my
own live chats, so I'm using a candidate configuration as a normal user would
rather than only in a benchmark.

## The bottlenecks it found were not where I expected

The first thing it did was make research embarrassing. A research pass of
thirty or forty queries was taking thirty to forty seconds. Watching the
per-step timings made it obvious that wasn't model latency, it was how we were
fanning the work out and how synthesis was handling the pile afterwards. After
that round of work, three hundred queries finish in about five seconds, and a
normal-sized research pass is close to instant.

There was also a cap in synthesis quietly dropping research before the model
ever saw it — so we were paying to gather information and then throwing part of
it away. That one only showed up because the Lab counts what goes in against
what comes out.

Then there were the search bugs. We were hitting Wikipedia's search in a way that
kept surfacing the wrong articles, so we moved to full-text search and added a
keyword check that drops articles containing blocked words before they reach
synthesis.

My favorite failure was a language one. Someone asked for songs in Arabic, and
somewhere in the chain the query collapsed to "essentials" — which duly
returned essential oils and the Essential Phone. No music anywhere. It's a
funny bug, but the only reason I found it is that the Lab shows me the actual
queries that went out, not just the playlist that came back.

## Testing other models is harder than swapping a string

The other half of the Lab is comparing candidate models against what we
currently run in production. Our live models work because everything has been
tuned around them, and that cuts both ways: point a slot at a different model
and it often does worse for reasons that have nothing to do with the model. So
a lot of this has been rewriting prompts to be less dependent on one model's
habits, then re-running the comparison.

It's worth doing because of what it costs. Right now a normal-sized playlist —
research, synthesis, resolution, artwork, everything from start to finish —
costs me about two cents in AI. There's a model I'm testing that does the same
work for around a quarter of a cent. That's roughly eight times cheaper.

Here's one pair from a recent head-to-head, both given the same brief — forty
songs, pop. Live settings took 65.7 seconds and $0.0313. The candidate took
60.7 seconds and $0.0054. Both delivered, near-identical wall clock, about a
sixth of the cost.

The by-job breakdown is where it gets interesting. Research synthesis — the
model call that reads what the search pass gathered, not the gathering itself —
took 27.5 seconds and $0.0084 on the live profile, against 3.3 seconds and
$0.0018 on the candidate. Curation went the other way — the candidate made seven
model calls where live made four — and it was *still* far cheaper overall.
That's the kind of thing you cannot see from a stopwatch and a monthly invoice.

I haven't switched. Changing the model everyone is actually using is a big
change and I'd rather keep running comparisons than find out in production.
But that's the point of having the harness: I get to be slow about it on
purpose.

The honest number from the last thirty days: 65 runs across 9 profiles and 13
different prompts, and only 68% of them produced a playlist at all. Just two
of those actually errored — the rest completed and simply never delivered,
usually because I'd pointed a slot at a model that couldn't hold the tool
contract. Most configurations you try are bad. That's fine. That is precisely the
failure I want happening in the Lab rather than in someone's app, and the
entire month of finding out cost me about twenty-seven cents in API spend.

## Why cost is a user-facing feature

None of this is cost-cutting for its own sake. Every user gets some free usage
each month, and free usage is a real bill I pay — so a cheaper chain means I
can be more generous without it hurting, and I keep more of what paying users
spend. It only works in the other direction if the app stays fast and the
playlists stay good. Cheap and slow, or cheap and mediocre, just loses people.

That's the whole trade the Lab exists to measure: speed, cost, and quality,
visible next to each other instead of one at a time.

## What's changed on the product side

Alongside all of that, most of my recent work has been on retention. The last
update stripped a lot out of onboarding, rebuilt a good chunk of the UI, and
shipped a native macOS version, which I think is the nicest the app has ever
looked. Canvas got simplified too — it used to take some explaining, and now it
mostly doesn't.

The billing side is changing with the next update. Free used to be fifty
credits once and then nothing; it's now a recurring monthly allowance, so
someone who just wants to build the occasional playlist can keep doing that
indefinitely. There's a new Plus tier, cheaper than the existing subscription
with fewer credits, and some things are now gated that weren't before —
research mode, voice chat, and heavy mode. Those are the expensive ones,
particularly voice, and they're also the ones you can happily never touch and
still get the thing you came for.

I've tried to keep the paywalls quiet about it. An upgrade button where it's
relevant, a nudge, and that's it — no interruptions, no modal every third tap.
I'd rather someone use the free tier for a year and like the app than get
squeezed in week one. It does have to make money. It doesn't have to be
annoying about it.

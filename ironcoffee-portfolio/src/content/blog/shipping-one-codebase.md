---
title: "One codebase, five platforms, and the parts nobody warns you about"
date: "2026-08-14"
tags: [expo, react-native, mobile]
excerpt: "Expo and React Native Web really do get you to iOS, Android, web, Mac and TV from one repo. Here is where the seams actually show."
---

Both apps I am actively working on — Beyond25 and Ourlee — ship from a single
Expo and React Native Web codebase. Beyond25 runs on the web, iPhone, iPad,
Android and natively on Mac. The pitch is true: you really do write it once.

The pitch is also incomplete. Here is where the seams show up.

## Payments are not one problem, they are three

Apple wants IAP. The web wants Stripe. Android wants Play Billing. These are not
three implementations of one interface — they have different refund semantics,
different trial mechanics, and different opinions about who owns the subscription
record.

The thing that saved me was refusing to let any of them be the source of truth.
The backend keeps its own ledger of entitlements, and each store is just an event
source writing into it:

```python
async def grant_entitlement(user_id: str, source: Source, payload: dict) -> None:
    """Every store writes here. Nothing reads a store directly."""
    entitlement = normalize(source, payload)
    await ledger.upsert(user_id, entitlement)
```

Once that existed, adding web trials was a day's work instead of a rewrite.

## `Platform.OS` is a smell past a certain point

A couple of `Platform.select` calls are fine. Thirty of them scattered through
components means the abstraction is in the wrong place. The fix is usually to push
the difference down into a module with one shared interface and per-platform
files, so the component never learns which platform it is on.

## The web build will find your layout assumptions

Anything that assumed a fixed viewport, a real scroll container, or a touch-only
input will break the first time it renders in a desktop browser. Not
catastrophically — just wrong enough that you will not notice until someone else
does.

Build the web target early and keep it in CI. A web build that is three months
stale is not a target, it is a rewrite you have not scheduled yet.

## What I would still do again

All of it. One codebase for five platforms is not a compromise, it is leverage —
as long as you are honest that "write once" applies to the UI, not to the
platform contracts underneath it.

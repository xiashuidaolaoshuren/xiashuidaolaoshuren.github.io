---
name: visual-design-spec
description: >-
  Enforces the personal webpage visual direction (ambient tech layering, section
  framing, sidebar identity, motion guardrails) by requiring agents to read the
  design spec before shipping UI. Use when adding or changing sections, pages,
  layout/shell, sidebar, hero, backgrounds, dividers, decorative layers,
  motion, project cards, or any frontend work that affects look-and-feel.
---

# Visual design spec (personal webpage)

## When to use

Apply this skill whenever frontend work changes **visual identity, atmosphere, section framing, sidebar presentation, motion, or decorative assets**—not only new components. Stack and file-layout conventions stay in `AGENTS.md`; this skill adds **visual direction**.

## Required first step

**Read the full spec** before implementing or revising visuals:

`docs/superpowers/specs/2026-04-30-visual-enhancement-design.md`

Rationale, page-specific notes (hero vs content vs projects), and asset guidance live only there—do not guess from memory.

## Quick compliance checklist

**Design principles** (every change should align):

1. Decoration must support hierarchy, depth, or identity.
2. Abstract technical visuals are preferred over literal illustrations.
3. Effects should be low-contrast and non-distracting.
4. Motion should stay in the micro-interaction range.
5. The page must still feel appropriate for ML, software, and research-oriented audiences.

**Motion guardrails**

- Respect `prefers-reduced-motion`.
- Avoid constant looping animations that draw attention away from content.
- Avoid particle-heavy or flashy hero effects.

**Reuse gate** (verbatim from the spec—check before merging visual work)

> This document is the baseline visual direction for future enhancement work on this site. New visual changes should be checked against the following question:
>
> **Does this addition improve hierarchy, depth, or identity while preserving a professional technical tone?**
>
> If the answer is no, the addition should not be included.

## Implementation order (when building new visual systems)

Prefer the sequence in the spec:

1. Reusable ambient background and divider styles globally.
2. Page-level layers in the main layout so routes share the same language.
3. Sidebar identity and active-state styling.
4. Section-level framing (hero and projects areas).
5. Minimal motion only after static composition feels strong.

## Full detail

For chosen direction, background language, sidebar objectives, decorative asset lists, and success criteria, see `docs/superpowers/specs/2026-04-30-visual-enhancement-design.md`.

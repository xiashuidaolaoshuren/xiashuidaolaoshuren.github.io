# Visual Enhancement Design

## Goal

Increase the visual appeal of the personal webpage without losing a professional, tech-industry-facing tone. The site should feel more intentional and premium, especially through page atmosphere, section framing, and sidebar identity, while keeping the content readable and trustworthy.

## Chosen Direction

Use an **ambient tech layering** style.

This means the page should rely on restrained visual structure instead of loud decoration:

- subtle grid, dot-matrix, or schematic-style background textures,
- soft radial glows tied to the existing accent palette,
- clean dividers and section framing,
- sparse AI/data-inspired motifs used as abstract decoration.

The overall impression should be "AI/software portfolio with polish" rather than "marketing landing page" or "playful creative portfolio."

## Design Principles

1. Decoration must support hierarchy, depth, or identity.
2. Abstract technical visuals are preferred over literal illustrations.
3. Effects should be low-contrast and non-distracting.
4. Motion should stay in the micro-interaction range.
5. The page must still feel appropriate for ML, software, and research-oriented audiences.

## Visual System

### Background Language

The site should use a quiet technical backdrop made from reusable visual layers:

- a faint base texture such as a grid or dot pattern,
- one or two soft blurred glows per major area,
- occasional corner-anchored technical accents such as node lines, waveforms, or schematic marks.

These layers should be most visible on large screens and become lighter or simpler on smaller screens.

### Section Framing

Each major section should feel intentionally separated without looking boxed in.

Preferred treatments:

- thin gradient dividers,
- subtle top labels or eyebrow text,
- corner brackets or line accents,
- small variations in ambient background density between sections.

The hero can carry the strongest visual treatment. Mid-page sections should be calmer.

## Sidebar Direction

The sidebar should become a clear visual anchor for the whole site.

### Sidebar Objectives

- Make navigation feel designed instead of plain.
- Improve scannability and active-state clarity.
- Give the left rail a more distinctive identity without making it heavy.

### Recommended Treatments

- Add a stronger top identity zone with name, role, or compact personal mark.
- Introduce a subtle sidebar surface texture or tint.
- Improve active link styling with a restrained glow, accent bar, or tinted background.
- Keep icons clean and aligned with the rest of the visual language.

The sidebar should remain calm and professional; it should not become a decorative showcase on its own.

## Motion Strategy

Motion should be present, but only as polish.

Recommended motion behaviors:

- soft hover/focus transitions in navigation,
- gentle glow drift or pulse in the background,
- section entrance timing differences that remain subtle,
- optional small parallax or depth cues where they do not interfere with reading.

### Motion Guardrails

- Respect `prefers-reduced-motion`.
- Avoid constant looping animations that draw attention away from content.
- Avoid particle-heavy or flashy hero effects.

## Decorative Asset Guidance

The best decorative assets for this site are abstract and technical.

Good fits:

- node-and-edge patterns,
- waveform or signal-inspired line art,
- schematic map or circuit-like traces,
- mathematical or graph-inspired watermark shapes.

Avoid:

- cartoon illustrations,
- generic stock people imagery,
- busy 3D graphics,
- decorative elements that feel "cyberpunk" or game-themed.

## Page-Specific Recommendations

### Hero

- Use the richest ambient background treatment on the page.
- Keep the headline and existing gradient styling as the main focus.
- Support the content with a soft technical backdrop rather than large foreground graphics.

### Content Sections

- Use lighter ambient treatments than the hero.
- Rely on dividers and framing more than decorative shapes.
- Keep reading comfort as the priority.

### Projects Page

- Allow slightly more visual density than the biography-style sections.
- Let project cards feel showcase-oriented, but still restrained.
- Background treatments can be a little richer here because the page is already more visual.

## Implementation Guidance

The preferred implementation order is:

1. Define reusable ambient background and divider styles globally.
2. Apply page-level layers in the main layout so both routes inherit the same design language.
3. Upgrade the sidebar identity and active-state styling.
4. Add section-level framing to hero and projects areas.
5. Add only minimal motion once the static composition already feels strong.

## Success Criteria

The design is successful if:

- the page feels more premium at first glance,
- the sidebar feels like a deliberate part of the design system,
- the backgrounds add atmosphere without reducing readability,
- the site still looks credible for a technical recruiter, engineer, or research audience.

## Reuse Notes

This document is the baseline visual direction for future enhancement work on this site. New visual changes should be checked against the following question:

**Does this addition improve hierarchy, depth, or identity while preserving a professional technical tone?**

If the answer is no, the addition should not be included.

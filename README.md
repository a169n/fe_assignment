# Compound Stepper & Render Props Playground

An assignment-oriented React app that implements an industrial-grade multi-step form system using compound components and render props. The showcase includes optional steps, render-prop labels/content, keyboard-accessible navigation, validation, and theme-aware styling (light/dark with system preference).

## Quickstart

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Core Features

- Compound components: `<Stepper>` with `<Stepper.Steps>`, `<Stepper.Step>`, `<Stepper.Panels>`, `<Stepper.Panel>`, and `<Stepper.Progress>` sharing state via context (no prop drilling).
- Render props: steps and panels accept functions to customize labels and content, with helpers like `goToNext`, `goToPrevious`, and `goToStep`.
- Optional/conditional steps: compliance step toggles on/off while keeping step state synchronized.
- Theme system: light/dark palettes driven by system preference with a manual toggle; Stepper consumes a tokenized `appearance` prop.
- Dynamic form logic: validation on required fields, range sliders, tag editing for skills, risk selection pills, and live summaries.

## Keyboard & A11y

- Tabs/steps: role `tablist`/`tab`/`tabpanel` with linked `aria-controls`/`aria-labelledby`.
- Keyboard: Arrow keys navigate steps, Home/End jump to first/last, Enter/Space activate focused step.
- Progress: `role="progressbar"` exposes percent complete.
- Focus/disabled: tabs respect `disabled`/`aria-disabled`; tab order updates as steps enable/disable.

## Theming Tokens (Stepper)

`appearance` prop accepts partial overrides:

- `primary`, `primarySoft`, `primaryMuted`
- `surface`, `surfaceMuted`, `border`
- `text`, `textMuted`, `success`, `warning`, `track`

Light and dark palettes are defined in `src/App.tsx` and passed to Stepper; downstream controls reuse the same tokens for consistent surfaces and outlines.

## Demo Flow

1. Basics: project name (required), category select, Slack channel.
2. Team: team size slider, methodology select, skills add/remove chips.
3. Compliance (toggleable): risk level pills, owner input, notes.
4. Review: summarized output of all steps.

## File Guide

- `src/components/Stepper.tsx` – compound Stepper library with context, keyboard/A11y handling, render-prop APIs, and theming via `appearance`.
- `src/App.tsx` – demo experience, theme system, conditional compliance step, validation, and dynamic data wiring.
- `src/main.tsx` – React entry point.

## Scripts

- `npm run dev` – start Vite dev server.
- `npm run build` – production build.
- `npm run preview` – preview the production build.
- `npm run lint` – run ESLint checks.
- `npm run format` – format with Prettier.
- `npm run format:check` – verify formatting without writing changes.

## Extension Ideas

- Persist theme choice to localStorage and allow custom palettes.
- Extract tokens into a shared theme module and add unit tests for keyboard navigation/disabled states.
- Provide slot-style APIs for step icons and status indicators.

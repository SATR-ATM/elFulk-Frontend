# ElFulk Frontend

> More about the project will be added here.

---

## Contributing

For branching strategy, commit message format, and general workflow conventions shared across all SATR-ATM repositories, see [CONTRIBUTING.md](./CONTRIBUTING.md).

This section covers everything specific to this repository.

---

### Workflow

- Branch from `dev`, PR targets `dev`
- `main` receives merges from `dev` only when a full feature is complete
- External contributors work from forks; core team pushes branches directly to upstream
- A PR is not ready to merge without its e2e test — use `test.fixme()` if the page is not implemented yet

### CI

Two automated workflows run on this repository:

**`ci.yml`** — runs on every PR targeting `dev`. Verifies the code compiles and passes quality checks before review. Runs `typecheck`, `lint`, and `build`.

**`e2e.yml`** — runs after a PR is merged to `dev` or `main`. After merging, the repository manager adds the e2e test commit to `dev` if it is not already included, which triggers this workflow. It is strongly recommended to run e2e tests locally before pushing to avoid failures after merge.

### Running e2e tests locally

```bash
# install Playwright browsers once
pnpm pretest:e2e

# run tests
pnpm test:e2e
```

If a test fails and you believe the test itself is incorrect rather than the implementation, leave a comment on the PR explaining which assertion is wrong and why. Do not modify the test file without discussing it first.

---

### PR checklist

- [ ] Feature implemented
- [ ] E2E test added or updated in `e2e/`
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes
- [ ] Matches Figma spacing — not pixel-perfect, but no freehand values, use design tokens only
- [ ] All interactive elements have `aria-label` following the convention below

---

### Architecture rules

- **Never use axios** — use native `fetch` for edge compatibility
- **Services must be classes** — service logic goes under `services/`, actions under `services/actions/`
- **shadcn components** go under `components/ui/` only — do not modify them directly, wrap them if you need custom behavior
- **Custom reusable components** go directly under `components/` — if a component is used in more than one page, it lives here
- **Page-specific components** go under `components/<page>/` — if a component is only used in one page, scope it there
- **Custom hooks** go under `hooks/` — never inline a hook inside a component file
- **Shared types** go under `types/` — no inline type definitions used across more than one file
- **Always add `generateMetadata`** for every page — SEO is not optional even for the dashboard

### Rendering strategy

- Prefer **SSR or PPR** over client components — default to server components, opt into `"use client"` only when you need interactivity or browser APIs
- Use the **`<cache>` component** for expensive server-side data fetching shared across a render — do not duplicate fetches across components that need the same data
- Always set the `cache` option explicitly on `fetch` calls (`{ next: { revalidate } }` or `{ cache: 'no-store' }`) — never rely on the default behavior silently

### Media assets

- All images, icons, and illustrations come from **Figma exports only** — do not source assets from the internet
- Export assets at **2x** minimum
- SVGs go under `public/icons/`, raster images go under `public/images/`
- Always provide `alt` text on `<Image>` — empty `alt=""` only for purely decorative elements

### Spacing and design tokens

- Use **Tailwind spacing tokens only** — no arbitrary values like `mt-[23px]` unless there is a documented reason
- Spacing should match Figma — not pixel-perfect, but the visual rhythm must be consistent
- Use `gap`, `space-y`, `px`, `py` from the scale — never mix margin and padding arbitrarily to make something look right

---

### Aria-label convention

All interactive elements must have an `aria-label` in **kebab-case English**, independent of the visible UI language. The UI is in Arabic; the labels are always English.

Format: `{description}-{type}`

Examples:

```
email-input           password-input          confirm-password-input
first-name-input      last-name-input         terms-checkbox
login-submit          register-submit         forgot-password-submit
password-toggle       resend-otp              back-to-login
google-login          apple-login             login-link
otp-input             otp-digit-1 … otp-digit-5
```

This is required for Playwright E2E tests to work reliably across Arabic UI text. Tests select elements exclusively by these labels — if the label is missing or written in Arabic, the test will fail.

# Git & GitHub Guide (Open Source)

This document defines the **default workflow for contributing to this repository** using:

- **GitHub Issues** (work starts with an issue)
- **GitHub Projects** (issues/PRs are tracked on the project board)
- **Forks + Pull Requests** (standard open-source contribution model)

---

## Non‑negotiable rules

1. **`main` is the default branch** (protected)
   - ✅ Changes land via Pull Request (PR)
   - ❌ No direct pushes, no direct merges to `main`

2. **Work starts from an Issue**
   - Create an issue (or pick an existing one)
   - Get it **triaged and assigned** before doing significant work (avoids duplicates)

3. **All work happens on short‑lived branches** in your fork (or in the upstream repo if you’re a maintainer).

4. **Every PR must link to an Issue and be added to the GitHub Project board.**

5. After merge: **delete the branch** (remote + local).

---

## 1) Issues + GitHub Projects (how work is organized)

### 1.1 Start with an Issue (required)

- Bug fix → open an issue describing **steps to reproduce**, expected vs actual, logs/screenshots.
- Feature → open an issue describing **problem**, proposed solution, scope, and acceptance criteria.

✅ Good practice:

- Comment on the issue to claim it.
- Wait for a maintainer to **assign** you (or explicitly approve you to proceed).

> **Note:** For very small changes (typos, formatting, minor docs fixes), some open-source projects accept a PR without an issue. In this project, we prefer opening an issue first for consistent tracking—use your judgment for truly trivial edits.

### 1.2 Add to GitHub Projects (required)

Every tracked piece of work must be in the project board:

- Add the **Issue** to the Project
- Add the **PR** to the same Project

> Tip: On GitHub, open the Issue/PR → right sidebar → **Projects** → select the project.

---

## 2) Branches and naming

### 2.1 Branch naming (required)

Use the GitHub issue number instead of a ClickUp ID.

```
<type>/<issue-number>-<short-kebab-description>
```

**Allowed types**

- `feature/` → new functionality
- `fix/` → bug fix
- `hotfix/` → urgent fix (maintainers only, if needed)
- `refactor/` → refactor without behavior change
- `chore/` → housekeeping (deps, tooling)
- `docs/` → documentation
- `ci/` → CI / pipelines

**Examples**

- `feature/123-profile-avatar-upload`
- `fix/245-login-crash-null-token`
- `refactor/88-api-layer-cleanup`
- `docs/12-update-contributing`

---

## 3) Open‑source contribution flow (fork → PR)

### 3.1 Create / pick an Issue

1. Open or select an Issue (must exist).
2. Get assigned (or get explicit maintainer approval).
3. Make sure the Issue is in the GitHub Project board.

### 3.2 Fork and clone

1. Fork the repo on GitHub.
2. Clone **your fork** locally:

```bash
git clone <your-fork-url>
cd <repo>
```

3. Add the upstream remote (the original repo):

```bash
git remote add upstream <upstream-repo-url>
git remote -v
```

### 3.3 Create a branch from upstream `main`

Always branch from the latest upstream `main`:

```bash
git fetch upstream
git switch dev
git reset --hard upstream/dev
git switch -c feature/123-profile-avatar-upload
```

> Alternative (if you prefer):
> `git pull --rebase upstream dev` instead of `reset --hard` (just keep it clean).

### 3.4 Commit rules (emoji is mandatory)

**Commit format (required)**

```
<emoji> <type>(scope): short description
```

**Examples**

- `✨ feat(profile): add avatar upload`
- `🐛 fix(auth): prevent crash on empty token`
- `🧹 refactor(api): simplify error mapping`
- `📝 docs(readme): update setup instructions`
- `🚀 ci(github): speed up cache strategy`

**Emoji mapping**

- ✨ feature
- 🐛 bug fix
- ❌ breaking change
- 🧹 refactor / cleanup
- 🏗️ build config
- 📝 documentation
- 🗑️ chore / remove
- 🧪 tests
- 🚀 CI / pipeline

✅ Keep commits small and reviewable:

```bash
git add -p
git commit -m "✨ feat(profile): add avatar picker UI"
```

### 3.5 Push to your fork

```bash
git push -u origin feature/123-profile-avatar-upload
```

### 3.6 Open a Pull Request (PR) to upstream `dev`

- Base: `dev` (upstream repo)
- Compare: your fork branch
- Fill the PR template (below)
- Ensure CI passes

✅ Recommended merge method (maintainers):

- **Squash & merge** (keeps history clean)

### 3.7 Link the PR to the Issue (required)

In the PR description, include one of:

- `Closes #123`
- `Fixes #123`
- `Resolves #123`

This will auto-close the issue when the PR is merged.

### 3.8 Keep your PR up to date

If upstream `dev` moved, update your branch:

```bash
git fetch upstream
git rebase upstream/dev
git push --force-with-lease
```

> `--force-with-lease` is safer than `--force`.

### 3.9 After merge: cleanup

On GitHub: click **Delete branch** (if available)

Locally:

```bash
git switch dev
git branch -d feature/123-profile-avatar-upload
```

Remote (your fork):

```bash
git push origin --delete feature/123-profile-avatar-upload
```

---

## 4) Maintainer flow (no fork)

If you have write access to the upstream repo:

- You may create branches directly in the upstream repo **or** use a fork (both are fine).
- You still must:
  - Work on a short‑lived branch
  - Open a PR to `dev`
  - Link the Issue
  - Add Issue + PR to the GitHub Project board

---

## 5) PR template (MANDATORY)

Use this template in the PR description:

```markdown
## Linked Issue

Closes #<issue-number>

## GitHub Project

- [ ] Added this PR to the project board
- [ ] Issue is in the same project board

## Description 📑

## Type of Change

- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 🛠️ Bug fix (non-breaking change which fixes an issue)
- [ ] ❌ Breaking change (fix or feature that would cause existing functionality to change)
- [ ] 🧹 Code refactor
- [ ] 🏗️ Build configuration change
- [ ] 📝 Documentation
- [ ] 🗑️ Chore

## Changes

This pull request includes the following changes:

## Screenshots / Demos 📷

| 01                                    | 02                                    | 03                                    | 04                                    |
| ------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| <img src="" width="100" height="250"> | <img src="" width="100" height="250"> | <img src="" width="100" height="250"> | <img src="" width="100" height="250"> |

## How to test 🚦
```

---

## 6) PR examples (copy‑paste)

### 6.1 ✨ New feature example

**Branch**

- `feature/123-profile-avatar-upload`

**Commits**

- `✨ feat(profile): add avatar picker UI`
- `✨ feat(profile): upload avatar to storage`
- `🧪 test(profile): add avatar upload validation tests`

**PR title**

- `✨ #123: Profile avatar upload`

**PR description**

```markdown
## Linked Issue

Closes #123

## GitHub Project

- [x] Added this PR to the project board
- [x] Issue is in the same project board

## Description 📑

Adds avatar upload to the Profile screen. Users can pick an image, preview it, and upload it.
Includes validation + tests.

## Type of Change

- [x] ✨ New feature (non-breaking change which adds functionality)
- [ ] 🛠️ Bug fix (non-breaking change which fixes an issue)
- [ ] ❌ Breaking change (fix or feature that would cause existing functionality to change)
- [ ] 🧹 Code refactor
- [ ] 🏗️ Build configuration change
- [ ] 📝 Documentation
- [ ] 🗑️ Chore

## Changes

- Added avatar picker + preview UI
- Added upload API integration
- Added validation + tests

## Screenshots / Demos 📷

| 01                                                          | 02                                                          | 03                                                           | 04                                                         |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| <img src="https://.../before.png" width="100" height="250"> | <img src="https://.../picker.png" width="100" height="250"> | <img src="https://.../preview.png" width="100" height="250"> | <img src="https://.../after.png" width="100" height="250"> |

## How to test 🚦

1. Run the app/tests as described in the repo README
2. Verify the feature works end-to-end
3. Run CI locally if applicable
```

### 6.2 🛠️ Bug fix example

**Branch**

- `fix/245-login-crash-null-token`

**Commits**

- `🐛 fix(auth): prevent crash when token is null`
- `🧪 test(auth): add null token regression test`

**PR title**

- `🐛 #245: Fix login crash (null token)`

**PR description**

```markdown
## Linked Issue

Fixes #245

## GitHub Project

- [x] Added this PR to the project board
- [x] Issue is in the same project board

## Description 📑

Fixes a crash on login when the API returns a null/empty token. Adds regression test.

## Type of Change

- [ ] ✨ New feature (non-breaking change which adds functionality)
- [x] 🛠️ Bug fix (non-breaking change which fixes an issue)
- [ ] ❌ Breaking change (fix or feature that would cause existing functionality to change)
- [ ] 🧹 Code refactor
- [ ] 🏗️ Build configuration change
- [ ] 📝 Documentation
- [ ] 🗑️ Chore

## Changes

- Added null/empty token guard
- Added regression unit test

## How to test 🚦

1. Run unit tests for auth module
2. Reproduce the old crash scenario and confirm it’s fixed
```

---

## 7) Quick “how do I…?” (common recipes)

### Undo last commit (not pushed)

```bash
git reset --soft HEAD~1
```

### Fix last commit message

```bash
git commit --amend
```

### Revert a commit (safe on shared branches)

```bash
git revert <sha>
```

### Stash work temporarily

```bash
git stash
git stash pop
```

---

## 8) Quick cheatsheet

**Start (fork workflow)**

```bash
# update fork from upstream
git fetch upstream
git switch main
git reset --hard upstream/main

# create branch
git switch -c feature/123-short-desc
```

**Commit**

```bash
git add -p
git commit -m "✨ feat(scope): short description"
```

**PR**

```bash
git push -u origin feature/123-short-desc
# open PR -> upstream main, link "Closes #123", add to GitHub Project
```

**Update**

```bash
git fetch upstream
git rebase upstream/main
git push --force-with-lease
```

---

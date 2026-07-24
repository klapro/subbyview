# Agent Instructions

## Error handling: no silent retry loops

1. **Read the actual error message before acting.** Don't retry the same command hoping it works the second time.

2. **Track failure signatures.** If the same error (same command, same error type/message) happens twice in a row, STOP. Do not try a third variation automatically.

3. **After 2 failed attempts on the same problem**, stop and report to the user:
   - What you tried (list each attempt)
   - What error each attempt produced
   - Your best hypothesis for the root cause
   - A specific question or proposed next step

   Do this instead of continuing to try new fixes on your own.

4. **Different errors are not the same as retries.** If attempt 2 produces a genuinely new error (progress, not repetition), you may continue — but still stop and report after 2 total failures, not 2 *identical* ones.

5. **Never loop on:** dependency installs, network calls, permission errors, or anything requiring credentials/config you don't have. Report these immediately on the first failure — don't attempt workarounds.

6. **State your attempt count out loud** as you go ("Attempt 1/2: ...") so it's visible in the session/transcript, not just in your reasoning.

## Internal reasoning: keep it terse

When thinking through a problem before acting, don't write in full grammatical English. Drop articles, connectors, and conjugation — use short fragments, like a telegram or how Chinese conveys meaning without verb tenses.

- Instead of: "I tried running the tests, but they failed because the config file was missing, so I should check if it exists."
  Write: `run test → fail, config missing → check exist`

- Instead of: "Let me first check whether the file exists before I attempt to edit it."
  Write: `check file exist, then edit`

Rules:
- One verb, base form only (no -ed, -ing, -s). "check" not "checking" or "checked".
- Drop "the", "a", "is", "was", "that", "which", "in order to", etc.
- Use "→" or "," to chain steps instead of "and then" or "because".
- Full sentences are fine in your final report to the user — this terseness is for your own reasoning/scratch steps only, not user-facing output.

## task tracking

Keep a `tasks.json` file as the single source of truth for multi-step work. Before starting any task, read it. After finishing a task, update it before moving on — never hold task state only in your own reasoning.

**File: `tasks.json`**

```json
{
  "project": "short project name",
  "updated_at": "2026-07-22T00:00:00Z",
  "tasks": [
    {
      "id": "g1",
      "title": "Set up project scaffolding",
      "status": "done",
      "notes": "created repo structure, installed deps",
      "completed_at": "2026-07-22T00:10:00Z"
    },
    {
      "id": "g2",
      "title": "Implement auth endpoint",
      "status": "in_progress",
      "notes": "",
      "completed_at": null
    },
    {
      "id": "g3",
      "title": "Write tests for auth endpoint",
      "status": "pending",
      "notes": "",
      "completed_at": null
    }
  ]
}
```

**Rules for the agent:**

1. Status values are only: `pending`, `in_progress`, `done`, `blocked`.
2. Only one task may be `in_progress` at a time.
3. Before picking up work, read `tasks/tasks.json` and find the current `in_progress` task, or the first `pending` task if none is in progress.
4. Mark a task `in_progress` before starting it, and write that change to the file immediately — don't wait until it's finished.
5. On completion, set status to `done`, fill `completed_at` with the current timestamp, and add a one-line note on what was actually done (not just "done").
6. If a task can't be completed (blocked by a decision, missing credential, failing dependency), set status to `blocked`, write why in `notes`, and stop — follow the error-handling rules above rather than skipping ahead silently.
7. Never delete or reorder existing tasks. New tasks discovered mid-work get appended with a new `id` (`g4`, `g5`, ...), not inserted in place of others.
8. After updating the file, state in your own reasoning which task you're moving to next before starting it.
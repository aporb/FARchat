# Supabase CLI Reference Guide

This document provides a reference for using the Supabase CLI with the FARchat project. The CLI serves as a reliable fallback for interacting with our cloud project while MCP integration is being finalized.

## Project Linking

The project is currently linked to the following cloud project:

- **Project Name:** FARchat_app
- **Project Reference:** `auztrrjdnktyyrcbfcdg`
- **Region:** West US (Oregon)

The linkage is managed via the configuration in `supabase/config.toml` (created after running `supabase link`).

## Authentication

The CLI uses a Personal Access Token (PAT) for authentication. If you need to re-authenticate, you can use:

```bash
npx supabase login
```

## Common Commands

Since the CLI is NOT installed globally, always prefix commands with `npx`.

### Database Management

- **Pull Cloud Schema:** Download the latest schema from the cloud project to your local `supabase/migrations`.
  ```bash
  npx supabase db pull
  ```

- **Run SQL Query:** Execute a raw SQL query against the cloud database.
  ```bash
  npx supabase db query "SELECT * FROM public.profiles LIMIT 10;"
  ```

- **Generate Types:** Generate TypeScript types based on your database schema.
  ```bash
  npx supabase gen types typescript --local > app/src/lib/types/supabase.ts
  ```

### Edge Functions

- **Deploy Function:**
  ```bash
  npx supabase functions deploy <function-name>
  ```

- **List Functions:**
  ```bash
  npx supabase functions list
  ```

### Storage

To interact with storage via SQL (since there isn't a direct `supabase storage` command for most tasks):
```bash
npx supabase db query "SELECT * FROM storage.buckets;"
```

## Troubleshooting

- **Linked Status:** To check if the CLI still sees the project as linked:
  ```bash
  npx supabase status
  ```

- **Project List:** To see all Supabase projects your account has access to:
  ```bash
  npx supabase projects list
  ```

---
*Created on 2025-12-20*

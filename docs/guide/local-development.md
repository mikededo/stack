---
title: Local development
description: Set up a local environment to modify @stack applications to your needs
---

# {{ $frontmatter.title }}

The `stack` uses [Supabase](https://supabase.com/) to store data and avoid the
need to develop a backend. The `stack` can either be run locally or in the
cloud, yet this is currently set up to run locally.

## Local database setup

After having cloned the repository, run the following commands to initialise the
database:

```bash
cd stack/supabase
bunx supabase start
```

This will start the Supabase server locally, by downloading the necessary
containers and setting up the database. In order to access [Supabase
studio](https://supabase.com/blog/supabase-studio), you can access
`http://localhost:54323` in your browser.

You can also run the following command to see all the available services exposed
by Supabase containers:

```bash
bunx supabase status

# Example output:
#          API URL: http://127.0.0.1:54321
#      GraphQL URL: http://127.0.0.1:54321/graphql/v1
#   S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
#           DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
#       Studio URL: http://127.0.0.1:54323
#     Inbucket URL: http://127.0.0.1:54324
# ...
```

::: tip
You can also use:

```bash
bunx db:start
# Shortcut for bunx supabase start
```
:::

Finally, you'll need to create an `.env` file for each application that you want
to run. Aside from each app-specific `.env` variables, they all share the same
for supabase:

```bash
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```

::: tip INFO
All applications that are using Supabase, load the configuration through
functions specified in `@stack/supabase`. In case you are missing any `.env`
configuration, you'll see such errors when starting the applications!
:::

All migrations are stored in [`supabase/migrations`](./supabase/migrations). On
starting the database with `bunx supabase start`, the migrations will be
applied automatically. To apply any migrations manually (i.e., after any update)
run:

```bash
bunx supabase db push --db-url postgresql://postgres:<postgres-password>@api.coolify.orb.local:54322
```

::: warning
This URL would work as long as you keep the config as provided. If there's any
change in the config, you'll have to update the URL accordingly.
:::

In order to know the url and anon key, you can run: `bunx supabase status`

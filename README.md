# Stack

Monorepo setup for the current side projects that I'm working on, made with
[Svelte](https://svelte.dev) and [SvelteKit](https://kit.svelte.dev).
Self-hosted on a [Coolify](https://coolify.io) instance, with
[Supabase](https://supabase.com) as the backend.

## Running locally

In order to run the project locally, there's no need to configure Coolify, as
you can simply run a local Supabase instance. You can do so by running:

```bash
bunx db:start
# Shortcut for bunx supabase start
```

This will start the Supabase server locally, using the
[`config.toml`](./supabase/config.toml) file. Once the supabase server is
running, you can create a new SQL query (`SQL Editor`) by copying the contents
of the `.sql` files in the [`supabase/sql`](./supabase/sql) folder.  
Finally, you'll need to create an `.env` file for each application that you want
to run. Aside from each app-specific `.env` variables, they all share the same
for supabase:

```bash
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```

> In order to know the url and anon key, you can run: `bunx supabase status`

## Running with Coolify

The idea of having Coolify is to simulate a production environment. I'm
currently running Coolify's instance on an [OrbStack Linux
Machine](https://docs.orbstack.dev/machines). So, first, create a new Linux
machine, which your preferred distro, and install Coolify on it. Finally, you
should be able to access the instance at `http://<machine-name>.orb.local:8000`.

### Supabase setup

We'll have to create a Supabase project and create the database for it. A
Supabase instance can easily be created as Coolify provides a set of projects
that you can use. Therefore, create a new project and a Supabase service
afterwards.  
Once the project is created, update the following configurations:

- Kong container:
  - Optionally rename the container to `Kong` or `Api`
  - Update the link to `api.<machine-name>.orb.local`.
- Studio container:
  - Optionally rename the container to `Studio`
  - Update the link to `studio.<machine-name>.orb.local`.

> If you have already deployed the services, the changes will be reflected once
> you restart the containers.

In order to be able to run `supabase` CLI related commands, against the
instance, you will have to expose the pg port. In order to do so, modify the
`docker-compose.yml` provided by Coolify, by adding the following lines in the
`supabase-db` container definition:

```yaml
ports:
  - '54322:${POSTGRES_PORT}'
```

Again, restart the service in case your service was already running. Now, you
should be able to run commands such as `subapase dump` with:

```bash
# The SERVICE_PASSWORD_POSTGRES can be found in the Environment Variables
# section of your instance
bunx supabase db dump --db-url postgresql://postgres:${SERVICE_PASSWORD_POSTGRES}@api.<machine-name>.orb.local:54322/postgres
```

### Application setup

In order to run the application locally, you'll simply need to create a new
Public Repository service in the project dashboard. Make sure to set `main` as
the branch. Using Nixpacks as an alternative to docker is recommended, as no
docker configuration is provided in this repo. Next, you will need to:

- Optional but recommended: rename the service to `Stack - <App name>`
- Update the domain to `<app-name>.<machine-name>.orb.local`
- Modify the commands in the `General > Build` section to:
  - Update the `Install command` command to `bun install --frozen-lockfile`
  - Update the `Build command` command to `turbo build --ui stream --filter @stack/<app-name>`
  - Update the `Start command` command to `bun --cwd apps/<app-name> ./build/index.js`
- Update the port mapping to:
  - `Ports exposes`: 80
  - `Ports mappings`: `<app-port>:80`
- Update the `Environment variables` to:
  - `PUBLIC_SUPABASE_URL`: `http://api.<machine-name>.orb.local:8000`
  - `PUBLIC_SUPABASE_ANON_KEY`: `<anon-key>`

Finally, you can deploy the service. Once deployed, you should be able to
access it at `http://<app-name>.<machine-name>.orb.local`.

#### App ports

Here's the list of the apps and ports in which they are served by default:

| App name        | Port |
| --------------- | ---- |
| @mstack/finance | 3000 |

# Stack database

> Important: Before starting, make sure you read the [Supabase
> setup](../README.md#supabase-setup) section.

The `stack` uses [Supabase](https://supabase.com/) to store data and avoid the
need to develop a backend. The `stack` can either be run locally or in the
cloud, yet this is currently set up to run locally.

## Local setup

After having cloned the repository, run the following commands:

```bash
cd stack/supabase
bunx supabase start
```

This will start the Supabase server locally, by downloading the necessary
containers and setting up the database. In order to access Supabase studio, you
can access `http://localhost:54323` in your browser.

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

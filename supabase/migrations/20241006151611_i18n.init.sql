SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Create schema
CREATE SCHEMA IF NOT EXISTS "i18n";
ALTER SCHEMA "i18n" OWNER TO "postgres";

SET default_tablespace = '';
SET default_table_access_method = "heap";

-- Create keys table
CREATE TABLE IF NOT EXISTS "i18n"."keys" (
    "id" bigint NOT NULL,
    "project_id" bigint,
    "key_name" text NOT NULL,
    "description" text
);
ALTER TABLE "i18n"."keys" OWNER TO "postgres";
ALTER TABLE "i18n"."keys" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "i18n"."keys_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

-- Create languages table
CREATE TABLE IF NOT EXISTS "i18n"."languages" (
    "id" bigint NOT NULL,
    "code" text NOT NULL,
    "name" text NOT NULL
);
ALTER TABLE "i18n"."languages" OWNER TO "postgres";
ALTER TABLE "i18n"."languages" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "i18n"."languages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

-- Create project_languages table
CREATE TABLE IF NOT EXISTS "i18n"."project_languages" (
    "id" bigint NOT NULL,
    "project_id" bigint,
    "language_id" bigint
);
ALTER TABLE "i18n"."project_languages" OWNER TO "postgres";
ALTER TABLE "i18n"."project_languages" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "i18n"."project_languages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

-- Create projects table
CREATE TABLE IF NOT EXISTS "i18n"."projects" (
    "id" bigint NOT NULL,
    "name" text NOT NULL,
    "description" text,
    "owner_id" uuid NOT NULL
);
ALTER TABLE "i18n"."projects" OWNER TO "postgres";
ALTER TABLE "i18n"."projects" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "i18n"."projects_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

-- Create translations table
CREATE TABLE IF NOT EXISTS "i18n"."translations" (
    "id" bigint NOT NULL,
    "key_id" bigint,
    "language_id" bigint,
    "value" text
);
ALTER TABLE "i18n"."translations" OWNER TO "postgres";
ALTER TABLE "i18n"."translations" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "i18n"."translations_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

-- Constraints
ALTER TABLE ONLY "i18n"."keys"
    ADD CONSTRAINT "key_project_unique" UNIQUE ("project_id", "key_name"),
    ADD CONSTRAINT "keys_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "i18n"."languages"
    ADD CONSTRAINT "languages_code_key" UNIQUE ("code"),
    ADD CONSTRAINT "languages_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "i18n"."project_languages"
    ADD CONSTRAINT "project_language_unique" UNIQUE ("project_id", "language_id"),
    ADD CONSTRAINT "project_languages_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "i18n"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "i18n"."translations"
    ADD CONSTRAINT "translation_unique" UNIQUE ("key_id", "language_id"),
    ADD CONSTRAINT "translations_pkey" PRIMARY KEY ("id");

-- Indexes
CREATE INDEX "idx_keys_project_id" ON "i18n"."keys" USING btree ("project_id");
CREATE INDEX "idx_project_languages_language_id" ON "i18n"."project_languages" USING btree ("language_id");
CREATE INDEX "idx_project_languages_project_id" ON "i18n"."project_languages" USING btree ("project_id");
CREATE INDEX "idx_translations_key_id" ON "i18n"."translations" USING btree ("key_id");
CREATE INDEX "idx_translations_language_id" ON "i18n"."translations" USING btree ("language_id");

-- Foreign Keys
ALTER TABLE ONLY "i18n"."keys"
    ADD CONSTRAINT "keys_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "i18n"."projects"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "i18n"."project_languages"
    ADD CONSTRAINT "project_languages_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "i18n"."languages"("id") ON DELETE CASCADE,
    ADD CONSTRAINT "project_languages_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "i18n"."projects"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "i18n"."projects"
    ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "i18n"."translations"
    ADD CONSTRAINT "translations_key_id_fkey" FOREIGN KEY ("key_id") REFERENCES "i18n"."keys"("id") ON DELETE CASCADE,
    ADD CONSTRAINT "translations_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "i18n"."languages"("id") ON DELETE CASCADE;

-- Policies
CREATE POLICY "Allow all actions to projects owned by user" ON "i18n"."projects"
    TO "authenticated"
    USING ("owner_id" = auth.uid());

CREATE POLICY "Allow project owner to perform ALL actions on keys" ON "i18n"."keys"
    USING (EXISTS (
        SELECT 1
        FROM "i18n"."projects" "p"
        WHERE "p"."id" = "keys"."project_id" AND "p"."owner_id" = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1
        FROM "i18n"."projects" "p"
        WHERE "p"."id" = "keys"."project_id" AND "p"."owner_id" = auth.uid()
    ));

CREATE POLICY "Allow project owner to perform ALL actions on translations" ON "i18n"."translations"
    USING (EXISTS (
        SELECT 1
        FROM "i18n"."projects" "p"
        JOIN "i18n"."keys" "k" ON "p"."id" = "k"."project_id"
        WHERE "k"."id" = "translations"."key_id" AND "p"."owner_id" = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1
        FROM "i18n"."projects" "p"
        JOIN "i18n"."keys" "k" ON "p"."id" = "k"."project_id"
        WHERE "k"."id" = "translations"."key_id" AND "p"."owner_id" = auth.uid()
    ));

CREATE POLICY "Enable insert for authenticated users only" ON "i18n"."project_languages"
    TO "authenticated"
    USING (EXISTS (
        SELECT 1
        FROM "i18n"."projects" "p"
        WHERE "p"."id" = "project_languages"."project_id" AND "p"."owner_id" = auth.uid()
    ));

CREATE POLICY "Enable read access for all users" ON "i18n"."languages"
    FOR SELECT
    TO "authenticated"
    USING (true);

-- Enable RLS
ALTER TABLE "i18n"."keys" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "i18n"."languages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "i18n"."project_languages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "i18n"."projects" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "i18n"."translations" ENABLE ROW LEVEL SECURITY;

RESET ALL;

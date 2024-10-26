DROP POLICY IF EXISTS "Allow all actions to projects owned by user" ON "i18n"."projects";
DROP POLICY IF EXISTS "Allow project owner to perform ALL actions on keys" ON "i18n"."keys";
DROP POLICY IF EXISTS "Allow project owner to perform ALL actions on translations" ON "i18n"."translations";
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "i18n"."project_languages";
DROP POLICY IF EXISTS "Enable read access for all users" ON "i18n"."languages";

CREATE POLICY "can_insert_projects"
ON "i18n"."projects"
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "can_manage_own_projects"
ON "i18n"."projects"
FOR ALL
TO authenticated
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

-- Languages policies (globally readable)
CREATE POLICY "languages_readable_by_all"
ON "i18n"."languages"
FOR SELECT
TO authenticated
USING (true);

-- Keys policies (access based on project ownership)
CREATE POLICY "keys_access"
ON "i18n"."keys"
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM "i18n"."projects"
        WHERE "projects"."id" = "keys"."project_id"
        AND "projects"."owner_id" = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM "i18n"."projects"
        WHERE "projects"."id" = "keys"."project_id"
        AND "projects"."owner_id" = auth.uid()
    )
);

-- Project Languages policies (access based on project ownership)
CREATE POLICY "project_languages_access"
ON "i18n"."project_languages"
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM "i18n"."projects"
        WHERE "projects"."id" = "project_languages"."project_id"
        AND "projects"."owner_id" = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM "i18n"."projects"
        WHERE "projects"."id" = "project_languages"."project_id"
        AND "projects"."owner_id" = auth.uid()
    )
);

-- Translations policies (access based on project ownership through keys)
CREATE POLICY "translations_access"
ON "i18n"."translations"
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM "i18n"."keys"
        JOIN "i18n"."projects" ON "keys"."project_id" = "projects"."id"
        WHERE "keys"."id" = "translations"."key_id"
        AND "projects"."owner_id" = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM "i18n"."keys"
        JOIN "i18n"."projects" ON "keys"."project_id" = "projects"."id"
        WHERE "keys"."id" = "translations"."key_id"
        AND "projects"."owner_id" = auth.uid()
    )
);

-- Alter RPC to be security definers
CREATE OR REPLACE FUNCTION "i18n"."create_project"(
  p_name TEXT,
  p_description TEXT,
  p_language_ids INT[],
  p_default_language_id INT,
  p_website_url TEXT DEFAULT NULL
)
RETURNS INT AS $$
DECLARE
  new_project_id INT;
BEGIN
  INSERT INTO projects (name, description, website_url)
  VALUES (p_name, p_description, p_website_url)
  RETURNING id INTO new_project_id;
  
  INSERT INTO project_languages (project_id, language_id, is_default)
  SELECT new_project_id, language_id, CASE WHEN language_id = p_default_language_id THEN TRUE ELSE FALSE END
  FROM UNNEST(p_language_ids) AS language_id;

  RETURN new_project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update table to use authenticated user id 
ALTER TABLE "i18n"."projects" ALTER COLUMN owner_id SET DEFAULT auth.uid();


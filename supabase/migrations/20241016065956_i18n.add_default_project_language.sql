ALTER TABLE "i18n"."project_languages"
ADD COLUMN is_default BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN project_id SET NOT NULL,
ALTER COLUMN language_id SET NOT NULL;

ALTER TABLE "i18n"."keys" ALTER COLUMN project_id SET NOT NULL;

ALTER TABLE "i18n"."translations" ALTER COLUMN key_id SET NOT NULL;
ALTER TABLE "i18n"."translations" ALTER COLUMN language_id SET NOT NULL;

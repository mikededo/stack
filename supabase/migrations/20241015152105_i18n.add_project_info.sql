ALTER TABLE "i18n"."projects"
ADD COLUMN "last_updated" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "website_url" TEXT;

CREATE OR REPLACE FUNCTION project_last_updated()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_project_last_updated
AFTER UPDATE ON "i18n"."projects"
FOR EACH ROW
EXECUTE PROCEDURE project_last_updated();

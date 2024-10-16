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
$$ LANGUAGE plpgsql;


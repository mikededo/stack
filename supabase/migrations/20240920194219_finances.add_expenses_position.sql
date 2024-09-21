-- Add the position to the expenses table as well as populating all existing positions

ALTER TABLE "finances"."expense"
ADD COLUMN "position" integer NOT NULL DEFAULT 1;

WITH ranked_expenses AS (
  SELECT
    id,
    ROW_NUMBER() OVER (PARTITION BY page_id ORDER BY date ASC) AS position
  FROM
    "finances"."expense"
)
UPDATE "finances"."expense" e
SET "position" = r.position
FROM ranked_expenses r
WHERE e.id = r.id;


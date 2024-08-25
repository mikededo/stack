ALTER TABLE finances.budget_plan ADD COLUMN active
BOOLEAN NOT NULL DEFAULT false;

-- Create a function to remove the active plan if any, and set the current plan as active
CREATE OR REPLACE FUNCTION finances.set_active_plan(plan_id NUMERIC)
RETURNS VOID
AS $$
BEGIN
    BEGIN
        IF EXISTS (
            SELECT 1
            FROM finances.budget_plan
            WHERE user_id = auth.uid()
              AND active = TRUE
        ) THEN
            UPDATE finances.budget_plan
            SET active = false
            WHERE user_id = auth.uid()
              AND active = TRUE;
        END IF;

        UPDATE finances.budget_plan
        SET active = true
        WHERE id = plan_id;

    EXCEPTION WHEN OTHERS THEN
        RAISE EXCEPTION 'An error occurred: %', SQLERRM;
    END;

END;
$$ LANGUAGE plpgsql;

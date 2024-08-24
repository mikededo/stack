DROP function finances.update_budget_plan;
CREATE OR REPLACE FUNCTION finances.update_budget_plan(
    plan_id NUMERIC,
    plan_name TEXT,
    plan_total_income NUMERIC,
    allocations JSONB
)
RETURNS JSONB AS $$
DECLARE
    allocation JSONB;
    allocation_id NUMERIC;
    allocation_name TEXT;
    allocation_percentage NUMERIC;
    allocation_amount NUMERIC;
    allocation_plan_id NUMERIC;
    result JSONB;
BEGIN
    BEGIN
        UPDATE finances.budget_plan
        SET name = plan_name,
            total_income = plan_total_income
        WHERE id = plan_id;

        FOR allocation IN SELECT * FROM jsonb_array_elements(allocations)
        LOOP
            allocation_id := NULLIF(allocation->>'id', '')::NUMERIC;
            allocation_name := allocation->>'name';
            allocation_percentage := NULLIF(allocation->>'percentage', '')::NUMERIC;
            allocation_amount := NULLIF(allocation->>'amount', '')::NUMERIC;
            allocation_plan_id := COALESCE(NULLIF(allocation->>'budget_plan_id', '')::NUMERIC, plan_id);

            IF allocation_id IS NULL THEN
                INSERT INTO finances.budget_allocation (budget_plan_id, name, percentage, amount)
                VALUES (
                    id,
                    allocation_name,
                    allocation_percentage,
                    allocation_amount
                );
            ELSE
                UPDATE finances.budget_allocation
                SET name = allocation_name,
                    percentage = allocation_percentage,
                    amount = allocation_amount
                WHERE id = allocation_id;
            END IF;
        END LOOP;

        -- Retrieve the created budget plan along with its allocations
        result := (
            SELECT jsonb_build_object(
                'id', bp.id,
                'name', bp.name,
                'total_income', bp.total_income,
                'created_at', bp.created_at,
                'updated_at', bp.updated_at,
                'allocations', (
                    SELECT jsonb_agg(
                        jsonb_build_object(
                            'id', ba.id,
                            'name', ba.name,
                            'percentage', ba.percentage,
                            'amount', ba.amount
                        )
                    )
                    FROM finances.budget_allocation ba
                    WHERE ba.budget_plan_id = bp.id
                )
            )
            FROM finances.budget_plan bp
            WHERE bp.id = plan_id
        );

        RETURN result;

    EXCEPTION WHEN OTHERS THEN
        RAISE EXCEPTION 'An error occurred: %', SQLERRM;
    END;

END;
$$ LANGUAGE plpgsql;

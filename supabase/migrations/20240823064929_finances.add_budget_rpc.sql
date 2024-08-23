CREATE OR REPLACE FUNCTION finances.create_budget_plan(
    name TEXT,
    total_income NUMERIC,
    allocations JSONB  -- [{ "name": "string", "percentage": number, "amount": number }, ...]
)
RETURNS JSONB AS $$
DECLARE
    new_budget_plan_id BIGINT;
    allocation JSONB;
    allocation_name TEXT;
    allocation_percentage NUMERIC;
    allocation_amount NUMERIC;
    result JSONB;
BEGIN
    BEGIN

        INSERT INTO finances.budget_plan (name, total_income)
        VALUES (name, total_income)
        RETURNING id INTO new_budget_plan_id;

        FOR allocation IN SELECT * FROM jsonb_array_elements(allocations)
        LOOP
            -- https://www.postgresql.org/docs/current/functions-json.html
            allocation_name := allocation->>'name';
            allocation_percentage := NULLIF(allocation->>'percentage', '')::NUMERIC;
            allocation_amount := NULLIF(allocation->>'amount', '')::NUMERIC;

            INSERT INTO finances.budget_allocation (budget_plan_id, name, percentage, amount)
            VALUES (
                new_budget_plan_id,
                allocation_name,
                allocation_percentage,
                allocation_amount
            );
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
            WHERE bp.id = new_budget_plan_id
        );

        RETURN result;

    EXCEPTION WHEN OTHERS THEN
        RAISE LOG 'An error occurred: %', SQLERRM;
        RAISE EXCEPTION 'Transaction failed during budget plan creation for name: %', name;
    END;

END;
$$ LANGUAGE plpgsql;

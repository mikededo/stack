-- TABLES

-- Budget Plans Table
CREATE TABLE finances.budget_plan (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    user_id UUID NOT NULL DEFAULT auth.uid(),
    name TEXT NOT NULL,
    total_income NUMERIC NOT NULL,  -- Total income for this plan
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);


-- Budget Allocations Table
CREATE TABLE finances.budget_allocation (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    budget_plan_id BIGINT NOT NULL,
    name TEXT NOT NULL,
    percentage NUMERIC CHECK (percentage >= 0 AND percentage <= 100),
    amount NUMERIC CHECK (amount >= 0),  -- Can be null if percentage is used
    FOREIGN KEY (budget_plan_id) REFERENCES finances.budget_plan(id) ON DELETE CASCADE
);

-- Preset Budget Plans Table
CREATE TABLE finances.preset_budget_plan (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Preset Budget Plan Allocations Table
CREATE TABLE finances.preset_budget_allocation (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    preset_plan_id BIGINT NOT NULL,
    name TEXT NOT NULL,
    percentage NUMERIC CHECK (percentage >= 0 AND percentage <= 100),
    amount NUMERIC CHECK (amount >= 0),  -- Can be null if percentage is used
    FOREIGN KEY (preset_plan_id) REFERENCES finances.preset_budget_plan(id) ON DELETE CASCADE
);


-- RLS

-- Enable RLS on the budget_plan table
ALTER TABLE finances.budget_plan ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to manage their own budget plans"
ON finances.budget_plan
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());


-- Enable RLS on the budget_allocation table
ALTER TABLE finances.budget_allocation ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to manage their own allocations"
ON finances.budget_allocation
FOR ALL
USING (budget_plan_id IN (SELECT id FROM finances.budget_plan WHERE user_id = auth.uid()))
WITH CHECK (budget_plan_id IN (SELECT id FROM finances.budget_plan WHERE user_id = auth.uid()));

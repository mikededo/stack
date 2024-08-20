-- TEMPLATE PLANS

-- Insert Preset Budget Plans
INSERT INTO finances.preset_budget_plan (name, description)
VALUES 
    ('50/30/20 Rule', 'A simple plan where 50% of income goes to needs, 30% to wants, and 20% to savings and investments'),
    ('Essential Expenses First', 'Prioritizes essential expenses, followed by savings, then discretionary spending'),
    ('Aggressive Savings', 'A plan focusing heavily on savings and investments, with minimal spending on wants'),
    ('Balanced Plan', 'A balanced approach with equal emphasis on savings, needs, and wants')
ON CONFLICT (name) DO NOTHING;  -- Ensures duplicates are not added

-- Insert Preset Budget Allocations for "50/30/20 Rule"
INSERT INTO finances.preset_budget_allocation (preset_plan_id, name, percentage)
VALUES
    ((SELECT id FROM finances.preset_budget_plan WHERE name = '50/30/20 Rule'), 'Needs', 50),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = '50/30/20 Rule'), 'Wants', 30),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = '50/30/20 Rule'), 'Savings & Investments', 20);

-- Insert Preset Budget Allocations for "Essential Expenses First"
INSERT INTO finances.preset_budget_allocation (preset_plan_id, name, percentage)
VALUES
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Essential Expenses First'), 'Needs', 60),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Essential Expenses First'), 'Savings', 20),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Essential Expenses First'), 'Wants', 20);

-- Insert Preset Budget Allocations for "Aggressive Savings"
INSERT INTO finances.preset_budget_allocation (preset_plan_id, name, percentage)
VALUES
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Aggressive Savings'), 'Savings & Investments', 40),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Aggressive Savings'), 'Housing & Utilities', 30),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Aggressive Savings'), 'Groceries', 15),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Aggressive Savings'), 'Transportation', 10),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Aggressive Savings'), 'Entertainment & Dining', 5);

-- Insert Preset Budget Allocations for "Balanced Plan"
INSERT INTO finances.preset_budget_allocation (preset_plan_id, name, percentage)
VALUES
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Balanced Plan'), 'Housing & Utilities', 30),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Balanced Plan'), 'Savings & Investments', 30),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Balanced Plan'), 'Groceries', 20),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Balanced Plan'), 'Entertainment & Dining', 10),
    ((SELECT id FROM finances.preset_budget_plan WHERE name = 'Balanced Plan'), 'Transportation', 10);

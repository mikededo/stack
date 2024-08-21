CREATE TABLE IF NOT EXISTS finances.budget_subscription (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id UUID NOT NULL DEFAULT auth.uid(),
    name TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    payment_interval TEXT NOT NULL CHECK (payment_interval IN ('Monthly', 'Bimonthly', 'Semiannual', 'Annual')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

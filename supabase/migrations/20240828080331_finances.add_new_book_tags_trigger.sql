CREATE OR REPLACE FUNCTION finances.create_book_default_tags()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO finances.tag (book_id, name, color)
    VALUES 
        (NEW.id, 'Debt', '#FF6347'),
        (NEW.id, 'Education', '#4682B4'),
        (NEW.id, 'Food & Dining', '#FFA500'),
        (NEW.id, 'Health & Fitness', '#32CD32'),
        (NEW.id, 'Housing', '#8B4513'),
        (NEW.id, 'Insurance', '#FFD700'),
        (NEW.id, 'Investments', '#2E8B57'),
        (NEW.id, 'Other', '#808080'),
        (NEW.id, 'Personal Finance', '#4B0082'),
        (NEW.id, 'Savings', '#008080'),
        (NEW.id, 'Taxes', '#B22222'),
        (NEW.id, 'Transportation', '#FF4500'),
        (NEW.id, 'Utilities', '#2F4F4F');

    -- Return the new record
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_book_insert
AFTER INSERT ON finances.book
FOR EACH ROW
EXECUTE FUNCTION finances.create_book_default_tags();

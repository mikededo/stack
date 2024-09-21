CREATE OR REPLACE VIEW "finances"."date_sorted_expenses" AS
 SELECT "expense".*
   FROM "finances"."expense"
  ORDER BY "expense"."date";

CREATE OR REPLACE VIEW "finances"."position_sorted_expenses" AS
 SELECT "expense".*
   FROM "finances"."expense"
  ORDER BY "expense"."position";

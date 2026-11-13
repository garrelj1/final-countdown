CREATE TABLE visit_counter (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  total INTEGER NOT NULL CHECK (total >= 0)
);

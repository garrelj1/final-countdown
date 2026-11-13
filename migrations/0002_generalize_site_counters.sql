CREATE TABLE site_counters (
  name TEXT PRIMARY KEY,
  total INTEGER NOT NULL
);

INSERT INTO site_counters (name, total)
SELECT 'visits', total FROM visit_counter WHERE id = 1;

DROP TABLE visit_counter;

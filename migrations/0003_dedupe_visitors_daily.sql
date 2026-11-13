CREATE TABLE visitor_ranks (
  visitor_key TEXT PRIMARY KEY,
  day TEXT NOT NULL,
  rank INTEGER NOT NULL
);

CREATE INDEX visitor_ranks_by_day ON visitor_ranks (day);

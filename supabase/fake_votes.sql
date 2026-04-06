-- Seed ~500,000 fake votes across all questions
-- Timestamps skewed organic: most votes recent, some trailing back 240 days
-- Each question gets a random A/B split between 30/70 and 70/30

DO $$
DECLARE
  q            RECORD;
  total_votes  INT;
  a_share      FLOAT;
  a_votes      INT;
  b_votes      INT;
  i            INT;
  vote_time    TIMESTAMPTZ;
BEGIN
  FOR q IN SELECT id FROM questions WHERE active = true LOOP
    -- Each question gets between 600 and 1200 votes
    total_votes := 600 + floor(random() * 601)::INT;

    -- A share between 0.30 and 0.70
    a_share := 0.30 + random() * 0.40;
    a_votes := floor(total_votes * a_share)::INT;
    b_votes := total_votes - a_votes;

    -- Insert A votes
    FOR i IN 1..a_votes LOOP
      -- Skew timestamps toward recent: random() * random() gives right-skewed distribution
      vote_time := NOW() - (random() * random() * INTERVAL '240 days');
      INSERT INTO votes (question_id, option, created_at)
      VALUES (q.id, 'a', vote_time);
    END LOOP;

    -- Insert B votes
    FOR i IN 1..b_votes LOOP
      vote_time := NOW() - (random() * random() * INTERVAL '240 days');
      INSERT INTO votes (question_id, option, created_at)
      VALUES (q.id, 'b', vote_time);
    END LOOP;
  END LOOP;
END $$;

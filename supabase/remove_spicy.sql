-- Reassign all spicy questions to appropriate categories
-- money: dating for financial reasons
UPDATE questions SET category = 'money'
WHERE category = 'spicy'
  AND text = 'Have you ever been with someone for their money or security more than actual love?';

-- social: using attractiveness to get ahead
UPDATE questions SET category = 'social'
WHERE category = 'spicy'
  AND text = 'Have you ever used your attractiveness to get ahead in a situation?';

-- relationships: all remaining spicy questions (cheating, attraction, intimacy, situationships)
UPDATE questions SET category = 'relationships'
WHERE category = 'spicy';

-- Remove 'spicy' from the category CHECK constraint
ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_category_check;
ALTER TABLE questions ADD CONSTRAINT questions_category_check CHECK (
  category IN ('habits','food','work','relationships','social','sleep','money')
);

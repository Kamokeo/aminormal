-- Schema
create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  option_a text not null,
  option_b text not null,
  category text not null check (
    category in ('habits','food','work','relationships',
                 'social','sleep','money')
  ),
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references questions(id),
  option text not null check (option in ('a','b')),
  created_at timestamptz default now()
);

create or replace view vote_counts as
  select question_id, option, count(*)::int as count
  from votes
  group by question_id, option;

alter table questions enable row level security;
alter table votes enable row level security;

drop policy if exists "public read questions" on questions;
drop policy if exists "public insert votes" on votes;

create policy "public read questions" on questions
  for select using (active = true);

create policy "public insert votes" on votes
  for insert with check (true);

create policy "public read votes" on votes
  for select using (true);

-- Grant select on view for anon role
grant select on vote_counts to anon;
grant select on questions to anon;
grant insert on votes to anon;
grant select on votes to anon;

-- Seed: 60 questions (8-9 per category)

-- HABITS (9)
insert into questions (text, option_a, option_b, category) values
('Do you check your phone within 5 minutes of waking up?', 'Every single morning', 'I try to resist', 'habits'),
('Do you make your bed every day?', 'Always, non-negotiable', 'Life is too short for that', 'habits'),
('Do you fold your laundry the same day you wash it?', 'Obviously', 'It lives on the chair', 'habits'),
('Do you have a consistent morning routine?', 'Yes, I stick to it', 'Chaos is my routine', 'habits'),
('Have you ever googled yourself?', 'Yes, more than once', 'Never crossed my mind', 'habits'),
('Do you bite your nails?', 'Constantly, it''s a problem', 'Never have', 'habits'),
('Do you set multiple alarms to wake up?', 'At least 3 alarms minimum', 'One and done', 'habits'),
('Do you read before going to sleep?', 'Every night', 'Scroll until I pass out', 'habits'),
('Have you ever started a journal and abandoned it within a week?', 'Multiple times', 'I actually kept mine going', 'habits');

-- FOOD (9)
insert into questions (text, option_a, option_b, category) values
('Do you eat the same breakfast every day?', 'Same thing, every morning', 'I mix it up', 'food'),
('Do you eat meals in front of a screen?', 'Almost every meal', 'I prefer eating undistracted', 'food'),
('Have you ever eaten straight from the pot to avoid doing dishes?', 'Regularly', 'That''s where I draw the line', 'food'),
('Do you finish everything on your plate even when you''re full?', 'Can''t leave food behind', 'I stop when I''m done', 'food'),
('Have you ever ordered food delivery when you could have cooked?', 'Out of pure laziness, yes', 'I always cook if I can', 'food'),
('Do you put pineapple on pizza?', 'Yes and I stand by it', 'Absolutely not', 'food'),
('Have you ever eaten a meal that was mostly snacks?', 'Snacks are a food group', 'I eat proper meals', 'food'),
('Do you read nutrition labels before buying food?', 'Every time', 'I just grab what looks good', 'food'),
('Do you drink enough water daily?', 'Probably not honestly', 'Yes, I''m very hydrated', 'food');

-- WORK (8)
insert into questions (text, option_a, option_b, category) values
('Do you check work messages outside of work hours?', 'Constantly, I can''t help it', 'Work ends when I close my laptop', 'work'),
('Have you ever pretended to be busy to avoid a meeting?', 'I''ve mastered this skill', 'I always show up', 'work'),
('Do you procrastinate on important tasks until the last minute?', 'Deadline pressure is my fuel', 'I start things early', 'work'),
('Have you ever taken credit for someone else''s idea at work?', 'I may have embellished once', 'Never, that''s not me', 'work'),
('Do you eat lunch at your desk?', 'Almost every day', 'I always take a proper break', 'work'),
('Have you ever lied on your CV?', 'I stretched the truth once', 'Everything on mine is true', 'work'),
('Do you feel guilty when you take a day off?', 'I can''t fully switch off', 'No, I''ve earned it', 'work'),
('Have you ever done personal tasks during work hours?', 'Obviously, everyone does', 'I keep them strictly separate', 'work');

-- RELATIONSHIPS (9)
insert into questions (text, option_a, option_b, category) values
('Have you ever pretended not to see someone in public?', 'Many times', 'I always say hello', 'relationships'),
('Do you reply to texts immediately or let them sit?', 'Immediately, I hate unread messages', 'I get to them eventually', 'relationships'),
('Have you ever read a partner''s messages without them knowing?', 'I''m not proud, but yes', 'Never, that''s a line I won''t cross', 'relationships'),
('Do you know your close friends'' birthdays without Facebook reminding you?', 'Yes, I actually remember', 'That''s what notifications are for', 'relationships'),
('Have you ever ghosted someone you were talking to?', 'More than I''d like to admit', 'I always at least send a goodbye message', 'relationships'),
('Have you ever talked badly about a friend behind their back?', 'I''ve vented to others, sure', 'I say it to their face or not at all', 'relationships'),
('Do you find it easy to apologize first after an argument?', 'Yes, pride isn''t worth it', 'I wait for them to come to me', 'relationships'),
('Have you ever cancelled plans at the last minute?', 'Yes, I''m a serial canceller', 'I follow through on commitments', 'relationships'),
('Do you remember important dates for the people you care about?', 'Yes, without reminders', 'I rely on my phone for that', 'relationships');

-- SOCIAL (8)
insert into questions (text, option_a, option_b, category) values
('Have you ever faked being busy to avoid social plans?', 'I''m actually very good at this', 'I just tell the truth', 'social'),
('Do you feel drained after spending time with large groups?', 'Every single time', 'I come alive around people', 'social'),
('Have you ever laughed at a joke you didn''t understand?', 'All the time — keeps things smooth', 'I ask what they meant', 'social'),
('Do you find small talk exhausting?', 'Deeply, painfully, yes', 'I actually enjoy it', 'social'),
('Have you ever left a party without saying goodbye to everyone?', 'The Irish goodbye is my specialty', 'I always do the rounds', 'social'),
('Do you scroll through your phone at social events?', 'More than I should', 'I keep it in my pocket', 'social'),
('Have you ever sent a voice note longer than 3 minutes?', 'It was important content', 'I keep them under a minute', 'social'),
('Do you rehearse conversations in your head before having them?', 'I''ve scripted entire dialogues', 'I just go with the flow', 'social');

-- SLEEP (9)
insert into questions (text, option_a, option_b, category) values
('Do you sleep with socks on?', 'Always, feet must be warm', 'Never, that''s unnatural', 'sleep'),
('Do you fall asleep with the TV or music on?', 'I need background noise', 'Total silence only', 'sleep'),
('Have you ever napped for more than 2 hours by accident?', 'I woke up in a different timezone', 'I can''t nap that long', 'sleep'),
('Do you wake up before your alarm goes off?', 'Almost always', 'Never, I sleep through everything', 'sleep'),
('Do you scroll on your phone in bed before sleeping?', 'Until my eyes close', 'I put it away an hour before', 'sleep'),
('Have you ever been so tired you forgot mid-sentence what you were saying?', 'Lost the thread completely', 'I remember everything I say', 'sleep'),
('Do you need complete darkness to sleep?', 'Blackout curtains are essential', 'I can sleep anywhere', 'sleep'),
('Have you ever slept through an important event?', 'Yes, and it was a disaster', 'Never missed anything important', 'sleep'),
('Do you talk in your sleep?', 'Apparently quite a lot', 'I''ve been told I''m silent', 'sleep');

-- MONEY (8)
insert into questions (text, option_a, option_b, category) values
('Have you ever bought something just because it was on sale?', 'That''s just smart shopping', 'Only if I actually needed it', 'money'),
('Do you know exactly how much money is in your account right now?', 'Within €20, yes', 'I have a rough idea at best', 'money'),
('Have you ever lied about the price of something you bought?', 'I may have mentioned a ''discount''', 'I''m always honest about it', 'money'),
('Do you split bills to the cent with friends?', 'Absolutely, fairness matters', 'Close enough is fine with me', 'money'),
('Have you ever bought something, used it once, and kept it?', 'My home is a museum of mistakes', 'I''m careful with purchases', 'money'),
('Do you feel guilty after spending money on yourself?', 'Almost every time', 'I deserve to treat myself', 'money'),
('Have you ever subscribed to something and forgotten to cancel it?', 'I discovered one today actually', 'I track every subscription', 'money'),
('Do you compare prices before making a big purchase?', 'I research for days', 'I buy when it feels right', 'money');

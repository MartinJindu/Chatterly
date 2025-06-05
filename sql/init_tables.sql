
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  bio text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

create policy "Users can manage their own profile"
  on profiles
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

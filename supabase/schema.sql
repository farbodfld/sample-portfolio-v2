-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles (Singleton)
create table profiles (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  headline text,
  short_bio text,
  cta_text text,
  cta_link text,
  image_url text,
  ctas JSONB DEFAULT '[]',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Projects
create table projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text,
  content text,
  image_url text,
  github_url text,
  live_url text,
  tech_stack text[], -- array of text
  featured boolean default false,
  published boolean default true,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Experiences
create table experiences (
  id uuid primary key default uuid_generate_v4(),
  company text not null,
  role text not null,
  start_date text not null,
  end_date text,
  description text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Skills
create table skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text, 
  level integer default 0,
  visible boolean default true,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Site Settings (Singleton)
create table site_settings (
  id uuid primary key default uuid_generate_v4(),
  github_url text,
  linkedin_url text,
  email text,
  resume_url text,
  meta_title text,
  meta_description text,
  og_image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Media Assets
create table media_assets (
  id uuid primary key default uuid_generate_v4(),
  file_name text not null,
  file_url text not null,
  content_type text,
  size_bytes integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)

alter table profiles enable row level security;
alter table projects enable row level security;
alter table experiences enable row level security;
alter table skills enable row level security;
alter table site_settings enable row level security;
alter table media_assets enable row level security;

-- Public read access policies
create policy "Public read access on profiles" on profiles for select using (true);
create policy "Public read access on projects" on projects for select using (published = true);
create policy "Public read access on experiences" on experiences for select using (true);
create policy "Public read access on skills" on skills for select using (visible = true);
create policy "Public read access on site_settings" on site_settings for select using (true);
create policy "Public read access on media_assets" on media_assets for select using (true);

-- Admin full access policies
create policy "Admin full access on profiles" on profiles for all to authenticated using (true) with check (true);
create policy "Admin full access on projects" on projects for all to authenticated using (true) with check (true);
create policy "Admin full access on experiences" on experiences for all to authenticated using (true) with check (true);
create policy "Admin full access on skills" on skills for all to authenticated using (true) with check (true);
create policy "Admin full access on site_settings" on site_settings for all to authenticated using (true) with check (true);
create policy "Admin full access on media_assets" on media_assets for all to authenticated using (true) with check (true);

-- Storage bucket for portfolio-media
insert into storage.buckets (id, name, public, "file_size_limit", "allowed_mime_types")
values ('portfolio-media', 'portfolio-media', true, 5242880, '{"image/jpeg","image/png","image/webp","application/pdf"}')
on conflict (id) do update set 
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Storage public read policy
create policy "Public Access"
on storage.objects for select
to public
using ( bucket_id = 'portfolio-media' );

-- Storage admin write policy
create policy "Admin upload access"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'portfolio-media' );

create policy "Admin update access"
on storage.objects for update
to authenticated
using ( bucket_id = 'portfolio-media' )
with check ( bucket_id = 'portfolio-media' );

create policy "Admin delete access"
on storage.objects for delete
to authenticated
using ( bucket_id = 'portfolio-media' );

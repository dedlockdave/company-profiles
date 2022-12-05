create table
    if not exists user_activities(
        id UUID primary key NOT NULL DEFAULT gen_random_uuid(),
        name varchar not null,
        days jsonb not null,
        activity_type varchar not null,
        created_time timestamptz default (now() at time zone 'utc'),
        user_id uuid not null,
        CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES auth.users(id) on delete cascade,
        unique(
            name,
            user_id
        )
    );
create table
    if not exists user_consumes(
        id UUID primary key NOT NULL DEFAULT gen_random_uuid(),
        name varchar,
        amount float,
        unit varchar,
        days jsonb,
        created_time timestamptz default (now() at time zone 'utc'),
        user_id uuid not null,
        CONSTRAINT user_id FOREIGN KEY(id) REFERENCES auth.users(id) on delete cascade,
        unique(
            name,
            user_id
        )
    );
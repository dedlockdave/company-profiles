create table
    if not exists activities_entries(
        id UUID NOT NULL DEFAULT gen_random_uuid(),
        entry_date timestamptz default CURRENT_DATE,
        
        user_activities_id uuid references user_activities on delete cascade,
        completed BOOLEAN,
        
        user_id uuid not null,
        CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES auth.users(id) on delete cascade,
        unique(
            entry_date,
            user_id,
            user_activities_id
        )
    );
    
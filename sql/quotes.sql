create table quotes(
        id UUID primary key NOT NULL DEFAULT gen_random_uuid(),
        quote varchar not null,
        author varchar not null,
        unique(quote)
    );
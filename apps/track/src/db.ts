export const PAGE_VIEWS_TABLE = `
CREATE TABLE page_views (
    event_id UUID DEFAULT generateUUIDv4(),
    app_name String,
    user_id String,
    session_id String,
    page_url String,
    referrer_url String,
    timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (app_name, timestamp, user_id)
PARTITION BY toYYYYMM(timestamp)
TTL timestamp + INTERVAL 1 YEAR
SETTINGS index_granularity = 8192;
`;

export const USER_ACTIONS_TABLE = `
CREATE TABLE user_actions (
    event_id UUID DEFAULT generateUUIDv4(),
    app_name String,
    user_id String,
    session_id String,
    action_type String,
    action_details String,
    timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (app_name, timestamp, user_id, action_type)
PARTITION BY toYYYYMM(timestamp)
TTL timestamp + INTERVAL 1 YEAR
SETTINGS index_granularity = 8192;
`;

export const SESSIONS_TABLE = `
CREATE TABLE conversions (
    event_id UUID DEFAULT generateUUIDv4(),
    app_name String,
    user_id String,
    session_id String,
    conversion_type String,
    conversion_value Float32,
    timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (app_name, timestamp, user_id, conversion_type)
PARTITION BY toYYYYMM(timestamp)
TTL timestamp + INTERVAL 1 YEAR
SETTINGS index_granularity = 8192;
`;

export const ERROR_TABLE = `
CREATE TABLE errors (
    event_id UUID DEFAULT generateUUIDv4(),
    app_name String,
    user_id String,
    session_id String,
    error_type String,
    error_message String,
    stack_trace String,
    page_url String,
    timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (app_name, timestamp, user_id, error_type)
PARTITION BY toYYYYMM(timestamp)
TTL timestamp + INTERVAL 1 YEAR
SETTINGS index_granularity = 8192;
`;

export const USER_FLOW_TALBE = `
CREATE TABLE user_flow (
    event_id UUID DEFAULT generateUUIDv4(),
    app_name String,
    user_id String,
    session_id String,
    from_page String,
    to_page String,
    timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (app_name, timestamp, user_id, from_page)
PARTITION BY toYYYYMM(timestamp)
TTL timestamp + INTERVAL 1 YEAR
SETTINGS index_granularity = 8192;
`;

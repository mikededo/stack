GRANT USAGE ON SCHEMA i18n TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA i18n TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA i18n TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA i18n TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA i18n GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA i18n GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA i18n GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;


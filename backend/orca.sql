\echo 'Delete and recreate orca db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE orca;
CREATE DATABASE orca;
\connect orca

\i orca-schema.sql
\i orca-seed.sql

\echo 'Delete and recreate orca_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE orca_test;
CREATE DATABASE orca_test;
\connect orca_test

\i orca-schema.sql

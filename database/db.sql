-- CREATE DATABASE database_portfolios;

-- USE database_portfolios;

-- -- USERS TABLE
-- CREATE TABLE users(
--     id INT(11) NOT NULL,
--     username VARCHAR(16) NOT NULL,
--     password VARCHAR(60) NOT NULL,
--     fullname VARCHAR(100) NOT NULL
-- );

-- ALTER TABLE users
--     ADD PRIMARY KEY (id);

-- ALTER TABLE users
--     MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

-- DESCRIBE users;

-- --   SKILLS TABLE
-- CREATE TABLE skills (
--  id int(11) NOT NULL,
--  name varchar(50) DEFAULT NULL,
--  percentage int(100) DEFAULT NULL,
--  id_user int(20) DEFAULT NULL,
-- ); 

-- ALTER TABLE users
--     ADD PRIMARY KEY (id);

-- ALTER TABLE users
--     MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


-- ALTER TABLE links
--     ADD PRIMARY KEY (id);

-- ALTER TABLE links
--     MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

-- DESCRIBE links;


CREATE TABLE technologies (
 id int(11) NOT NULL,
 title varchar(150) NOT NULL,
 level varchar(255) NOT NULL,
 user_id int(11) DEFAULT NULL,
 created_at timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4








DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

USE exampledb;
CREATE TABLE IF NOT EXISTS 'userinfo' {
    'username' VARCHAR (255),
    -- 'salt' VARCHAR (255),
    'password' VARCHAR (255),
    'created_at' DATETIME NOT NULL,
    PRIMARY KEY ('username')
};

CREATE TABLE IF NOT EXISTS 'userfavorite' {
    `id` INTEGER NOT NULL auto_increment,
    'username' VARCHAR (255),
    'favorite' VARCHAR (255),
    'created_at' DATETIME NOT NULL,
    PRIMARY KEY ('username');
};

CREATE TABLE IF NOT EXISTS 'chatinfo' {
    `id` INTEGER NOT NULL auto_increment,
    'username' VARCHAR (255),
    'message' VARCHAR (255),
    'yelp_link' DATETIME NOT NULL,
    PRIMARY KEY ('username');
}
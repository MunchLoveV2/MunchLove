DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

USE exampledb;
DROP TABLE IF EXISTS 'userinfos';
CREATE TABLE 'userinfos' {
    `id` INTEGER auto_increment,
    'username' VARCHAR NOT NULL(255),
    'accountKey' VARCHAR NOT NULL(255),
    'email' VARCHAR NOT NULL (255),
    'createdAt' DATETIME NOT NULL,
    PRIMARY KEY ('id')
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
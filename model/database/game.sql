CREATE DATABASE IF NOT EXISTS gamesjs;
use gamesjs;

CREATE TABLE games(
    id int primary key auto_increment,
    name varchar(200) not null,
    price double(10,2) not null,
    description varchar(2000),
    file blob
);
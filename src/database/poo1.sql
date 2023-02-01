-- Active: 1675098369764@@127.0.0.1@3306

CREATE TABLE videos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    title TEXT NOT NULL,
    duration INTEGER NOT NULL,
    created_at TEXT NOT NULL
);
--DROP TABLE videos;

INSERT INTO videos (id, title, duration, created_at)
VALUES
	("001","filme1", 1.50, (DATETIME()) ),
	("002","filme2", 2.20, (DATETIME()) );

-- Active: 1692570361692@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

-- DELETE FROM users WHERE (email = "rottschaefer54@gmail.com");

INSERT INTO users (id, name, email, password, role)
VALUES("u001","EDU","rott@gmail","12345","admin");

SELECT*FROM users;


CREATE TABLE expenses (
    creator_id TEXT PRIMARY KEY NOT NULL ,
    name TEXT UNIQUE NOT NULL,
    spent REAL NOT NULL,
    to_spend REAL NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    Foreign Key (creator_id) REFERENCES users(id)
);

DROP Table expenses;


INSERT INTO expenses ( creator_id, name, spent, to_spend)
VALUES("u001","Mobilidade",10,200);

SELECT*FROM expenses;

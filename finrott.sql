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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    creator_id TEXT NOT NULL ,
    name TEXT NOT NULL,
    spent REAL NOT NULL,
    to_spend REAL NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    Foreign Key (creator_id) REFERENCES users(id)
);

DROP Table expenses;


INSERT INTO expenses ( creator_id, name, spent, to_spend)
VALUES("ebbc47b8-1c17-4017-a02c-b92d5bdac488","Mobilidade",10,200);

SELECT*FROM expenses;

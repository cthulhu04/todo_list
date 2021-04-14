CREATE DATABASE perntodo;

CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

-- get all todo
-- SELECT * FROM todos;

-- create a todo
-- INSERT INTO todos (description) VALUES('beer') RETURNING *;


-- get a specifiek todo
-- SELECT * from todos WHERE todo_id = ;

-- update a todo
-- UPDATE todos SET description = '' WHERE todo_id = ''

-- delete a todo
-- DELETE todos WHERE todo_id = ;
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


//middleware
app.use(cors());
app.use(express.json());


// routes //

// create a todo
app.post('/todos', async(req, res, next) => {
   try {

    const {description} = req.body;

    const new_todo = await pool.query(
        "INSERT INTO todos (description) VALUES($1) RETURNING *",
        [description]
      );

    res.json(new_todo.rows[0]);
    
   } catch (err) {
       console.error(err.message);
   }
})

// get all todo
app.get('/todos', async (req, res) => {
    try {

        const all_todos = await pool.query("SELECT * FROM todos");

        res.json(all_todos.rows);

    } catch(err) {
        console.error(err.message);
    }
})


// get a todo
app.get('/todos/:id', async (req, res, next) => {
    try {

        const {id} = req.params;

        const todo = await pool.query(
            "SELECT * FROM todos WHERE todo_id = $1",
            [id]
        );

        res.json(todo.rows);

    } catch(err) {

        console.error(err.message);

    }
});

// update a todo
app.put('/todos/:id', async (req, res, next) => {
    try {

        const {id} = req.params;
        const {description} = req.body;

        const update_todo = await pool.query(
            "UPDATE todos SET description = $1 WHERE todo_id = $2",
            [description, id]
        );

        res.json(update_todo)

    } catch(err) {

        console.error(err.message);

    }
});

// delete a todo
app.delete('/todos/:id', async (req, res, next) =>  {
    try {
        const {id} = req.params;

        const delete_todo = await pool.query(
            "DELETE FROM todos WHERE todo_id = $1",
            [id]
        );

        res.json(delete_todo);
    } catch(err) {
        console.error(err.message);
    }
});

// start de server
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`server has started on port localhost:${PORT}`));
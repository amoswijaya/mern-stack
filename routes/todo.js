const routes = require('express').Router();
const Todo = require('../models/todo');
const User = require('../models/user');
const auth = require('../middlewares/auth');

routes.use(auth);
routes.post('/add', async (req, res) => {
  const { title } = req.body;
  console.log(req.decode);
  const newTodo = new Todo({
    title,
    user: req.decode._id,
  });

  newTodo.save((err, todo) => {
    if (err) {
      return res.status(500).json({
        message: 'Error saving todo please try again',
        error: err,
      });
    } else {
      return res.status(201).json({
        message: 'Todo saved successfully',
        todo,
      });
    }
  });
});

routes.get('/list', async (req, res) => {
  console.log(req.decode);
  const todos = await Todo.find({ user: req.decode._id });
  const user = await User.findById(req.decode._id);
  const { nickname, _id } = user;
  return res.status(200).json({
    message: 'Todos fetched successfully',
    nickname,
    _id,
    todos,
  });
});

routes.patch('/completed/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({
      message: 'Todo not found',
    });
  }
  todo.completed = !todo.completed;
  todo.save((err, todo) => {
    if (err) {
      return res.status(500).json({
        message: 'Error updating todo please try again',
        error: err,
      });
    } else {
      return res.status(200).json({
        message: 'Todo updated successfully',
        todo,
      });
    }
  });
});

routes.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({
      message: 'Todo not found',
    });
  }
  todo.remove((err, todo) => {
    if (err) {
      return res.status(500).json({
        message: 'Error deleting todo please try again',
        error: err,
      });
    } else {
      return res.status(200).json({
        message: 'Todo deleted successfully',
        todo,
      });
    }
  });
});

routes.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({
      message: 'Todo not found',
    });
  }
  todo.title = title;
  todo.save((err, todo) => {
    if (err) {
      return res.status(500).json({
        message: 'Error updating todo please try again',
        error: err,
      });
    } else {
      return res.status(200).json({
        message: 'Todo updated successfully',
        todo,
      });
    }
  });
});

module.exports = routes;

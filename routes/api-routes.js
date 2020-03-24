// Dependencies
// =============================================================
const router = require('express').Router();
const db = require('../models');

// Routes
// =============================================================

// Get previous workout
router.get('/workouts', (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// PUT route for updating workout.
app.put('/api/todos', function(req, res) {
  db.Todo.update(
    {
      text: req.body.text,
      complete: req.body.complete,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  ).then(function(dbTodo) {
    res.json(dbTodo);
  });
});

// Create workout
router.post('/workouts', (req, res) => {
  db.Workout.create(req.body)
    .then(db => {
      res.json(db);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;

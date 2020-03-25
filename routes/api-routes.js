// Dependencies
// =============================================================
const router = require('express').Router();
const Workout = require('../models/workout.js');

// Routes
// =============================================================

// Gets all previous workouts
router.get('/api/workouts', (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Add user's new workout
router.post('/api/workouts', ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// PUT route for updating workout exercises by id
router.put('/api/workouts/:id', (req, res) => {
  Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
// Get request for last 7 workouts
router.get('/api/workouts/range', (req, res) => {
  // Organizes workouts by most recent first
  Workout.find({})
    .sort({ _id: -1 })
    .limit(7)
    .then(dbWorkout => {
      console.log(dbWorkout);
      res.json(dbWorkout);
      console.log(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;

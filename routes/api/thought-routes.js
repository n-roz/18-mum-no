// 18.1.7
const router = require('express').Router();

const { getAllThoughts, createThought, getThoughtById, updatThought, deleteThought } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updatThought)
  .delete(deleteThought);

module.exports = router;

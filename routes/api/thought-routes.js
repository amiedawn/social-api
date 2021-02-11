const router = require('express').Router();
const { 
  getAllThoughts, 
  getThoughtById, 
  createThought, 
  updateThought, 
  deleteThought 
} = require('../../controllers/thought-controller');

// GET all thoughts: /api/thoughts
router.route('/').get(getAllThoughts);

// POST thought: /api/thoughts/:userId
router.route('/:userId').post(createThought);

// GET one and PUT thought by ID: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought);

// DELETE thought: /api/thoughts/:userId/:thoughtId
router.route('/:userId/:thoughtId').delete(deleteThought);


module.exports = router;
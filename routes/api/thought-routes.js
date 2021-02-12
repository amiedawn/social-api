const router = require('express').Router();
const { 
  getAllThoughts, 
  getThoughtById, 
  createThought, 
  updateThought, 
  deleteThought,
  createReaction,
  deleteReaction,
  deleteAllThoughts
} = require('../../controllers/thought-controller');

// GET all thoughts: /api/thoughts
router.route('/').get(getAllThoughts);

// POST thought: /api/thoughts/:userId
router.route('/:userId').post(createThought);

// GET one and PUT thought by ID: /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought);

// DELETE thought: /api/thoughts/:userId/:thoughtId
router.route('/:userId/:thoughtId').delete(deleteThought);

// POST reaction: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// DELETE reaction: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// delete thoughts when users are gone
router.route('/deleteAll').delete(deleteAllThoughts);

module.exports = router;
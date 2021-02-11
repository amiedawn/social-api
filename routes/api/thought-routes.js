const router = require('express').Router();
const { getAllThoughts, getThoughtById, addThought, updateThought, removeThought } = require('../../controllers/thought-controller');

// GET all thoughts: /api/thoughts
router.route('/').get(getAllThoughts);

// GET thought by ID: /api/thoughts/:id
//router.route('/:thoughtId').get(getThoughtById);

// POST thought by ID: /api/thought/:id
router.route('/:userId').post(addThought);

// PUT, DELETE by ID /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').get(getThoughtById).put(updateThought).delete(removeThought);

module.exports = router;
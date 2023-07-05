// import data
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieve all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();

    res.status(200).json(comments); 
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retrieve a specific comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      res.status(404).json({ message: 'No comment found with this id!' }); 
      return;
    }

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err); 
  }
});

// Update a comment by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const comment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!comment[0]) {
      res.status(404).json({ message: 'No comment found with this id!' }); 
      return;
    }

    res.status(200).json(comment); 
  } catch (err) {
    res.status(500).json(err); 
  }
});

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);

    res.status(200).json(newComment); 
  } catch (err) {
    res.status(400).json(err); 
  }
});

// Delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData); 
  } catch (err) {
    res.status(500).json(err); 
  }
});

// export data
module.exports = router;
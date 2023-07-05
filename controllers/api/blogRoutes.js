// import required data from models, router, helpers(authentication)
const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieve all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();

    // Respond with JSON containing all blogs
    res.status(200).json(blogs); 
  } catch (err) {
    // Handle server error
    res.status(500).json(err); 
  }
});

// Retrieve a specific blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      // Handle blog not found
      res.status(404).json({ message: 'No blog found with this id!' }); 
      return;
    }

    res.status(200).json(blog); 
  } catch (err) {
    res.status(500).json(err); 
  }
});

// Update a blog by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blog = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!blog) {
      res.status(404).json({ message: 'No blog found with this id!' }); 
      return;
    }

    res.status(200).json(blog); 
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new blog
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);

    res.status(200).json(newBlog); 
  } catch (err) {
    res.status(400).json(err); 
  }
});

// Delete a blog by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' }); 
      return;
    }

    res.status(200).json(blogData); 
  } catch (err) {
    res.status(500).json(err); 
  }
});

// export data
module.exports = router;
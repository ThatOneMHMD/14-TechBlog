// imported data
const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

// a middle ware to authinticate user credintials; if not logged in, send to the /login route
const withAuth = require('../utils/auth');

// GET blog info for the default route
router.get('/', async (req, res) => {
  try {
    // GET USER name to display in nav (simply because why not...)
    const userName = req.session.user_name;

    // Get all blogs and include their associated comments
    const blogData = await Blog.findAll({
      // include the comment and user models appropraitely to enable extracting data accordingly
      include: [
        // including comments but not used here!
        {
          model: Comment,
          attributes: ['id', 'content', 'user_id', 'date_created'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Sort the blogs array in descending order based on date_created
    const blogs = blogData
      .map((blog) => blog.get({ plain: true }))
      .sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

    // Pass serialized data and session flag into template
    res.render('blog', {
      blogs,
      userName,
      logged_in: req.session.logged_in,
      // user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET blog info for the dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // GET USER name to display in nav (simply because why not...)
    const userName = req.session.user_name;

    // get user ID from the session obj
    const userId = req.session.user_id;

    // Get all blogs for the specific user ID and include their associated comments
    const blogData = await Blog.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'user_id', 'date_created'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
      // // I will keep this as a reference: If I ever decided to switch the way comments are presented, this allows me to. But for now, I feel that comments should be served in first come first serve bases, as in the preson who comments first get to stay at the top!
      // // Sort blogs by date_created in descending order: most recent comments appear at the very top
      // order: [[Comment, 'date_created', 'DESC']],
    });

    // Sort the blogs array in descending order based on date_created
    const blogs = blogData
      .map((blog) => blog.get({ plain: true }))
      .sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

    // Pass serialized data and session flag into template
    res.render('dashboard', {
      blogs,
      userName,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET blog info by id. Ended up not using this, but kept for possible future improvements if need be!
router.get('/blogs/:id', async (req, res) => {
  try {
    if (req.session.logged_in) {
      // GET USER name to display in nav (simply because why not...)
      const userName = req.session.user_name;

      // Get all blogs and include their associated comments
      const blogData = await Blog.findByPk(req.params.id, {
        // include the comment and user models appropraitely to enable extracting data accordingly
        include: [
          {
            model: Comment,
            attributes: ['id', 'content', 'user_id', 'date_created'],
            include: [
              {
                model: User,
                attributes: ['name'],
              },
            ],
          },
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      // Serialize blog data
      const blog = blogData.get({ plain: true });

      // Pass serialized data and session flag into template
      res.render('blogID', {
        blog,
        userName,
        logged_in: req.session.logged_in,
      });
    } else {
      // Get all blogs and include their associated comments
      const blogData = await Blog.findByPk(req.params.id, {
        // include the comment and user models appropraitely to enable extracting data accordingly
        include: [
          {
            model: Comment,
            attributes: ['id', 'content', 'user_id', 'date_created'],
            include: [
              {
                model: User,
                attributes: ['name'],
              },
            ],
          },
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      // Serialize blog data
      const blog = blogData.get({ plain: true });

      // Pass serialized data and session flag into template
      res.render('blogID', {
        blog,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET login info to initiate session appropriately
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to the /dashboard route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// When logging in successfully, go to dashboard route
router.post('/login', async (req, res) => {
  try {
    // Redirect the user to the dashboard
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

// export data
module.exports = router;

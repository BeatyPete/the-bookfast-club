const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Upvote } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
  const offset = 0 * 10;
  const limit = 10;

    Post.findAll({
        limit,
        offset,
        attributes: [
          'id',
          'title',
          'cover_img_url',
          'author',
          'publish_date',
          'isbn',
          'description',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM upvote WHERE post.id = upvote.post_id)'), 'upvote_count']
        ],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          /* {
            model: Upvote,
            where: {
              user_id: req.session.user_id
            }
          } */
        ]
      })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  const page = req.params.id;
  const offset = page * 10;
  const limit = 10;

    Post.findAll({
        limit,
        offset,
        attributes: [
          'id',
          'title',
          'cover_img_url',
          'author',
          'publish_date',
          'isbn',
          'description',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM upvote WHERE post.id = upvote.post_id)'), 'upvote_count']
        ],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          /* {
            model: Upvote,
            where: {
              user_id: req.session.user_id
            }
          } */
        ]
      })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
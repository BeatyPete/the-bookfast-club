const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Upvote } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
    Post.findAll({
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
          }
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

/* router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
}); */

module.exports = router;
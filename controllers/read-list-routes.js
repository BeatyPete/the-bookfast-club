const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, ReadList } = require('../models');

router.get('/read-list', (req, res) => {
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
          [sequelize.literal('(SELECT COUNT(*) FROM read_list WHERE post.id = read_list.post_id)'), 'read_list_count']
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

      res.render('read_list', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post } = require("../../models");

// get all added posts for readlist in dashboard
router.get('/:id', (req, res) => {
  
    Post.findAll({
        where: {
          post_id: req.params.post_id
        },
        order: [['id', 'DESC']],
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
            model: Post,
            attributes: ['post_id']
          },
        ]
      })
      .then(dbPostData => {
          const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;

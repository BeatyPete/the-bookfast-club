const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User } = require('../../models');
/* const withAuth = require('../../utils/auth'); */

// get all users
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
      'created_at'
      /* [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'] */
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
        'id',
        'title',
        'cover_img_url',
        'author',
        'publish_date',
        'isbn',
        'description',
        'created_at'
      /* [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'] */
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', /* withAuth, */ (req, res) => {
  Post.create({
    title: req.body.title,
    cover_img_url: req.body.cover_img_url,
    author: req.body.author,
    publish_date: req.body.publish_date,
    isbn: req.body.isbn,
    description: req.body.description,
    /* user_id: req.session.user_id */
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* router.put('/upvote', withAuth, (req, res) => {
  // custom static method created in models/Post.js
  Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}); */

router.delete('/:id', /* withAuth, */ (req, res) => {
  console.log('id', req.params.id);
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
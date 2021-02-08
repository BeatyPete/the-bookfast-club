const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Upvote, Readlist } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  const offset = 0 * 10;
  const limit = 10;

  Post.findAll({
    limit,
    offset,
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

/* router.get('/upvote', (req, res) => {
  // custom static method created in models/Post.js
  Upvote.findAll({
    where: {
      user_id: req.session.user_id
    }
  })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}); */

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

router.post('/', withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    cover_img_url: req.body.cover_img_url,
    author: req.body.author,
    publish_date: req.body.publish_date,
    isbn: req.body.isbn,
    description: req.body.description,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/upvote', withAuth, (req, res) => {
  // custom static method created in models/Post.js
  Post.upvote({ ...req.body, user_id: req.session.user_id }, { Upvote, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/upvote', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Upvote.destroy({
    where: {
      post_id: req.body.post_id,
      user_id: req.session.user_id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No vote found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/readlist', withAuth, (req, res) => {
  // custom static method created in models/Post.js
  Post.readlist({ ...req.body, user_id: req.session.user_id }, { Readlist, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/readlist', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Readlist.destroy({
    where: {
      post_id: req.body.post_id,
      user_id: req.session.user_id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'Not found' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
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
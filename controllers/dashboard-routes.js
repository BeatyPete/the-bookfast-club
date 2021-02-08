const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Readlist } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  
      User.findAll({
          where: {
            id: req.session.user_id
          },
          attributes: { exclude: ['password'] },
          include: [
            {
              model: Post,
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
                [sequelize.literal('(SELECT COUNT(*) FROM upvote WHERE id = upvote.post_id)'), 'upvote_count']
              ],
              include: [
                {
                  model: User,
                  attributes: ['username']
                },
              ]
            },
            {
              model: Readlist,
              include: [
                {
                  model: Post,
                  attributes: [
                    'title',
                    'cover_img_url',
                    'isbn',
                    'author'
                  ]
                }
              ]
            }
          ]
          
        })
        .then(dbUserData => {
            const userArray = dbUserData.map(user => user.get({ plain: true }));
            const userData = userArray[0]
            res.render('dashboard', { userData, loggedIn: true });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
  });

module.exports = router;

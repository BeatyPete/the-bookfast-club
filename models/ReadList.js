const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ReadList extends Model {static upvote(body, models) {
    return models.Upvote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
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
          [sequelize.literal('(SELECT COUNT(*) FROM read_list WHERE post.id = read_list.post_id)'), 'read_list_count']
        ],
      });
    });
  }}

ReadList.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'read_list'
    }
  );
  
  module.exports = ReadList;
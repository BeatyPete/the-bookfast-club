// import all models
const User = require("./User");
const Post = require("./Post");
const Upvote = require("./Upvote");
const Readlist = require("./Readlist");

User.hasMany(Post, {
  foreignKey: "user_id"
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL"
});

User.belongsToMany(Post, {
  through: Upvote,
  as: "upvoted_posts",

  foreignKey: "user_id",
  onDelete: "SET NULL"
});

Post.belongsToMany(User, {
  through: Upvote,
  as: "upvoted_posts",
  foreignKey: "post_id",
  onDelete: "SET NULL"
});

Upvote.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL"
});

Upvote.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL"
});

User.hasMany(Upvote, {
  foreignKey: "user_id"
});

Post.hasMany(Upvote, {
  foreignKey: "post_id"
});


User.belongsToMany(Post, {
  through: Readlist,
  as: "readlisted_posts",

  foreignKey: "user_id",
  onDelete: "SET NULL"
});

Post.belongsToMany(User, {
  through: Readlist,
  as: "readlisted_posts",
  foreignKey: "post_id",
  onDelete: "CASCADE"
});

Readlist.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL"
});

Readlist.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL"
});

User.hasMany(Readlist, {
  foreignKey: "user_id"
});

Post.hasMany(Readlist, {
  foreignKey: "post_id"
});

module.exports = { User, Post, Upvote, Readlist };

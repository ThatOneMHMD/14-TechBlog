// import
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// associations:

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

// export
module.exports = { User, Blog, Comment };
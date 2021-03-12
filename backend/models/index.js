const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Post = require("./Post.js")(sequelize, Sequelize);
db.Comment = require("./Comment.js")(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User, { foreignKey: 'UserId', onDelete: 'CASCADE' });

db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post, { foreignKey: 'PostId', onDelete: 'CASCADE' });
db.Comment.belongsTo(db.User, { foreignKey: 'OwnerId', onDelete: 'CASCADE' });

module.exports = db;


 

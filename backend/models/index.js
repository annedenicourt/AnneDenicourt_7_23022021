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


db.Post.belongsTo(db.User, { foreignKey: 'UserId' });
db.User.hasMany(db.Post);
db.Comment.belongsTo(db.Post, { foreignKey: 'PostId'});
db.Post.hasMany(db.Comment);

module.exports = db;




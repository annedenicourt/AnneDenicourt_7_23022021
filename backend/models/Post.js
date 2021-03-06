module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Post', { 
    id:{ 
        type:Sequelize.INTEGER.UNSIGNED, 
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true
    }, 
    content: { 
      type: Sequelize.TEXT, 
      allowNull:false
    }, 
    image: { 
      type: Sequelize.STRING
    }, 
     createdAt: Sequelize.DATE, 
     updatedAt: Sequelize.DATE, 
}) 


  
    return Post;
};
  
  /*module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('Post', { 
      id:{ 
          type:Sequelize.INTEGER, 
          autoIncrement:true, 
          allowNull:false, 
          primaryKey:true
      }, 
      content: { 
        type: Sequelize.TEXT, 
        allowNull:false
      }, 
      image: { 
        type: Sequelize.STRING
      }, 
      ownerId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    
       createdAt: Sequelize.DATE, 
       updatedAt: Sequelize.DATE, 
  }) 
    
      return Post;
  };*/

  /*module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      content: DataTypes.STRING,
      attachement: DataTypes.STRING,
    },
      {});
    Post.associate = function (models) {
      // associations can be defined here
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Post;
  };*/
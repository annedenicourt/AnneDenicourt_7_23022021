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

    likes: {
      type:Sequelize.INTEGER,
      defaultValue: 0,
    },

     createdAt: Sequelize.DATE, 
     updatedAt: Sequelize.DATE, 
}) 
    return Post;
};
  
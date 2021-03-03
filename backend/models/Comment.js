module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('Comment', { 
      id:{ 
          type:Sequelize.INTEGER, 
          autoIncrement:true, 
          allowNull:false, 
          primaryKey:true
      }, 
      message: { 
        type: Sequelize.TEXT, 
        allowNull:false
      }, 
      ownerId: { 
        type: Sequelize.STRING
      }, 
      postId: { 
        type: Sequelize.STRING
      }, 

       createdAt: Sequelize.DATE, 
       updatedAt: Sequelize.DATE, 
  }) 
    
      return Comment;
  };
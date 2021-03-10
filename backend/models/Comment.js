module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('Comment', { 
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

       createdAt: Sequelize.DATE, 
       updatedAt: Sequelize.DATE, 
  }) 
    
      return Comment;
  };
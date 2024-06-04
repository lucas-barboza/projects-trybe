module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: DataTypes.STRING,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    }, { 
        tableName: 'BlogPosts',
        timestamps: true,
        createdAt: 'published',
        updatedAt: 'updated'
     });
  
     BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, { as:'user', foreignKey: 'userId' });
        BlogPost.belongsToMany(models.Category, { through: 'PostCategory' });
     }
  
     return BlogPost;
  };
module.exports = (sequelize, DataTypes) => {
    const UsersTable = sequelize.define('User', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false, tableName: 'Users'
    });
  
    UsersTable.associate = (models) => {
      UsersTable.hasMany(models.BlogPost, {
        as: 'BlogPosts',
        foreignKey: 'userId'
      });
    };
  
    return UsersTable;
  };
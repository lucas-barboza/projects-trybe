const Category = (Sequelize, DataTypes) => {
    const Category = Sequelize.define('Category', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    }, {
      timestamps: false,
      tableName: 'Categories'
    })
  
    return Category;
  };
  
  module.exports = Category;
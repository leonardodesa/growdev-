module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('cards', {
      id: {
        type: Sequelize.UUID,
        allowNUll: false,
        primaryKey: true,
      },
      id_user: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNUll: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNUll: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNUll: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNUll: false,
      },
    }),

  down: queryInterface => queryInterface.dropTable('cards'),
};

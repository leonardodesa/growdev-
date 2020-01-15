import Sequelize, { Model } from 'sequelize';
import uuid from 'uuid/v4';

class Card extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: () => uuid(),
        },
        title: Sequelize.STRING,
        content: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default Card;

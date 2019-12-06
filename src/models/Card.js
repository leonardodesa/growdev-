
const { Schema, model } = require('mongoose');

const CardSchema = new Schema(
  {
    titulo: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Card', CardSchema);


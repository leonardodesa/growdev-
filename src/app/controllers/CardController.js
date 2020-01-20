import Card from '../models/Card';

class CardController {
  async index(req, res) {
    const { idUser } = req;
    const cards = await Card.findAll({ where: { user_id: idUser } });

    return res.json(cards);
  }

  async show(req, res) {
    const { card } = req;
    return res.json(card);
  }

  async store(req, res) {
    const { title, content } = req.body;
    const { idUser } = req;

    const card = await Card.create({
      title,
      content,
      id_user: idUser,
    });

    res.json(card);
  }

  async update(req, res) {
    const { card } = req;
    const { title, content } = req.body;

    card.title = title;
    card.content = content;

    card.save();

    res.json(card);
  }

  async delete(req, res) {
    const { card } = req;

    card.destroy();

    const cards = await Card.findAll();

    res.json(cards);
  }
}

export default new CardController();

import Card from '../models/Card';

class CardController {
  async index(req, res) {
    const { userId } = req;

    const cards = await Card.findAll({
      where: {
        id_user: userId,
      },
    });

    return res.json(cards);
  }

  async show(req, res) {
    const { card } = req;
    return res.json(card);
  }

  async store(req, res) {
    try {
      const { title, content } = req.body;
      const { userId } = req;
      const card = await Card.create({
        title,
        content,
        id_user: userId,
      });

      res.json(card);
    } catch (error) {
      res.status(500).json({ erro: 'Erro na criação dos cards.' });
    }
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

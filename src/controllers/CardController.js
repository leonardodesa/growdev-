const Card = require('../models/Card')

module.exports = {
  async index(req, res) {
    const cards = await Card.find()

    return res.json(cards)
  },

  async store(req, res) {
    const { titulo, descricao } = req.body

    // UserLogado.cards.push(cards)
    // await UserLogado.save()

    const card = await Card.create({
      titulo: titulo,
      descricao: descricao,
    })

    return res.json(card)
  },

  async update(req, res) {
    const { id } = req.params.id

    const cardEdit = await Card.findOneAndUpdate(
      id,
      req.body,
      { new: true },
      (err, todo) => {
        if (err) return res.status(500).send(err)
        return res.send(todo)
      }
    )

    return res.json(cardEdit)
  },

  async destroy(req, res) {
    try {
      const { id } = req.params

      const cardDeleted = await Card.deleteOne({ _id: id })

      return res.json(cardDeleted)
    } catch (error) {
      return res.json({
        message: 'erro ao deleter o arquivo, status: ' + error.status,
      })
    }
  },
}

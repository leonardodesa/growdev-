
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const users = await User.find();

        return res.json(users);
    },

    async store(req, res) {
        const {username, password} = req.body;

        const user = User.create({
            username, 
            password
        });

        return res.json(user);
    },

    async update(req, res) {

    },

    async delete(req, res) {

    }
}
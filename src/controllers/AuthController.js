const User = require('../models/User');

module.exports = {

    async index(req, res) {
        
    },
    
    async store(req, res) {
        const { email } = req.body;

        try {
            if(await User.findOne({ email }))
                return res.json({
                    success: false,
                    message: 'Usuário já existe!',
                    statusCode: 500
                });

            const user = await User.create(req.body);

            user.password = undefined;

            res.json({ user, message: 'usuário criado com sucesso' , sucess:true, status: 200});
        } catch (e) {
            res.json({
                success: false,
                message: 'Erro para registrar um novo usuário.',
                statusCode: e.code
            });
        }
    },

    async update(req, res) {

    },

    async destroy(req, res) {

    }
    
}

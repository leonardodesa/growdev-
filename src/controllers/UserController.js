
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res) {
        try {
            const users = await User.find();
            
            return res.json(users);
        } catch (error) {
            // return res.json({ success: false, message: 'Usuário criado com sucesso!', statusCode: 500});
        }
    },

    async store(req, res) {
        try {
            const {username, password, password2, email} = req.body;
    
            if(username && password) {
                if(password2 && password == password2) {
                    if(email) {
                        User.findOne({
                            username: username
                        }).then((err, result) => {
                            if (!err) {
                                const salt = bcrypt.genSaltSync(10);

                                const passwordCript = bcrypt.hashSync(password, salt);

                                User.create({
                                    username,
                                    email,
                                    password: passwordCript
                                }).then(() => {
                                    return res.json({ success: true, message: 'Usuário criado com sucesso!', statusCode: 201});
                                }).catch(() => {
                                    return res.json({ success: true, message: 'Erro na criação do usuário', statusCode: 500});
                                });
                            } else {
                                res.json({success: false, message: 'Este usuário já existe.', statusCode: 500});
                            }
                        });
                    } else {
                        return res.json({success: false, message: "Campo e-mail é obrigatório", statusCode: 500});
                    }
                } else {
                    return res.json({success: false, message: "As senhas não conferem", statusCode: 500});
                }
            } else {
                return res.json({success: false, message: "Usuário e Senha são obrigatórios", statusCode: 500});
            }
        } catch (error) {
            return res.json({success: false, message: error, statusCode: 500});
        }
    },

    async update(req, res) {

    },

    async delete(req, res) {

    }
}
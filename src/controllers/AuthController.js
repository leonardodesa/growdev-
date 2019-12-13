const User = require('../models/User');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth.json');
import jwt from "jsonwebtoken";

class AuthController {

    async index(req, res) {
        
    }
    
    async store(req, res) {
        const { email } = req.body;

        try {
            if(await User.findOne({ email }))
                return res.send({
                    success: false,
                    message: 'Usuário já existe!',
                    statusCode: 500
                });

            const user = await User.create(req.body);
            
            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 864000
            });

            res.send({
                user,
                token,
                message: 'usuário criado com sucesso',
                sucess: true,
                status: 200
            });
        } catch (e) {
            res.send({
                success: false,
                message: 'Erro para registrar um novo usuário.',
                statusCode: e.code
            });
        }
    }

    async authenticate(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');        

        if(!user) 
            return res.send({
                success: false,
                message: 'Usuário não encontrado',
                statusCode: 500
            });

        if (!await bcrypt.compare(password, user.password))
            return res.send({
                success: false,
                message: 'Senha inválida',
                statusCode: 500
            });
        
        user.password = undefined;
        
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 864000
        });

        return res.send({
            user,
            token,
            success: true,
            message: 'Usuario logado',
            statusCode: 200
        });
    }

    async update(req, res) {

    }

    async destroy(req, res) {

    }
}

export default new AuthController();

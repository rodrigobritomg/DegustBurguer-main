import *as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from "../models/User";
import authConfig from '../../config/auth';

// determinando como front deve enviar dados de logout para api
class SessionController {
    async store(request, response) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required(),
        })
        const isValid = await schema.isValid(request.body);
        const emailOrPasswordIncorrect = () => {
            response
                .status(401)
                .json({ error: 'Verifique se seu e-mail ou senha estão corretos.' });
        }
        // gerando um erro padrão para quando dados forem incorretos retorna ao from
        if (!isValid) {
            return emailOrPasswordIncorrect();
        }

        // faz a verificação dos dados chegando pelo front,caso esteja incorreto com padrão cai no erro padrão
        const { email, password } = request.body;
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return emailOrPasswordIncorrect();
        }

        const isSamePassword = await user.comparePassword(password);

        if (!isSamePassword) {
            return emailOrPasswordIncorrect();
        }

        return response.status(201).json({
            id: user.id,
            name: user.name,
            email,
            admin: user.admin,
            Token: jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });

    }
}

export default new SessionController();
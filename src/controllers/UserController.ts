import { Request, Response } from 'express';
import { prisma } from '../database';

const UserController = {
    async createUser(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email } = request.body;
            const userExists = await prisma.user.findUnique({ where: { email } });

            if (userExists) {
                return response.json({
                    error: true,
                    message: 'Erro: Usuário já existe'
                });
            }

            const user = await prisma.user.create({
                data: {
                    name,
                    email
                }
            });

            return response.json({
                error: false,
                message: 'Sucesso: Usuário cadastrado com sucesso',
                user
            });
        } catch (error) {
            return response.json({ message: error.message });
        }
    }
};

export default UserController;

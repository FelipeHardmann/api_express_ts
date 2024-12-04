import { Request, Response } from 'express';
import { prisma } from '../database';

const PostController = {
    async createPost(request: Request, response: Response): Promise<Response> {
        try {
            const { title, content, userId } = request.body;

            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    userId
                }
            });

            return response.json({
                error: false,
                message: 'Sucesso: Post cadastrado com sucesso',
                post
            });
        } catch (error) {
            return response.json({ message: error.message });
        }
    },
    async listPost(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const post = await prisma.post.findUnique({ where: { id: Number(id) } });

            if (!post) {
                return response.json({
                    error: true,
                    message: 'Error: Post não encontrado!',
                });
            }

            return response.json({
                error: false,
                post
            });

        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async updatePost(request: Request, response: Response) {
        try {
            const { id, title, content } = request.body;

            const postExists = await prisma.post.findUnique({ where: { id: Number(id) } });

            if (!postExists) {
                return response.json({
                    error: true,
                    message: 'Error: Post não encontrado!',
                });
            }

            const post = await prisma.post.update({
                where: {
                    id: Number(request.body.id)
                },
                data: {
                    title,
                    content
                }
            });

            return response.json({
                error: false,
                message: 'Sucesso: Post atualizado com sucesso!',
                post
            });

        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async deletePost(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const postExists = await prisma.post.findUnique({ where: { id: Number(id) } });

            if (!postExists) {
                return response.json({
                    error: true,
                    message: 'Error: Post não encontrado!',
                });
            }

            const post = await prisma.post.delete({
                where: {
                    id: Number(request.params.id)
                },
            });

            return response.json({
                error: false,
                message: 'Sucesso: Post deletado com sucesso!',
                post
            });

        } catch (error) {
            return response.json({ message: error.message });
        }
    },
};

export default PostController;

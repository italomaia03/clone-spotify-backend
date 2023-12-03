import { Router } from "express";
import {
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "../controllers/userController"; // funções do CRUD
import { authMiddleware } from "../middleware/authMiddleware"; // autenticação

const userRouter: Router = Router();

// rotas com authMiddleware pedem autenticação para serem acessadas
userRouter
    .route("/users")
    .get(getAllUsers) // rota para mostrar todos os usuários cadastrados
    .patch(authMiddleware, updateUser) // rota para editar os dados do usuário
    .delete(authMiddleware, deleteUser); // rota para deletar os dados de um usuário
userRouter.route("/users/:id").get(authMiddleware, getUserById); // rota que mostra o usuário com o id informado na url

export { userRouter };

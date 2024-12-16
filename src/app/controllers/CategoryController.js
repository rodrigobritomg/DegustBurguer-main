import * as Yup from "yup";
import Category from "../models/Category";
import User from "../models/User";

class CategoryController {
  async store(request, response) {
    // Validação dos dados
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // Verificação se o usuário é admin
    const { admin: isAdmin } = await User.findByPk(request.userId);
    if (!isAdmin) {
      return response.status(401).json({ error: "Usuário não autorizado" });
    }

    const { filename: path } = request.file || {}; // Verifica se o arquivo existe
    const { name } = request.body;

    // Verificação se a categoria já existe
    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    });

    if (categoryExists) {
      return response.status(400).json({ error: "Categoria já existe" });
    }

    // Criação da nova categoria
    try {
      const category = await Category.create({
        name,
        path,
      });

      return response.status(201).json(category);
    } catch (err) {
      return response.status(500).json({ error: "Erro ao criar categoria" });
    }
  }

  async index(request, response) {
    const categories = await Category.findAll();
    return response.json(categories);
  }

  async update(request, response) {
    // Validação dos dados
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // Verificação se o usuário é admin
    const { admin: isAdmin } = await User.findByPk(request.userId);
    if (!isAdmin) {
      return response.status(401).json({ error: "Usuário não autorizado" });
    }

    // Verificação se a categoria existe
    const { id } = request.params;
    const findCategory = await Category.findByPk(id);
    if (!findCategory) {
      return response.status(401).json({ error: "Verifique se o ID está correto" });
    }

    // Atualização da categoria
    let path;
    if (request.file) {
      path = request.file.filename;
    }

    const { name } = request.body;

    if (name) {
      // Verificação se já existe uma categoria com o mesmo nome
      const categoryExists = await Category.findOne({
        where: {
          name,
        },
      });
      if (categoryExists && categoryExists.id !== +id) {
        return response.status(400).json({ error: "Categoria já existe" });
      }
    }

    await Category.update(
      {
        name,
        path,
      },
      {
        where: {
          id,
        },
      }
    );

    return response.status(201).json();
  }
}

export default new CategoryController();

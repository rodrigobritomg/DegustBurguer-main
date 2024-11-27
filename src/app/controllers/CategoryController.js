import * as Yup from 'yup';
import Category from '../models/Category';

class CategoryController {
  async store(request, response) {
    // determinando como front deve enviar dados de logout para api
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      // Validar os dados do corpo da requisição
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, } = request.body; // Pegar os dados do corpo

    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    });

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists' });
    }

    // Criar o produto no banco de dados
    const { id } = await Category.create({
      name,
    });

    return response.status(201).json({ id, name }); // Retornar o produto criado
  }

  async index(request, response) {
    // Buscar todos os produtos no banco de dados
    const categories = await Category.findAll();

    return response.json(categories); // Retornar a lista de produtos
  }
}

export default new CategoryController();

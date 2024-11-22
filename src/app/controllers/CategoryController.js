import * as Yup from 'yup';
import Category from '../models/Category';

class CategoryController {
  async store(request, response) {
    // Definir o esquema de validação para os dados do corpo
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      // Validar os dados do corpo da requisição
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // Verificar se o arquivo foi enviado
    if (!request.file) {
      return response.status(400).json({ error: 'File is required.' });
    }

    const { name, } = request.body; // Pegar os dados do corpo

    // Criar o produto no banco de dados
    const category = await Category.create({
      name,
    });

    return response.status(201).json(category); // Retornar o produto criado
  }

  async index(request, response) {
    // Buscar todos os produtos no banco de dados
    const categories = await Products.findAll();

    return response.json(categories); // Retornar a lista de produtos
  }
}

export default new CategoryController();

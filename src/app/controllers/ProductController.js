import * as Yup from 'yup';
import Products from '../models/Products';

class ProductController {
  async store(request, response) {
    // Definir o esquema de validação para os dados do corpo
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
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

    const { filename: path } = request.file; // Pegar o nome do arquivo
    const { name, price, category } = request.body; // Pegar os dados do corpo

    // Criar o produto no banco de dados
    const product = await Products.create({
      name,
      price,
      category,
      path,
    });

    return response.status(201).json(product); // Retornar o produto criado
  }

  async index(request, response) {
    // Buscar todos os produtos no banco de dados
    const products = await Products.findAll();
    console.log({ userId: request.userId });

    return response.json(products); // Retornar a lista de produtos
  }
}

export default new ProductController();

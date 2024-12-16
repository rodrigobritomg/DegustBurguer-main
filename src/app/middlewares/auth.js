import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

function authMiddlewares(request, response, next) {
  const authToken = request.headers.authorization;

  // Verifica se o token foi enviado
  if (!authToken) {
    return response.status(401).json({ error: "Token invalid" });
  }

  // Separa o token no espaço para pegar apenas a segunda parte
  const validToken = authToken.split(" ").at(1);

  // Verifica se o token é válido
  jwt.verify(validToken, authConfig.secret, (err, decoded) => {
    if (err) {
      return response.status(401).json({ error: "Token invalid" });
    }

    // Adiciona os dados do token decodificado à requisição
    request.userId = decoded.id;
    request.userName = decoded.name;

    // Chama o próximo middleware
    return next();
  });
}

export default authMiddlewares;

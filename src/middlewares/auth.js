// fazendo pré definição de onde middllewares irá receber token
function authMiddllewares(request, response, next) {
  const authToken = request.headers.authorization;

  // fazendo verificação caso token não foi enviado
  if (!authToken) {
    return response.status(401).json({ error: "Token invalid" });
  }
/*function authMiddleware(request, response, next) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({ error: 'Token not provided.' });
    }*/

    return next();
}

export default authMiddllewares;
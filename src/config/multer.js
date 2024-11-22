import multer from "multer";
import { extname, resolve } from "node:path";
import { v4 } from "uuid";

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "uploads"),
    filename: (request, file, callback) =>
      callback(null, v4() + extname(file.originalname))

  }),
};

// definindo configuracoes do multer como vai receber onde vai enviar e nome
// multer vai receber file do storage
// destino onde vai salvar - __dirname
//como vai retorna arquivo - usando uuid para não ter conflito com nomes duplicados
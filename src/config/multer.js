import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// Obter o diretório atual do módulo
const __dirname = dirname(fileURLToPath(import.meta.url));

const storageTypes = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'), // Corrigindo o caminho do diretório de destino
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, res) => {

      if (err) return cb(err);

      file.extension = path.extname(file.originalname).replace('.', '');
      file.key = res.toString('hex') + path.extname(file.originalname);
      return cb(null, file.key);
    });
  },
});

const uploadConfig = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'), // Corrigindo o caminho do diretório de destino
  storage: storageTypes,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
};

export default uploadConfig;

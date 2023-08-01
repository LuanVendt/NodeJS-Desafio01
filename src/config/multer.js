import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storageTypes = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, res) => {
      if (err) return cb(err);

      file.extension = path.extname(file.originalname).replace('.', '');
      file.key = res.toString('hex') + path.extname(file.originalname);
      return cb(null, file.key);
    });
  },
});

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
};
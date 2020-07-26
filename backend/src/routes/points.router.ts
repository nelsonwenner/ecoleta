import pointController from '../app/controllers/points.controller';
import pointValidation from '../app/middlewares/points.validations';
import multerConfig from '../config/multer';
import router from './config.router';
import multer from 'multer';

const upload = multer(multerConfig);

export default [

  router.post('/points', upload.single('image'),  pointValidation, pointController.store),
  router.get('/points', pointController.index),
  router.get('/points/:id', pointController.show)
  
]
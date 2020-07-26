import pointController from '../controllers/points.controller';
import router from './config.router';

export default [

  router.post('/points', pointController.store),
  router.get('/points', pointController.index),
  router.get('/points/:id', pointController.show)
  
]
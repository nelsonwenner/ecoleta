import pointController from '../controllers/points.controller';
import router from './config.router';

export default [

  router.post('/points', pointController.store)

]
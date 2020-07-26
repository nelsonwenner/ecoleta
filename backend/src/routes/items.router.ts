import itemsController from '../app/controllers/items.controller';
import router from './config.router';

export default [

  router.get('/items', itemsController.index)

]
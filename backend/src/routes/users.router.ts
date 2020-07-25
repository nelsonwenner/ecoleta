import router from './config.router';

export default [

  router.get('/', (req, res) => {
    return res.json({message: 'hello world'})
  })

]
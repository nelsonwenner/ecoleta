import { Request, Response } from "express";
import knex from '../../database/connection';

class ItemsController {

  async index(req: Request, res: Response) {
    const items = await knex('items').select('*');
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        name: item.title,
        image_url: `${process.env.APP_URL}/uploads/${item.image}`
      }
    });
    return res.json(serializedItems);
  } 
}

export default new ItemsController();
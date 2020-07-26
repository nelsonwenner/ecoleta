import { Request, Response } from "express";
import knex from '../database/connection';

class PointsController {

  async store(req: Request, res: Response) {
    const { 
      name, email, 
      whatsapp, latitude, 
      longitude, city, 
      uf, items 
    } = req.body;
    
    const trx = await knex.transaction();

    const point = {
      image: 'image-fake', name, 
      email, whatsapp, latitude, 
      longitude, city, uf  
    }

    const insertIds = await trx("points").insert(point);

    const point_id = insertIds[0];

    const pointItems = items
      .map((item_id: number) => {
        return {
          item_id,
          point_id: point_id
        }
      });

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return res.json({id: point_id, ...point});
  }
}

export default new PointsController();
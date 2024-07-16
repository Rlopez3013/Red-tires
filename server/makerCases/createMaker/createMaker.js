// import { pool } from '../../db.js';
import { makerRepository } from '../../repository/makerRepository.js';

export const createMaker = async (req, res) => {
  try {
    await makerRepository.createMaker(req.body);
    res.status(201).json({
      //   ok: true,
      //   message: 'New Maker created!',
    });
    console.log(result);
    // res.send('New maker created');
  } catch (error) {
    return res.status(500).json({
      // ok: false,
      // message: 'error.message',
    });
  }
};

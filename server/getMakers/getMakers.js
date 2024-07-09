import { pool } from '../../db.js';
const makerRepository = require('../Repository/makerRepository.js');
/**
 * Naming attributes the same as in the database
 * helps when adding the items back to the database.
 */

const getMaker = async (req, res) => {
  try {
    const makersDB = await makerRepository.getAll();
    const { id } = req.params;
    const [result] = await pool.query(`Select * from Makers WHERE id = ${id}`, [
      // req.params.id,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Maker not found' });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
  }
};

class getMakers {
  constructor(maker_name) {
    this.getMakers = maker_name;
  }
  getMakers() {
    return this.getMakers;
  }
}

class getMakersRepository {
  constructor() {
    this.getMakers = [];

    this.makerItemsDataContext = new makerItemDataContext();
  }
  getAll() {
    return this.makerItemsDataContext.getMakers().then((response) => {
      if (Array.isArray(response)) {
        response.map(() => {
          this.getMakers.push(new MakerItem(getMakers.maker_name));
        });
        return this.makerItem;
      }
    });
  }

  add(makerItem) {
    this.makerItemsDataContext
      .add(makerItem)
      .then((newMakerItem) => {
        this.makerItems.push(makerItem);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }
}

export default getMakers;

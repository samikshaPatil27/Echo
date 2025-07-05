import express from 'express';
import Opinion from '../models/Opinion.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const sort = req.query.sort;
  const now  = new Date();            

  if (sort === 'trending') {

    const opinions = await Opinion.aggregate([
      {
        $addFields: {
          votes: { $add: ['$yes', '$no'] },
          hours: {
            $divide: [{ $subtract: [now, '$createdAt'] }, 1000 * 60 * 60]
          }
        }
      },
      {
        $addFields: {
          score: { $divide: ['$votes', { $add: ['$hours', 2] }] }
        }
      },
      { $sort: { score: -1 } },
      { $limit: 10 }
    ]);
    return res.json(opinions);
  }

  
  const opinions = await Opinion.find().sort({ createdAt: -1 }).limit(10);
  res.json(opinions);
});

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });
  await Opinion.create({ text });
  res.json({ success: true });
});

router.post('/:id/vote', async (req, res) => {
  const { id }   = req.params;
  const { type } = req.body;                 
  const inc      = type === 'yes'
    ? { yes: 1 }
    : type === 'no'
    ? { no: 1 }
    : null;

  if (!inc) return res.status(400).json({ error: 'Invalid vote' });

  await Opinion.findByIdAndUpdate(id, { $inc: inc });
  res.json({ success: true });
});

export default router;

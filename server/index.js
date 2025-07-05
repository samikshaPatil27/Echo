import express          from 'express';
import path             from 'path';
import { fileURLToPath } from 'url';
import { connectDB }    from './db.js';
import { seedOpinions } from './seed.js';
import opinionRoutes    from './routes/opinion.js';

const app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/api/opinions', opinionRoutes);

app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api'))
    return res.sendFile(path.join(__dirname, '../client/index.html'));
  next();
});

const PORT = process.env.PORT || 3000;

connectDB().then(async () => {
  await seedOpinions();                         
  app.listen(PORT, () =>
    console.log(`Echo running at http://localhost:${PORT}`)
  );
});

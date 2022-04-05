import bodyParser from 'body-parser';
import express from 'express';

import todoRoutes from './adapters/portals/todoRoutes.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());
app.use(todoRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

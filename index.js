import express from 'express';
import longWeekendRoutes from './routes/longWeekendRoutes.js';

const app = express();
const PORT = 3000;

app.use('/api/longweekends', longWeekendRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

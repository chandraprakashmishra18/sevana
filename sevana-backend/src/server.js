require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sevana Animal Rescue backend running on port ${PORT}`);
});

const PORT = 5000;

const express = require('express');
const app = express();

// ROUTES
app.get('/hello', (req, res) => {
  res.send('Task Manager API');
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));

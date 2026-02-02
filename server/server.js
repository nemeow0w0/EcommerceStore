// Step import .....
const express = require('express');
const app = express();
const morgan =require('morgan');
const { readdirSync} =require('fs');
const cors = require('cors');
//const authRouter = require('./routes/auth');
//const categoryRouter = require('./routes/category');

// middleware
app.use(morgan('dev'));
app.use(express.json({ limit:'20mb'}));
app.use(cors());

// step 3 Router
//app.use('/api',authRouter);
//app.use('/api',categoryRouter);
// โหลด routes อัตโนมัติ
readdirSync('./routes').forEach((file) => {
  const route = require('./routes/' + file);
  console.log(`✅ Loaded route: ${file}`);  // debug ดูว่าโหลดจริงไหม
  app.use('/api', route);
});

app.get('/api', (req, res)=> {
    //code
    res.send('hello')
});
// step 2 start Server
const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

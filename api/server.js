const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const New_User = require('./models/New_User.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secret = "secret123";


console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000',
}));
app.use(bodyParser.json({extended:true}));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.json("ok");
}  );

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const hashpassword = bcrypt.hashSync(password, 10);
    New_User.create({
            password: hashpassword,
            email,
        }).then(info => {
            jwt.sign({ id: info._id, email: info.email }, secret, (err, token) => {
                if (err) {
                  console.error('Token Creation Error:', err);
                  res.sendStatus(500);
                } else {
                  console.log('Created Token:', token);
                  res.cookie('token', token).json({ id: info._id, email: info.email });
                }
              });
              
        });
        
});

app.get('/user' , (req,res) => {
  const payload = jwt.verify(req.cookies.token, secret);
  New_User.findById(payload.id)
  .then(userInfo => {
    res.json({id:userInfo._id, email:userInfo.email});
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  New_User.findOne({ email }).then(userInfo => {
    if (userInfo) {
      const passok = bcrypt.compareSync(password, userInfo.password);
      if (passok) {
        jwt.sign({ id: userInfo._id, email }, secret, (err, token) => {
          if (err) {
            console.error('Token Creation Error:', err);
            res.sendStatus(500);
          } else {
            console.log('Created Token:', token);
            res.cookie('token', token).json({ id: userInfo._id, email: userInfo.email });
          }
        });
      }
      else{
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401); // Unauthorized
    }
  });
});

app.post('/logout' , (req,res) => {
  res.cookie('token','').send();
})
  

app.listen(4000);
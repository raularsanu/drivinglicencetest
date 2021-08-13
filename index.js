const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT);

app.get('/server/images/:name', (req, res) => {
   const name = req.params.name;
   const path = '/images/' + name + '.svg';
   res.sendFile(path, {root: __dirname});
});

app.get('/server/tests/:category', (req, res) => {
   const testCategory = req.params.category;
   const path = '/testFiles/' + testCategory + '.json';
   res.sendFile(path, {root: __dirname});
});



if(process.env.NODE_ENV === 'production'){

   app.use(express.static('client/build'));

   const path = require('path');
   app.get('*',(req,res)=>{
       res.sendFile(path.resolve(__dirname,'client','build','index.html'));
   });

};

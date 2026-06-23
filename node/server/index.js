
const express=require('express');

const app=express();

app.get('/',(req,res)=>{
    res.send('Hello from Express server');
});

app.get('/about',(req,res)=>{
    res.send('This is the about page');
});

const mysrvr=http.createServer(app);

mysrvr.listen(3000, ()=>{
    console.log('server is listening on port 3000');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
const express = require('express');
const path = require('path');
const { connectDB } = require('./connect');
const urlRoutes = require('./routes/url');
const urlModel = require('./models/url');
const staticRouter = require('./routes/staticRouter');
const app = express();
const PORT = 8181;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/url', urlRoutes);
app.use('/', staticRouter);

app.get('/', (req, res) => {
    return res.render('home');
});

app.get('/test', async(req, res) => {
    const allurls = await urlModel.find({});
    return res.render("home");
});

app.get('/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
    const urlData = await urlModel.findOneAndUpdate({shortId}, {$push: {visithistory:
        {timestamp: Date.now()}}}, {returnDocument: 'after'});

    if(!urlData){
        return res.status(404).json({error:'URL not found'});
    }

    return res.redirect(urlData.redirectUrl);
});

connectDB('mongodb://localhost:27017/short-url-db').then(()=>{
    console.log('Database connected successfully');
}).catch((error)=>{
    console.error('Database connection failed', error);
    process.exit(1);
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

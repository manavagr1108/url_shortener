const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl')
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');
mongoose.connect('mongodb://localhost/urlShortener',{
    useNewUrlParser:true, useUnifiedTopology:true
})

app.use(cors({
    origin: '*',
}))
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/',async (req,res)=>{
    const shortUrls = await ShortUrl.find()
    
    shortUrls.forEach(shorturl=>{
        if(Date.now()-shorturl.date>6000000)
        {
            console.log(shorturl.full)
            // shorturl.remove();
        }
        console.log(Date.now()-shorturl.date)
    })
    res.render('index', { shortUrls: shortUrls});
})
app.post('/shortUrls', async (req,res)=>{
    await ShortUrl.create({full: req.body.fullUrl})
    const shortUrl = await ShortUrl.findOne({ full: req.body.fullUrl })
    const new_short = req.body.name + shortUrl.short;
    await ShortUrl.updateOne({full: req.body.fullUrl},{ $set : { short: new_short}})    
    res.redirect('/')
})
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
    fetch("https://api.db-ip.com/v2/free/self")
    .then(res => res.json())
    .then(data => {
        console.log(data.continentName);
        if(data.continentName=="Asia") shortUrl.Asia++;    
        else if(data.continentName=="Africa") shortUrl.Africa++;    
        else if(data.continentName=="Europe") shortUrl.Europe++;    
        else if(data.continentName=="North_America") shortUrl.North_America++;    
        else if(data.continentName=="South_America") shortUrl.South_America++;    
        else if(data.continentName=="Australia") shortUrl.Australia++;    
        else if(data.continentName=="Antartica") shortUrl.Antartica++;   

    shortUrl.save();})
    res.redirect(shortUrl.full)
  })

app.listen(process.env.PORT || 4000);
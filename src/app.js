// import express
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname,'../public'); //this is going to return the loaction of app.js file
//publicStaticDirPath :this variable actually contains the path to the public data

const viewsPath = path.join(__dirname,'../templates/views');
//viewsPath :this variable actually contains the path to the views

const partialsPath = path.join(__dirname,'../templates/partials');
////partialPath :this variable actually contains the path to the partials

// telling our express server that these are locations where our views directory and partials directory exits
app.set('view engine','hbs');  //we need to give hbs beacuse we want to let our express server know that all the templates,all the html files that are going to be rendered are in the form of handlebars 
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(publicStaticDirPath));
//now express app knows that this public folder contains all the style sheets and js and templating files

//The app. get() function routes the HTTP GET Requests to the path which is being specified with the specified callback functions.
// setting up end points (routes)
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App"
    })
});


//localhost:3000/weather?address=mumbai
app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error:"you must enter address in search in search text box"
        })
    }

    weatherData(address,(error,{temperature,description,cityName,pressure,humidity}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        console.log(temperature,description,cityName,humidity,pressure);
        res.send({
            temperature,
            description,
            cityName,
            humidity,
            pressure
        })
    })
});

app.get('*',(req,res)=>{
    res.render('404',{
        title:"Page Not Found"
    })
})

// The app. listen() function is used to bind and listen to the connections on the specified host and port. 
app.listen(port,()=>{
    console.log("server is running on port :",port);
})

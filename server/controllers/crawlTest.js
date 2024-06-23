
const spawn = require('child_process').spawn;
const type = require('os').type;
const { request } = require('http');
const dataController = require('../models/restaurant_model')
const mongoose = require('mongoose')

const serviceTest = () => {

  try {
      const python = spawn('python', ['./crawl/test.py']);
      let result = "";
      python.stdout.on('data', (data) => {
          result += data.toString()
          console.log("data")
         });

        python.stdout.on("end", function(){
        console.log("end")

        let updateValues = { data: result }
        console.log(updateValues)
        let dataJson = JSON.parse(updateValues["data"]);
        const Restaurant = dataController
        Restaurant.insertMany(dataJson)
    })
      
  } catch {
      res.status(502).json({message: "message denied"});
  }
}

module.exports = {serviceTest}

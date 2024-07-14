const spawn = require('child_process').spawn;
const type = require('os').type;
const request = require('http');
const dataController = require('../models/restaurant_model')
const mongoose = require('mongoose')
const axios = require('axios');
const { writeFile, readFile } = require('fs');

const productGroups = () => {
  const urlProductGroups = "https://cfapi.voikukka.fi/graphql?operationName=RemoteNavigation&variables=%7B%22id%22%3A%22603116906%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22707a9c68de67bcde9992a5d135e696c61d48abe1a9c765ca73ecf07bd80c513f%22%7D%7D"
  const headersOpt = {
    "content-type": "application/json",
    "url": urlProductGroups
  };
  axios.get(urlProductGroups, {
    headers: {
      "content-type": "application/json"
    }
  }).then(res => {
    const data = res.data.data
    // console.log(data)
    const store = data.store
    const navigation = store.navigation
    console.log(navigation)
    console.log(navigation[navigation.length - 1])
  }).catch(error => {
    console.log(error);
  });
}
const stores = () => {
  const cursor = [
    null,
    "%22eyJwcmVmZXJlbmNlIjoiZzk4c2dzIiwic29ydCI6WyIzYTRjNDhlNS04MWYwLTRiM2EtOWJhYS1lZGNjYzZhYWQ2MzUiXX0%22", // ok   
    "%22eyJwcmVmZXJlbmNlIjoiZzk4c2dzIiwic29ydCI6WyI4MDU2MzkwNS03NTA2LTRhMTMtOTMwYS00N2I2Y2M3MTYzM2QiXX0%22", // ok
    "%22eyJwcmVmZXJlbmNlIjoiZzk4c2dzIiwic29ydCI6WyJkMzRiMWFhMy0xZTAyLTQxYTAtOTAxNC01N2NlOGNjNDM0ZGQiXX0%22",// ok
  ]

  const path = './data/store_prisma.json';
  let combined_data = []
  cursor.forEach(portion => {
    let urlProductGroups = `https://cfapi.voikukka.fi/graphql?operationName=RemoteStoreSearch&variables=%7B%22query%22%3Anull%2C%22brand%22%3A%22PRISMA%22%2C%22cursor%22%3A${portion}%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22e49317e01c3a57b286fadd6f3ea47fd1d64adebb483943ba0e229307d15763b5%22%7D%7D`
    axios.get(urlProductGroups, {
      headers: {
        "content-type": "application/json"
      }
    }).then(res => {
      const data = res.data.data
      const searchStores = data.searchStores
      const stores = searchStores.stores
      combined_data = combined_data.concat(stores)
      if (combined_data.length == 93) {
        writeFile(path, JSON.stringify(combined_data), (error) => {
          if (error) {
            console.log('An error has occurred ', error);
            return;
          }
          console.log('Data written successfully to disk');
        });
      }
    }).catch(error => {
      console.log(error);
    });
  })
}
const smarket = () => {
  const cursor = [
    null,
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyIxNTdiOGQ4Ny01ZjU0LTQ0NTctOTllNS0xODViZWMzMzAwNGMiXX0%22", 
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyIyYWY1OTg4YS0xNzlmLTQ5M2EtYmNlNi1iZWMwNmJlNDc3MGQiXX0%22", 
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyIzODllMjU0Ni1kZTM3LTQyOGMtYjFmMC1kYThmZGE0ZjUwYzAiXX0%22",
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyI0NTk4MDA4Yi03MDI1LTRmYmQtYmM4Yy1mNjUzZjQ0ZTk5YTIiXX0%22", 
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyI1NDFlNjZhZi1kZjE4LTQzYjQtYjE2Yi0wNTVkNzk2NGZlYWIiXX0%22", 
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyI2MGM1ODU0Mi0wN2I2LTQxNjgtYmEzMC1lMGU2MzM1ZjkyZDciXX0%22",
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyI2ZTM3Y2ExYS1mNmRiLTQ5YTQtYWMzOS1kYjIxZTliZTQ3YTQiXX0%22", 
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyI4MTI2YTVkYS1iYjk0LTQxNzctYWI3Yi0wMTNiZjQzODVkNTQiXX0%22", 
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyI4ZmVhYmZhOC0wZGY5LTRhNjEtYjE1ZC03MTliN2I3MmUyZGQiXX0%22",
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyJhMWUyYzQyMy04ODQxLTRlYTMtYTRhNi00NTI4N2M0Mzc2MjEiXX0%22", 
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyJhYzg0NTMwMy00M2ZkLTRkNzYtYjdlZi1lMzM4NmQ2ODViYjQiXX0%22", 
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyJiODU1MzNlNC0yNDZjLTQ1MTUtOTA0Yy1jMjkxNWQ4NjY4MTkiXX0%22",
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyJjNGFmOWRkOC00YmE2LTQxZWYtYWZiOS1lZDViNWNhNTlhNDQiXX0%22", 
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyJjZDlhMGJkOS03YjAwLTQwYjMtYjE1Yy1mMWNiMzExNDNjODAiXX0%22", 
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyJkYTY3MzYxYi0yMjA3LTQ4MDAtODJhNi1jZDc2ZWY4Y2NkMDAiXX0%22",
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyJlNzNiMzU0MC1hNTNlLTQwNmQtODIwNC0zNDZkZDg5YzQ3YTMiXX0%22",
    "%22eyJwcmVmZXJlbmNlIjoiNmRvMGlmIiwic29ydCI6WyJmM2U4MzhiYi00YTRjLTRhYTktOWNjNC04NDU4NWFjNTYyZDciXX0%22",
    "%22eyJwcmVmZXJlbmNlIjoiaDg3YWUiLCJzb3J0IjpbIjBjMTZlYmM5LTE5MWYtNGUwMS05MTZlLTQ0NjU4MTgzOWVkZCJdfQ%22",
  ]
const path = './data/store_smarket.json';
  let combined_data = []
  cursor.forEach(portion => {
    let urlProductGroups = `https://cfapi.voikukka.fi/graphql?operationName=RemoteStoreSearch&variables=%7B%22query%22%3Anull%2C%22brand%22%3A%22S_MARKET%22%2C%22cursor%22%3A${portion}%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22e49317e01c3a57b286fadd6f3ea47fd1d64adebb483943ba0e229307d15763b5%22%7D%7D`
    axios.get(urlProductGroups, {
      headers: {
        "content-type": "application/json"
      }
    }).then(res => {
      const data = res.data.data
      const searchStores = data.searchStores
      const stores = searchStores.stores
      const cur = searchStores.cursor
      combined_data = combined_data.concat(stores)
      
      if (combined_data.length == 455) {
        console.log(combined_data)
        writeFile(path, JSON.stringify(combined_data), (error) => {
          if (error) {
            console.log('An error has occurred ', error);
            return;
          }
          console.log('Data written successfully to disk');
        });
      }
    }).catch(error => {
      console.log(error);
    });
  })
}
const sale = () => {
  const cursor = [
    null,
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiMTA2MjU4Y2ItMWY0OC00NjhmLWJiOWUtMzEyNWZiMzkzMzA5Il19%22",
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiMjBjODlmZmYtZDQ3NC00YTUxLTljMjEtOGRmNDRlZTA3ZjIxIl19%22",
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiMzY3Y2JlODktNWNlNS00YzgxLTljZDYtNmM4NDk5OTZkZTFiIl19%22",
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiNGM1OGNkN2UtMDNlZi00NjQxLWFlOWMtMzNiYTJjZmVmMjA4Il19%22",
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiNWVmMDk0YWUtZGE2ZS00ZWVkLTkxM2EtNmU3MmY1OTdiNjEzIl19%22",
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiN2VjNDFhN2MtNDE1MC00MzM3LWJkY2EtN2EwNDliZWYyYmIzIl19%22",
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiOGY5ODFmMGUtNTIzNy00NDRiLTkyNjgtMzkxMzA1ZjcwNmE3Il19%22",
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiYTc5NmQ0MGEtZDk3MS00YTIzLThmNjAtZWRiMDE4ZmVmYjIwIl19%22",
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiYmZkNWUxZTgtMTZhMi00MGRkLTgwYmItMDk2NDQxMTFmNGNiIl19%22",
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiZDExNWUzZjEtMzc4OC00MzU1LWI5YWQtNDU3MDQ2ODFhNjU2Il19%22",
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiZTJlOThhM2MtNjFiYi00MDhjLWIzMGEtOGY4OTU0ZGE5Y2U0Il19%22",
    "%22eyJwcmVmZXJlbmNlIjoiNDY1Z3hxbSIsInNvcnQiOlsiZjI5ZGNkMjktYWRjNS00Mzg1LWExYzUtZDBkYjJhYzlmNDVmIl19%22"
  ]
const path = './data/store_sale.json';
  let combined_data = []
  cursor.forEach(portion => {
    let urlProductGroups = `https://cfapi.voikukka.fi/graphql?operationName=RemoteStoreSearch&variables=%7B%22query%22%3Anull%2C%22brand%22%3A%22SALE%22%2C%22cursor%22%3A${portion}%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22e49317e01c3a57b286fadd6f3ea47fd1d64adebb483943ba0e229307d15763b5%22%7D%7D`
    axios.get(urlProductGroups, {
      headers: {
        "content-type": "application/json"
      }
    }).then(res => {
      const data = res.data.data
      const searchStores = data.searchStores
      const stores = searchStores.stores
      // const cur = searchStores.cursor
      combined_data = combined_data.concat(stores)
      console.log(combined_data.length)
      if (combined_data.length == 300) {
        // console.log(combined_data)
        writeFile(path, JSON.stringify(combined_data), (error) => {
          if (error) {
            console.log('An error has occurred ', error);
            return;
          }
          console.log('Data written successfully to disk');
        });
      }
    }).catch(error => {
      console.log(error);
    });
  })
}
const add =()=>{
  const path = './data/store_prisma.json';
  readFile('file', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj)
  });

}

module.exports = { productGroups, stores, smarket, sale, add }
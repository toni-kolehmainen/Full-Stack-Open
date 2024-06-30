const spawn = require('child_process').spawn;
const type = require('os').type;
const request = require('http');
const dataController = require('../models/restaurant_model')
const mongoose = require('mongoose')
const axios = require('axios');

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
  const urlProductGroups = "https://cfapi.voikukka.fi/graphql?operationName=RemoteStoreSearch&variables=%7B%22query%22%3Anull%2C%22brand%22%3A%22S_MARKET%22%2C%22cursor%22%3Anull%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22e49317e01c3a57b286fadd6f3ea47fd1d64adebb483943ba0e229307d15763b5%22%7D%7D"

  axios.get(urlProductGroups, {
    headers: {
      "content-type": "application/json"
    }
  }).then(res => {
    const data = res.data.data
    // console.log(data)
    const searchStores = data.searchStores
    const stores = searchStores.stores
    console.log(stores)
    // console.log(navigation[navigation.length - 1])
  }).catch(error => {
    console.log(error);
  });
}
module.exports = { productGroups, stores }
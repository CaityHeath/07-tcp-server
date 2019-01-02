'use strict';

const socketPool = require('../lib/socketPool.js');
const events = require('../lib/events.js');

let sayHello = (data, userId) =>{
  console.log('this is hello');
  data.payload = 'hello' + data.payload;
  events.emit('@all', data, userId);
};

events.on('@hello', sayHello);

module.exports = sayHello;
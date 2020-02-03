'use strict';

const fs = require('fs'); // load fs module to this application

fs.readFile('data.json', (err, data) => { 
  if (err) throw err;
  let toDoList = JSON.parse(data);
  console.log(toDoList);
  var source = '{{#each data}}<li>{{this.name}}</li>{{/each}}';
  var template = handlebars.compile(source);
  var outputString = template(data);
  console.log(outputString);
})

console.log('This is after the read call');


/* 
  Note: 
  - readFileSync <- reads file synchronously (blocks the rest of the code from executing until all the data is read from a file)
    
    let rawdata = fs.readFileSync('data.json'); // returns raw data in a Buffer
    let data = JSON.parse(rawdata); // parses raw data to JS Object

  - readFile <- asynchronous
    (err, data) => {} // ES2015 Callback fcn (once file is completely read in OS)
    err // gives err object if somuething goes wrong, else null
*/


// fs.readFile('data.json', (err, data) => { 
//   if (err) throw err;
//   var toDoList = JSON.parse(data);
//   console.log(toDoList);
//   // var source = '{{#each data}}<li>{{this.name}}</li>{{/each}}';
//   // var template = handlebars.compile(source);
//   // var outputString = template(data);
//   // // console.log(outputString);
//   // Mustache.render('{{name}}: {{completed}}', toDoList);
// })

// var dataJson = require('data.json');

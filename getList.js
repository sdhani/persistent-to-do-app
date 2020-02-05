'use strict';
const fs = require('fs'); // load fs module to this application


fs.readFile('data.json', (err, data) => { 
  if (err) throw err;
  let toDoList = JSON.parse(data);
  console.log(toDoList);
})

console.log('This is after the read call');


/* 
  Notes: 
  - readFileSync <- reads file synchronously (blocks the rest of the code from executing until all the data is read from a file)

  - readFile <- asynchronous
    (err, data) => {} // ES2015 Callback fcn (once file is completely read in OS)
    err // gives err object if somuething goes wrong, else null
*/

// var source = '{{#each data}}<li>{{this.name}}</li>{{/each}}';
// var template = handlebars.compile(source);
// var outputString = template(data);
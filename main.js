#!/usr/bin/env node   
//SheBang Syntax to make global
let figlet =  require('figlet'); //Module for console logging
let fs = require("fs");
let path = require("path");
let tree = require('./Commands/tree.js')
let organizer = require('./Commands/organizer.js')
let help = require('./Commands/help.js');



//First is node and second args is file name so we remove it with slice 
//3rd place will contain command name and 4th will be path of file(optinal)
let input = process.argv.slice(2); 
console.log(figlet.textSync('File Organizer Project '));
console.log(figlet.textSync('CR- Himanshu Dewan'));

//valid comands will be tree , organize and help
let command = input[0]; 
let dirrectory_path = input[1]; 

switch(command){
    case "tree":
        tree.tree(dirrectory_path);
        break;
    case "organize":
        organizer.organizer(dirrectory_path);
        break;
    case "help":
        help.help();
        break;
    default:
        console.log("Please 🙏 Input Right command");
        break;
}



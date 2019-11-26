const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
// Require Puppeteer.
//const puppeteer = require("puppeteer");
const questions = [
  {
    type: "input",
    message: "What's your GitHub username?",
    name: "username"
  },
  {
    type: "list",
    message: "Which color do you Perfer?",
    name: "color",
    choices: ["green", "blue", "pink","red"]
  }
]
inquirer
  .prompt(questions)
  .then(function(userInput){ //what's this function about?

  let userName = userInput.username;
  userName = userName.toLowerCase().trim();
  let userColor = userInput.color;

  let data = {
    username: userName,
    color: userColor
  }
    callAxios(data)
  });
  
function callAxios(data){
  const queryURL = `https://api.github.com/users/${data.username}`;
  axios.get(queryURL)
  .then(function(res){
    console.log(res);
    res.data.color = data.color;
    writeToHTML(res.data);  
  });
}

const generateHTML= require("./generateHTML");  

function writeToHTML(res){ 
  let htmlContent = generateHTML(res);
  writeFileAsync(`${res.name}_profile.html`, htmlContent);
  console.log("Successfully wrote to html");
  //generatePDF(`${res.login}_profile.html`,`${res.login}_profile.pdf`);
}

//from https://pspdfkit.com/blog/2019/html-to-pdf-in-javascript/
  //async function generatePDF() {
  // Launch a new browser session.
  //const browser = await puppeteer.launch()
  // Open a new Page.
  //const page = await browser.newPage()
  // Puppeteer’s setContent function, 
  //which takes the HTML that needs to get rendered on the site as an argument
  //await page.setContent(htmlContent);
  // Store the PDF in a file named `invoice.pdf`.
  //await page.pdf({ path: "invoice.pdf", format: 'letter' }, err=>{
     //if (err){
      //console.log(err);
  //    }
  //  });
  //    console.log("Successfully converted html to pdf!");
  //    await browser.close();
  //  }



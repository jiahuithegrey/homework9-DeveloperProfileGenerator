const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
// Require Puppeteer.
const puppeteer = require("puppeteer");
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
let userName;
let userColor;
let htmlContent;

inquirer
  .prompt(questions)
  .then(function(userInput){ //what's this function about
    const queryURL = `https://api.github.com/users/${userName}`;
    userName = userInput.username;
    userName = userName.toLowerCase().trim();
    userColor = userInput.color;
    return queryURL;
  })
  .then(callAxios(queryURL));

function callAxios(url){
  axios.get(url)
  .then(function(res){
    res.data.color = userColor; //why data?
  });
  generateHTML(res.data);  
}

const generatehtml = require("./generateHTML");     
function generateHTML(res){ 
  htmlContent = generateHTML(res);
  writeFileAsync(`${username}_profile.html`, htmlContent);
  console.log("Successfully wrote to html");
  generatePDF(`${username}_profile.html`,`${username}_profile.pdf`);
}

//from https://pspdfkit.com/blog/2019/html-to-pdf-in-javascript/
async function generatePDF() {
  // Launch a new browser session.
  const browser = await puppeteer.launch()
  // Open a new Page.
  const page = await browser.newPage()
  // Puppeteer’s setContent function, 
  //which takes the HTML that needs to get rendered on the site as an argument
  await page.setContent(htmlContent);
  // Store the PDF in a file named `invoice.pdf`.
  await page.pdf({ path: "invoice.pdf", format: 'letter' }, err=>{
    if (err){
      console.log(err);
    }
  });
    console.log("Successfully converted html to pdf!");
    await browser.close();
  }



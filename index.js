const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
// Require Puppeteer.
const puppeteer = require("puppeteer");

function init() {
  try {
    const answer = await promptUser();
    const html = generateHTML(answer);
    generatePDF(html);
  } catch (err) {
    console.log(err);
  }
}

function promptUser(username, userColor) {
  const username= await inquirer.prompt(
    {
      type: "input",
      message: "What's your GitHub username?",
      name: "username"
    });
  username = username.toLowercase().trim();
    //how to give {color} to linked css?
  const userColor = await inquirer.prompt(
    {
      type: "list",
      message: "Which color do you Perfer?",
      name: "color",
      choices: ["green", "blue", "pink","red"]
    });
    callAxios(username);
}

function callAxios({username}){
  axios.get(`https://api.github.com/users/${username}`)
  .then (generateHTML(res));
};

async function generateHTML(res){ //does it need to be async?
  const html = require("./generateHTML");
  res.data.color = userColor;
  htmlContent = generateHTML(res.data);
  writeFileAsync("${username}_profile.html", htmlContent);
  console.log("Successfully wrote to html");
}

//from https://pspdfkit.com/blog/2019/html-to-pdf-in-javascript/
async function generatePDF() {
  // Launch a new browser session.
  const browser = await puppeteer.launch()
  // Open a new Page.
  const page = await browser.newPage()

  // Go to our invoice page that we serve on `localhost:8000`.
  await page.goto('http://localhost:8000')
  // Store the PDF in a file named `invoice.pdf`.
  await page.pdf({ path: "invoice.pdf", format: 'letter' }, function(err){
    if (err){
      console.log(err);
    }esle{
      console.log("Successfully converted html to pdf!");
    }
  });

  await browser.close()
}
    
init();



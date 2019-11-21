const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
// Require Puppeteer.
const puppeteer = require("puppeteer");

function promptUser(username, color) {
  const {username} = await inquirer.prompt(
    {
      type: "input",
      message: "What's your GitHub username?",
      name: "username"
    });
  const {color} = await inquirer.prompt(
    {
      type: "list",
      message: "Which color do you Perfer?",
      name: "color",
      choices: ["green", "blue", "pink","red"]
    });
    callAxios({username});
}

function callAxios({username}){
  const profile = axios.get(`https://api.github.com/users/${username}`)
};

function generateHTML(profile){
  const html = require("./generateHTML");
  return html;
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
      
function init() {
  try {
    const answer = await promptUser();
    const html = generateHTML(answer);
    await writeFileAsync("index.html", html);
    console.log("Successfully wrote to html");
    convertToPdf(html);
  } catch (err) {
    console.log(err);
  }
}

init();



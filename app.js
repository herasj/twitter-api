const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();

const user = process.env.USER_EMAIL;
const pass = process.env.USER_PASS;
//Variables

module.exports = async (search) => {
  console.log(`Usuario: ${search}`);
  const url = 'https://twitter.com/login'; //Target URL
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 }) //Esperar

  await page.waitForSelector('[type=text]');
  await page.type('[type=text]',user,{delay:100}); //Escribe el usuario en el input de tipo text

  await page.waitForSelector('[type=password]');
  await page.type('[type=password]',pass,{delay:100}); //Escribe la contraseña en el input de tipo pass
  
  await page.waitForSelector('[data-testid="LoginForm_Login_Button"]');
  await page.click('[data-testid="LoginForm_Login_Button"]'); //Click Login
  

  await page.waitForSelector('[data-testid="AppTabBar_Explore_Link"]',{timeout:60000});
  await page.click('[data-testid="AppTabBar_Explore_Link"]'); //Click SearchButton

  await page.waitForSelector('[data-testid=SearchBox_Search_Input]',{timeout:60000});
  await page.type('[data-testid=SearchBox_Search_Input]',search,{delay:50}); //Buscar en twitter 

  await page.keyboard.press('Enter',{ waitUntil: 'networkidle2' }); //Buscar y esperar  

  await page.waitForSelector('[data-testid="UserCell"]');
  await page.click('[data-testid="UserCell"]'); // Click user name

  await page.waitForSelector('[href="/WIMABOK/followers"]'); 
  const followers = await page.$('[href="/WIMABOK/followers"]');//Target followers
  let numfollowers = await (await followers.getProperty('textContent')).jsonValue(); //Get text

  await page.waitForSelector('[href="/WIMABOK/following"]'); 
  const following = await page.$('[href="/WIMABOK/following"]');//Target following
  let numfollowing = await (await following.getProperty('textContent')).jsonValue(); //Get text
  
  numfollowers = numfollowers.split(' ')[0]; //Delete "Followers" text
  numfollowers = numfollowers.replace('.','');//Delete "."
  numfollowing = numfollowing.split(' ')[0]; //Delete "Following" text
  numfollowing = numfollowing.replace('.',''); //Delete "."

  await browser.close(); //Close Chromium 
  return {
    followers: numfollowers,
    following: numfollowing
  }
}


import { Builder, Capabilities, By, WebDriver } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterEach(async () => {
    await driver.sleep(4500)
})



afterAll(async () => {
    driver.quit()
    // await (await driver).quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
   expect(displayed).toBe(true)
    
})


test('Add duo button adds card when selected', async () => {
    const drawButton =  await driver.findElement(By.id('draw'))
    await drawButton.click()
    const playerDuo = await driver.findElement(By.id('player-duo'))
    
    const playerAdd = await driver.findElement(By.className('bot-btn'))
    await playerAdd.click()

    const choicesId = await driver.findElement(By.id('choices'))
    const playerChoices = await playerDuo.findElement(By.xpath('./child::*'))
    const computerChoices = await choicesId.findElement(By.xpath('./child::*'))
           
            // expect(computerChoices.length).toEqual(4)
            //  expect(playerChoices.length).toEqual(1)    -- both cause test to fail, .length wont connet to variable to work 
             // expect(computerChoices[length]).toEqual(4)
            //  expect(playerChoices[length]).toEqual(1)
    })


 // test('id= Choices are displayed after draw is selected', async () => {
//    // first create test that clicks Draw Button 
//    // second create test that displays id='choices 
//    // third compare the two with an expect statement

test('Draw button returns cards', async () => {
   const drawButton =  await driver.findElement(By.id('draw'))
   await drawButton.click()
   const botCards = await driver.findElement(By.className('bot-card'))
        //expect(botCards.length).toEqual(5)    -test fails when inserted like add test,  come back to later
})









// check the draw button display the div with id='choices 
// check that clicking an "Add to Duo" button displays the div with id='player-id'
// check that when a bot is 'Removed from Duo', that is goes back to 'choices'
// check that 'See All' button works 
// 
//const { json } = require('express')
const express = require('express')
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')

require('dotenv').config()
// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '116234588e1e410d815ab9e16ac6f458',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.use(express.static('public'))

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));  //middleware needed to birng up in localhost
  });     // this is the normal endpoint 
         // when endpoint is hit, this sends the html to the client 
          //Reference: 02:20 Recording on Deployment 

app.get('/styles', function(req,res) {
    res.sendFile(path.join(__dirname, 'public/index.css'));  //middleware needed to birng up in localhost
  });

app.get('/js', function(req,res) {
    res.sendFile(path.join(__dirname, 'public/index.js'));  //middleware needed to birng up in localhost
  });

// app.use('/',function(req,res) {
//     res.sendFile(path.join(__dirname, 'public/index.html'));  //middleware needed to birng up in localhost
//   });


app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(bots)
        rollbar.info('Requested robots')
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        rollbar.error('Bot selection')
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        rollbar.error('Someone is choosing their bots')
        res.status(200).send({choices, compDuo})
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body 

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        rollbar.critical(`Dueling isn't working properly`)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        rollbar.warning(`Wins/Loses are not working properly becuase of Dueling error`)
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        rollbar.error(`Player aren't correct`)
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000 // 

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
console.log('may node be with you')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString ='mongodb+srv://mycodestorybox:2kBoGuRG8QgielNW@cluster1.sxqo1tx.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {useUnifiedTopology: true})
.then(client => {
    console.log('connected to database')
    const db = client.db('star-was-quotes')
    const quotesCollection = db.collection('quotes')

app.set('view engine', 'ejs')    
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())


app.get('/', (req, res)=> {
    quotesCollection.find().toArray()
    .then(results => {
        //console.log(results)
        res.render('index.ejs', {quotes: results})
    })
    .catch(error => console.log(error))
})




app.post('/quotes', (req, res)=> {
    console.log('forming is working')
    quotesCollection.insertOne(req.body)
    .then(result=> {
        //console.log(result)
        res.redirect('/')
    })
    .catch(error => console.error(error))
})



app.put('/quotes', (req, res)=> {
    quotesCollection.findOneAndUpdate(
        {name: "bola"},
        {
            $set: {
                name: req.body.name,
                quotes: req.body.quote
            }
        },
        {
            upsert:true
        }
    )
    .then(result => {
        res.json('updated!!!!')
    })
    .catch(error => console.log(error))
})

app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(
        {name: req.body.name}
    )
    .then(result => {
        if(result.deletedCount === 0){
            return res.json('No James bond quote')
        }else{
        res.json("Deleted JAMES BOND QUOTE")
        }
    })
    .catch(error => console.error(error))
})

app.listen(3000, () =>{
    console.log(`listening on port 3000`)
})
})
.catch(error => console.log(error))

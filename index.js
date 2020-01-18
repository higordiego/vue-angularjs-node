const express = require('express')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const app = express()

app.use(express.json())
app.use(cors())

const Angularjs = mongoose.model('angularjs', {
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    age: { type: String, required: true },
});


app.post('/', async (req, res) => {
    try {
        let angular = {}
        if (req.body) angular = await Angularjs.create(req.body)
        res.status(201).json(angular)
    } catch (err) {
        res.status(500).json(err.message)
    }
})


app.get('/', async (_, res) => {
    try {
        const result = await Angularjs.find()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

app.get('/:_id', async (_, res) => {
    try {
        const result = await Angularjs.find(req.params)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

app.put('/:_id', async (_, res) => {
    try {
        const result = await Angularjs.update(req.params, req.body)
        res.status(200).json()
    } catch (err) {
        res.status(500).json(err.message)
    }
})

app.delete('/:_id', async (_, res) => {
    try {
        await Angularjs.remove(req.params)
        res.status(200).json()
    } catch (err) {
        res.status(500).json(err.message)
    }
})

app.listen(3000, () => console.log('Flying angularJS... : )'))
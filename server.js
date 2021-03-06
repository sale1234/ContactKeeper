const express = require('express')
const app = express()
const connectDB = require('./config/db')

app.get('/', (req, res) => res.json({ msg: 'Welcome to my app' }))

// Connect DB
connectDB()

// Init middleware
app.use(express.json({ extended: false }))

// Define users
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

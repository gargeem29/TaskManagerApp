const express = require('express');
const cors = require('cors')
const { db } = require('./src/utils/db')

db()
const app = express();

app.use(express.json())
app.use(cors())

const taskRoutes = require('./src/routes/task.routes')
const authRoutes = require('./src/routes/auth.routes')

app.use('/api/v1', taskRoutes)
app.use('/api/v1/auth', authRoutes)

app.listen(8000, () => {
  console.log("Server is running on 8000");
})
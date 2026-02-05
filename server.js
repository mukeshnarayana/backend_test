const express = require('express')
const dotEnv = require('dotenv')
const mongodb = require('./server/DB/db')
const workroute = require('./server/Routes/Workers')
const menurouter = require('./server/Routes/Menu')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')



dotEnv.config()
const app = express()
const PORT = process.env.port
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const swagggerDocument = yaml.load('./api.yaml')

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagggerDocument))
console.log(`swagger running port http://localhost:${PORT}/api-docs`)


app.use('/workers', workroute)
app.use('/menu', menurouter)

app.get("/", (req, res) => {
  res.send("EC2 backend is running");
});



mongodb().then(() => {
    app.listen(PORT,'0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((err) => {
    console.log(err)
})
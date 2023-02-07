const express = require('express')
const app = express()

// Express servindo o front-end
app.use(express.static('./client'))

// Express servindo a API
app.get('/candidato', (request, response) => {
    response.send('candidato works')
})

app.get('/cargo', (request, response) => {
    response.send('cargo works')
})

app.get('/municipio', (request, response) => {
    response.send('municipio works')
})

app.get('/resultadogeral', (request, response) => {
    response.send('resultadogeral works')
})

app.listen(3000, () => {
    console.log('Servidor funcionando na porta 3000')
})
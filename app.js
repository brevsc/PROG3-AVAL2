const express = require('express')
const sqlite = require('./server/database')

const app = express()

// Express servindo o front-end
app.use(express.static('./client'))

// Setando header nas respostas do endpoint
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.header('Access-Control-Max-Age', 3600);
  next();
});

// Express servindo a API
app.get('/candidato', (request, response) => {
  sqlite.database.all("SELECT * FROM candidato", [], (err, rows) => {
    if (err) { throw err; }
    let result = rows.map((row) => {
      return {
        id: row.id, 
        nome: row.nome,
        cargo: row.cargo,
        tipo: row.tipo,
        status: row.status
      }
    })
    const json = JSON.stringify(result)

    response.send(json)
  });
})

app.get('/cargo', (request, response) => {
  sqlite.database.all("SELECT * FROM cargo", [], (err, rows) => {
    if (err) { throw err; }
    let result = rows.map((row) => {
      return {
        id: row.id, 
        nome: row.nome
      }
    })
    const json = JSON.stringify(result)

    response.send(json)
  });
})

app.get('/municipio', (request, response) => {
  sqlite.database.all("SELECT * FROM municipio", [], (err, rows) => {
    if (err) { throw err; }
    let result = rows.map((row) => {
      return {
        id: row.id, 
        nome: row.nome,
        uespi: row.uespi
      }
    })
    const json = JSON.stringify(result)

    response.send(json)
  });
})

app.get('/resultadogeral', (request, response) => {
  sqlite.database.all("SELECT * FROM votacao", [], (err, rows) => {
    if (err) { throw err; }
    let result = rows.map((row) => {
      return {
        municipio: row.municipio, 
        zona: row.zona,
        secao: row.secao,
        urna: row.urna,
        candidato: row.candidato,
        tipo: row.tipo,
        cargo: row.cargo,
        votos: row.votos
      }
    })
    const json = JSON.stringify(result)

    response.send(json)
  });
})

app.listen(3000, () => {
  console.log('Servidor funcionando em http://localhost:3000/')
})
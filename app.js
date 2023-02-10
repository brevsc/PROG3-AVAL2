const express = require('express')
const sqlite = require('./server/database')

const app = express()

// Express servindo o front-end
app.use(express.static('./client'))
app.use(express.json())

// Setando header nas respostas do endpoint
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.header('Access-Control-Max-Age', 3600);
  next();
});

// Express servindo a API
app.post('/candidato', (request, response) => {
  let search = request.body.name

  const sql = `SELECT cand_nome, cand_status, cand_votos, cargo_nome FROM votos_cand_estado WHERE cand_nome LIKE '${search.toUpperCase()}%'`

  sqlite.database.all(sql, [], (err, rows) => {
    if (err) { throw err; }
    let result = rows.map((row) => {
      return {
        nome: row.cand_nome,
        cargo: row.cargo_nome,
        votacao: row.cand_votos,
        status: row.cand_status
      }
    })
    const json = JSON.stringify(result)
    response.send(json)
  });
})

app.post('/cargo', (request, response) => {
  const role = request.body.role

  sqlite.database.all(`SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado WHERE cargo_nome LIKE '${role}%';`, [], (err, rows) => {
    if (err) { throw err; }

    let result = rows.map((row) => {
      return {
        nome: row.cand_nome, 
        cargo: row.cargo_nome,
        votacao: row.cand_votos,
        status: row.cand_status
      }
    })

    const json = JSON.stringify(result)
    response.send(json)
  });
})

app.post('/municipio', (request, response) => {
  const city = request.body.city

  sqlite.database.all(`SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_municipio WHERE muni_nome LIKE '${city.toUpperCase()}%';`, [], (err, rows) => {
    if (err) { throw err; }

    let result = rows.map((row) => {
      return {
        nome: row.cand_nome, 
        cargo: row.cargo_nome,
        votacao: row.cand_votos,
        status: row.cand_status
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
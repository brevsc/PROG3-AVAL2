const input = document.querySelector('.search input');
const cards = document.querySelector('.cards');

/*
    Usando uma função de execução imediata para mostrar todos os resultados
    no primeiro carregamento da página.
*/
(async () => {
    let search = { only_elected: input.checked }
    let data = await postNameCadidante(search)

    cards.innerHTML = ''
    data.map((elem) => {
        cards.insertAdjacentHTML('afterbegin',
            `<div class="card">
                <h3>${elem.nome}</h3>
                <p>cargo: ${elem.cargo}</p>
                <p>status: ${elem.status}</p>
            </div>`);
    })
})();

input.addEventListener('change', async () => {
  let search = { only_elected: input.checked }
  let data = await postNameCadidante(search)

  cards.innerHTML = ''
  data.map((elem) => {
    cards.insertAdjacentHTML('afterbegin', 
    `<div class="card">
      <h3>${elem.nome}</h3>
      <p>cargo: ${elem.cargo}</p>
      <p>status: ${elem.status}</p>
    </div>`);
  })

  if (input.value == '') {
    cards.innerHTML = ''
  }
})

async function postNameCadidante(search) {
  return await fetch('http://localhost:3000/resultadogeral', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(search)
  })
  .then((response) => response.json())
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

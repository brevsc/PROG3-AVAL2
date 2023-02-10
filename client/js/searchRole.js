const select = document.querySelector('.search select')
const cards = document.querySelector('.cards')

select.addEventListener('input', async () => {
  let search = { role: select.value }

  let data = await postRole(search)
  cards.innerHTML = ''

  data.map((elem) => {
    cards.insertAdjacentHTML('afterbegin',
      `<div class="card">
    <h3>${elem.nome}</h3>
    <p>cargo: ${elem.cargo}</p>
    <p>votos: ${elem.votacao}</p>
    <p>status: ${elem.status}</p>
  </div>`);
  })
})

async function postRole(search) {
  return await fetch('http://localhost:3000/cargo', {
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
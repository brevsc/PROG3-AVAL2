const input = document.querySelector('.search input')
const cards = document.querySelector('.cards')

input.addEventListener('input', async () => {
  let search = { role: input.value }
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

  if (input.value == '') { 
    cards.innerHTML = '' 
}
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

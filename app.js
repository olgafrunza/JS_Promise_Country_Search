const inputField = document.getElementById("input");

document.getElementById("search").addEventListener("click", () => {
  const input = inputField.value.trim();
  viewCountry(input);
});

document.getElementById("clear").addEventListener("click", () => {
  const countryContainer = document.getElementById("country-container");
  countryContainer.innerHTML = "";
});

async function viewCountry(countryName) {
  try {
    const resp = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const firstCountry = resp.data[0];
    //console.log(firstCountry);
    generateCard(firstCountry);
  } catch (error) {
    console.log(error);
    const headerContainer = document.getElementById("header-container");

    const divError = document.createElement("div");
    divError.classList = "alert alert-danger alert-container";

    const msg = `${inputField.value.trim()} was not found.`;
    divError.innerText = msg;

    headerContainer.appendChild(divError);
    setTimeout(() => {
      divError.remove();
    }, 3000);
  }
}

function generateCard(country) {
  const flag = country.flags.svg;
  const nameOfficial = country.name.common;
  const region = country.region;
  const capital = country.capital;
  const population = (country.population / 1000000).toFixed(2);
  const lang = country.languages;

  const theCard = document.createElement("div");
  theCard.classList =
    "card country-card col-10 col-sm-6 col-lg-3 p-2 mx-2 my-3";
  theCard.innerHTML = `
            <img src="${flag}" class="card-img-top border border-secondary" alt="Flag">
            <div class="card-body">
                <h5 class="card-title">${nameOfficial}</h5>
                <p class="card-text">${region}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                <span><i class="fas fa-2x fa-landmark"></i>${capital}</span>
                </li>
                <li class="list-group-item">
                <span><i class="fas fa-lg fa-users"></i>
                ${population} M
                </span>
                </li>
                <li class="list-group-item">
                <span><i class="fas fa-lg fa-comments"></i>
                ${Object.values(lang)}
                </span>
                </li>
            </ul>`;

  const countryCont = document.getElementById("country-container");
  countryCont.appendChild(theCard);
  inputField.value = "";
}

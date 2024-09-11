document.addEventListener("DOMContentLoaded", () => {
  const idsAnimesCarregados = new Set();
  const gridAnimesPopulares = document.getElementById("grid-animes-populares");
  const gridAnimesBemAvaliados = document.getElementById(
    "grid-animes-bem-avaliados"
  );
  const gridAnimesRecentes = document.getElementById("grid-animes-recentes");

  function buscarAnimes(url, elementoGrid) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.data.forEach((anime) => {
          if (!idsAnimesCarregados.has(anime.id)) {
            idsAnimesCarregados.add(anime.id);

            const cardAnime = document.createElement("div");
            cardAnime.classList.add("anime-card");

            const imagemAnime =
              anime.attributes.posterImage?.large ||
              "https://via.placeholder.com/300x450?text=Sem+Imagem";
            const tituloAnime =
              anime.attributes.canonicalTitle || "Título indisponível";
            const sinopseAnime = anime.attributes.synopsis
              ? anime.attributes.synopsis.substring(0, 200) + "..."
              : "Sinopse indisponível.";
            const anoAnime = anime.attributes.startDate
              ? new Date(anime.attributes.startDate).getFullYear()
              : "Ano desconhecido";
            const autorAnime =
              anime.attributes?.showType || "Autor desconhecido";

            cardAnime.innerHTML = `
                <img src="${imagemAnime}" alt="${tituloAnime}">
                <h1>${tituloAnime}</h1>
                <div class="anime-info">
                  <p>${sinopseAnime}</p>
                  <div class="ano-anime">
                    <p>Ano: ${anoAnime}</p>
                  </div>
                </div>
              `;

            elementoGrid.appendChild(cardAnime);
          }
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar os animes", error);
      });
  }

  const urlAnimesPopulares =
    "https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=15";
  const urlAnimesBemAvaliados =
    "https://kitsu.io/api/edge/anime?sort=-averageRating&page[limit]=16";
  const urlAnimesRecentes =
    "https://kitsu.io/api/edge/anime?sort=-startDate&page[limit]=15";

  buscarAnimes(urlAnimesPopulares, gridAnimesPopulares);
  buscarAnimes(urlAnimesBemAvaliados, gridAnimesBemAvaliados);
  buscarAnimes(urlAnimesRecentes, gridAnimesRecentes);
});

async function fetchData() {
    try {
        const disneyCharacter = document.getElementById("disneyCharacter").value.toLowerCase();
        const response = await fetch(`https://api.disneyapi.dev/character?name=${disneyCharacter}`);

        if (!response.ok) {
            throw new Error("Não foi possível buscar os dados dos personagens");
        }

        const data = await response.json();
        const filteredCharacters = data.data;

        const charactersContainer = document.getElementById("charactersContainer");
        charactersContainer.innerHTML = "";

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                const characterDiv = document.createElement("div");
                characterDiv.classList.add("character");

                const characterNameElement = document.createElement("h3");
                characterNameElement.textContent = character.name;

                const characterImage = document.createElement("img");
                characterImage.src = character.imageUrl;
                characterImage.alt = character.name;

                const filmsListElement = document.createElement("ul");
                const films = character.films || [];
                if (films.length > 0) {
                    films.map(film => {
                        const filmItemElement = document.createElement("li");
                        filmItemElement.textContent = film;
                        filmsListElement.appendChild(filmItemElement);
                    });
                } else {
                    const noFilmsMessage = document.createElement("p");
                    noFilmsMessage.textContent = "Esse personagem não possui filmes";
                    filmsListElement.appendChild(noFilmsMessage);
                }

                characterDiv.appendChild(characterNameElement);
                characterDiv.appendChild(characterImage);
                characterDiv.appendChild(filmsListElement);
                charactersContainer.appendChild(characterDiv);
            });
        } else {
            charactersContainer.textContent = "Nenhum personagem encontrado com esse nome.";
        }
    } catch (error) {
        console.error(error);
    }
}

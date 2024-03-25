async function fetchData() {
    try {
        const disneyCharacter = document.getElementById("disneyCharacter").value.toLowerCase();
        const response = await fetch(`https://api.disneyapi.dev/character`);

        if (!response.ok) {
            throw new Error("Não foi possível buscar os dados dos personagens");
        }

        const data = await response.json();
        const characters = data.data;

        const filteredCharacters = characters.filter(character => character.name.toLowerCase().startsWith(disneyCharacter));

        const charactersContainer = document.getElementById("charactersContainer");
        charactersContainer.innerHTML = "";

        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(character => {
                // Criar elemento de personagem
                const characterDiv = document.createElement("div");
                characterDiv.classList.add("character");

                // Adicionar nome do personagem
                const characterNameElement = document.createElement("h3");
                characterNameElement.textContent = character.name;

                // Adicionar imagem do personagem
                const characterImage = document.createElement("img");
                characterImage.src = character.imageUrl;
                characterImage.alt = character.name;

                // Adicionar lista de filmes do personagem
                const filmsListElement = document.createElement("ul");
                const films = character.films || [];
                if(films.length > 0){
                    films.forEach(film => {
                    const filmItemElement = document.createElement("li");
                    filmItemElement.textContent = film;
                    filmsListElement.appendChild(filmItemElement);
                });
                } else {
                    const noFilmsMessage = document.createElement("p");
                    noFilmsMessage.textContent = "Esse personagem não possui filmes";
                    filmsListElement.appendChild(noFilmsMessage);
                    
                }

                // Adicionar elementos ao container de personagens
                characterDiv.appendChild(characterNameElement);
                characterDiv.appendChild(characterImage);
                characterDiv.appendChild(filmsListElement);
                charactersContainer.appendChild(characterDiv);
            });
        } else {
            // Nenhum personagem encontrado
            charactersContainer.textContent = "Nenhum personagem encontrado com esse nome.";
        }
    } catch (error) {
        console.error(error);
    }
}

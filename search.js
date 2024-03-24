function searchCharacter() {
    var nomePersonagem = document.getElementById('inputSearch').value;
    var url = 'https://api.disneyapi.dev/character?name=' + encodeURIComponent(nomePersonagem);
    
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    var character = JSON.parse(xhr.responseText);
                    resolve(character);
                } else {
                    reject(xhr.status);
                }
            }
        }
        xhr.send();
    }).then(function(character) {
        var nomePersonagemElement = document.getElementById('nomePersonagem');
        nomePersonagemElement.textContent = "Nome do personagem: " + character.name;

        var tvShowsElement = document.getElementById('tvShows');
        if (character.tvShows && character.tvShows.length > 0) {
            var listaTvShows = document.createElement('ul');
            character.tvShows.forEach(function(tvShow) {
                var itemLista = document.createElement('li');
                itemLista.textContent = tvShow;
                listaTvShows.appendChild(itemLista);
            });
            tvShowsElement.appendChild(listaTvShows);
        } else {
            tvShowsElement.textContent = "Este personagem não aparece em nenhum programa de TV.";
        }
    }).catch(function(status) {
        console.error('Erro ao buscar personagem. Código de status:', status);
    });
}

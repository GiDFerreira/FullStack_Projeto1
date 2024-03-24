fetch('https://api.disneyapi.dev/character')
    .then((res) => {
        console.log(res);
        if (res.ok) {
            console.log('sucesso');
            return res.json(); // Convertendo a resposta para JSON
        } else {
            console.log('erro');
            throw new Error('Erro ao obter dados da API');
        }
    })
    .then((data) => console.log(data)) // Manipulando os dados JSON
    .catch((err) => console.error(err)); // Capturando erros

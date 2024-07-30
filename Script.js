async function fetchPokemon() {
    const pokemonName = document.querySelector(".search-input").value.toLowerCase(); 
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Pokémon não encontrado");

        const data = await response.json();
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        displayPokemon(data, speciesData);
    } catch (error) {
        document.querySelector(".error-message").textContent = error.message;
    }
}

function displayPokemon(pokemonData, speciesData) {
    const pokemonNameElement = document.querySelector(".nome");
		if (pokemonNameElement) {
			pokemonNameElement.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
		} else {
			console.error("Elemento .nome não encontrado");
		}
	const pokemonTypeElement = document.querySelector(".valor-text");
		if (pokemonTypeElement) {
			const types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ');
			pokemonTypeElement.textContent = types.charAt(0).toUpperCase() + types.slice(1);
		} else {
			console.error("Elemento .valor-text não encontrado");
		}
	

	const pokemonheightElement = document.querySelector(".valor-text-9");
		if (pokemonheightElement) {
			pokemonheightElement.textContent = `${pokemonData.height / 10} m`;  
		} else {
			console.error("Elemento .valor-text-9 não encontrado");
		}
	const pokemonweightElement = document.querySelector(".valor-text-10");
		if (pokemonweightElement) {
			pokemonweightElement.textContent = `${pokemonData.weight / 10} kg`;  
		} else {
			console.error("Elemento .valor-text-10 não encontrado");
		}
	
	const pokemonDesc = document.querySelector(".descricao-16");
		if (pokemonDesc) {
			const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
			if (flavorText) {
				const text = flavorText.flavor_text.replace(/\n/g, ' ');
				pokemonDesc.textContent = text;
			} else {
				pokemonDesc.textContent = 'Descrição não disponível';
			}
		} else {
			console.error("Elemento .descricao-16 não encontrado");
		}

	const pokemonSpecies = document.querySelector(".pokemon-semente");
		if (pokemonSpecies) {
			pokemonSpecies.textContent = speciesData.genera.find(genus => genus.language.name === 'en').genus;
		} else {
			console.error("Elemento .pokemon-semente não encontrado");
		}
	
	const pokemonSpriteElement = document.querySelector(".bulbasaur-xy");

		if (pokemonSpriteElement) {
			pokemonSpriteElement.classList.add("hidden");
			pokemonSpriteElement.src = pokemonData.sprites.front_default;
			pokemonSpriteElement.onload = () => {
				pokemonSpriteElement.classList.remove("hidden");
			};
		} else {
			console.error("Elemento .bulbasaur-xy não encontrado");
		}
	const pokemonSpriteElement2 = document.querySelector(".bulbasaur");

		if (pokemonSpriteElement2) {
			pokemonSpriteElement2.classList.add("hidden");
			pokemonSpriteElement2.src = pokemonData.sprites.front_default;
			pokemonSpriteElement2.onload = () => {
				pokemonSpriteElement2.classList.remove("hidden");
			};
		} else {
			console.error("Elemento .bulbasaur não encontrado");
		}

	
    document.querySelector(".text-3").textContent = pokemonData.id.toString().padStart(4, '0');
    
	
	
   
}

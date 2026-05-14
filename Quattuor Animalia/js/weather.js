let animalDataCache = null;
let weatherApiAvailable = true;

function isPlainLocalStaticServer() {
	const localHosts = ["localhost", "127.0.0.1", "::1"];
	return localHosts.includes(window.location.hostname) &&
		["8000", "8080"].includes(window.location.port);
}

async function getAnimalData() {
	if (!animalDataCache) {
		const response = await fetch("animaldata.json");
		if (!response.ok) {
			throw new Error(`Animal data request failed: ${response.status}`);
		}
		animalDataCache = await response.json();
	}

	return animalDataCache;
}

async function getWeatherForCity(city) {
	if (!weatherApiAvailable || isPlainLocalStaticServer()) {
		return null;
	}

	try {
		const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
		if (!response.ok) {
			if (response.status === 404 || response.status === 500) {
				weatherApiAvailable = false;
			}
			return null;
		}
		const data = await response.json();
		return typeof data.temperature === "number" ? data.temperature : null;
	} catch (error) {
		weatherApiAvailable = false;
		return null;
	}
}

async function updateWeather() {
	const cards = document.querySelectorAll(".card-content");
	let animalData = [];

	try {
		animalData = await getAnimalData();
	} catch (error) {
		return;
	}

	for (const card of cards) {
		const cardNumber = card.querySelector(".card-number").textContent;
		const group = cardNumber.charAt(0);
		const number = parseInt(cardNumber.slice(1), 10);

		const animal = animalData.find(
			(a) => a.group === group && a.group_number === number
		);

		if (animal && animal.habitat_city) {
			const temperature = await getWeatherForCity(animal.habitat_city);
			if (temperature !== null) {
				const tempElement = card.querySelector(".temperature-text");
				if (tempElement) {
					tempElement.textContent = `${temperature}°`;
				}
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", updateWeather);
document.addEventListener("cardsRemixed", updateWeather);

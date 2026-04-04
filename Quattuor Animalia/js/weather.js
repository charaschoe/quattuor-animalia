async function getWeatherForCity(city) {
	try {
		const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data.temperature;
	} catch (error) {
		console.error("Error fetching weather data:", error);
		return null;
	}
}

async function updateWeather() {
	const cards = document.querySelectorAll(".card-content");

	for (const card of cards) {
		const cardNumber = card.querySelector(".card-number").textContent;
		const group = cardNumber.charAt(0);
		const number = parseInt(cardNumber.slice(1), 10);

		const response = await fetch("animaldata.json");
		const animalData = await response.json();

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

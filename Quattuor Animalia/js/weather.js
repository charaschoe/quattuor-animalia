const API_KEY = "26e0919c6ab119e9ed768eaca9f9349d";

async function getWeatherForCity(city) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		console.log("Weather data for", city, ":", data);
		return Math.round(data.main.temp);
	} catch (error) {
		console.error("Error fetching weather data:", error);
		return null;
	}
}

async function updateWeather() {
	// Alle Karten auf der Seite finden
	const cards = document.querySelectorAll(".card-content");

	// Fetch animal data einmal für alle Karten
	const response = await fetch("animaldata.json");
	const animalData = await response.json();

	// Für jede Karte
	cards.forEach(async (card) => {
		const cardNumber = card.querySelector(".card-number").textContent;
		console.log("Processing card:", cardNumber);

		// Finden Sie das entsprechende Tier basierend auf der Gruppe und Nummer
		const animal = animalData.find((a) => {
			const group = cardNumber.charAt(0); // "F" aus "F2"
			const number = parseInt(cardNumber.slice(1)); // "2" aus "F2"
			return a.group === group && a.group_number === number;
		});

		if (animal && animal.habitat_city) {
			console.log(
				"Found animal:",
				animal.name_german,
				"city:",
				animal.habitat_city
			);
			const temperature = await getWeatherForCity(animal.habitat_city);
			if (temperature !== null) {
				const tempElement = card.querySelector(".temperature-text");
				if (tempElement) {
					tempElement.textContent = `${temperature}°`;
				}
			}
		}
	});
}

// Update beim Laden der Seite
document.addEventListener("DOMContentLoaded", updateWeather);

// Update nach dem Remix
document.addEventListener("cardsRemixed", updateWeather);

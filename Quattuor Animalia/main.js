$(document).ready(() => {
	const cardContainer = $("#card-container");
	const apiKey = "REDACTED FOR GITHUB"; // Ihr API-Schlüssel

	$.getJSON(".vscode/animaldata.json", (animals) => {
		function loadCard() {
			return $.get("card.html");
		}

		function shuffle(array) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			return array;
		}

		function fetchWeatherData(city) {
			return $.getJSON(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
			);
		}

		function generateCards(sorted = false) {
			cardContainer.empty();
			const animalData = sorted
				? animals.slice()
				: shuffle(animals.slice());
			Promise.all(Array.from({ length: 32 }, loadCard))
				.then((cards) => {
					cards.forEach((cardHTML, index) => {
						const card = $("<div>").html(cardHTML).addClass("card");

						const data = animalData[index];
						if (data) {
							card.find(".card-number").text(`F${data.id}`);
							card.find(".card-title").text(data.name_german);
							card.find(".card-image").attr(
								"src",
								`images/animal images/${data.image}`
							);
							card.find(".card-image").attr(
								"alt",
								data.name_german
							);
							card.find(".card-trivia").text(data.trivia_german);

							const stats = card.find(".stat-content");
							stats.eq(0).text(`${data.max_weight} kg`);
							stats.eq(1).text(`${data.max_length} cm`);
							stats.eq(2).text(`${data.max_age} Jahre`);
							stats.eq(3).text(`${data.top_speed} km/h`);
							stats.eq(4).text(`${data.litter_size}`);
							stats.eq(5).text(`${data.deaths}`);

							// Wetterdaten abrufen und anzeigen
							const city = data.city; // Stadtname aus den Daten
							fetchWeatherData(city).then((weatherData) => {
								const weather =
									weatherData.weather[0].description;
								const temp = weatherData.main.temp;
								const weatherInfo = `${weather}, ${temp}°C`;
								card.find(".card-weather").text(weatherInfo);
							});
						}

						cardContainer.append(card);
					});
				})
				.catch((error) => {
					console.error("Fehler beim Laden der Karten:", error);
				});
		}
		generateCards(true);

		$("#home-link").click((e) => {
			e.preventDefault();
			generateCards(false);
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		});

		$("#group-toggle").click((e) => {
			e.preventDefault();
			generateCards(true);
		});
	});
});

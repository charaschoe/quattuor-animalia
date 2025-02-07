$(document).ready(() => {
	const cardContainer = $("#card-container");

	$.getJSON("animaldata.json", (data) => {
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
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CONFIG.WEATHER_API_KEY}&units=metric`
			);
		}

		function generateCards(sorted = false) {
			cardContainer.empty();
			const animalData = sorted ? data.slice() : shuffle(data.slice());
			
			animalData.forEach(data => {
				const cardWrapper = $('<div>').addClass('card-wrapper');
				const cardContent = $('<div>').addClass('card-content');
				
				// Basis-Informationen
				cardContent.append($('<div>')
					.addClass('card-number border-bottom')
					.addClass(`group-${data.group.toLowerCase()}`)
					.text(`${data.group}${data.group_number}`));
				cardContent.append($('<div>').addClass('card-title border-bottom').text(data.name_german));
				
				// Bild
				const img = $('<img>')
					.addClass('card-image')
					.attr('src', `images/animal images/${data.group.toLowerCase()}${data.group_number}.jpg`)
					.attr('alt', data.name_german);
				cardContent.append(img);
				
				// Trivia
				cardContent.append($('<div>').addClass('card-trivia border-bottom').text(data.trivia_german));
				
				// Stats Box
				const statBox = $('<div>').addClass('stat-box');
				
				// Stats Paare
				const statData = [
					{ icon: 'weight.png', value: data.max_weight },
					{ icon: 'length.png', value: data.max_length },
					{ icon: 'age.png', value: data.max_age },
					{ icon: 'speed.png', value: data.top_speed },
					{ icon: 'offspring.png', value: data.litter_size },
					{ icon: 'death.png', value: data.deaths }
				];
				
				statData.forEach(stat => {
					const statPair = $('<div>').addClass('stat-pair');
					const statIcon = $('<div>').addClass('stat-icon')
						.append($('<img>')
							.attr('src', `images/icons/${stat.icon}`)
							.attr('alt', stat.icon.replace('.png', '')));
					const statContent = $('<div>').addClass('stat-content').text(stat.value);
					
					statPair.append(statIcon, statContent);
					statBox.append(statPair);
				});
				
				cardContent.append(statBox);
				cardWrapper.append(cardContent);
				cardContainer.append(cardWrapper);
			});
		}

		// Event Handlers
		$("#home-link").click((e) => {
			e.preventDefault();
			generateCards(false);
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 }
			});
		});

		$("#group-toggle").click((e) => {
			e.preventDefault();
			generateCards(true);
		});

		// Initial card generation
		generateCards(true);
	});
});

function createCard(animal) {
	return `
		<div class="card">
			<h2>${animal.name}</h2>
			<div class="card-content">
				<p>Gruppe: ${animal.group}</p>
				<p>Geschwindigkeit: ${animal.speed} km/h</p>
				<p>Gewicht: ${animal.weight} kg</p>
				<p>Höhe: ${animal.height} cm</p>
				<p>Lebenserwartung: ${animal.lifespan} Jahre</p>
			</div>
		</div>
	`;
}

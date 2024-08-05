//random user
document.getElementById('fetchUser-button').addEventListener('click', fetchUserData);

async function fetchUserData() {
	renderUserLoading();
	try {
		const responseUser = await fetch('https://randomuser.me/api/');
		if (!responseUser.ok) throw new Error('Oops, error');
		const dataUser = await responseUser.json();
		renderUserData(dataUser);
	} catch (error) {
		renderError();
	}
}

function renderUserLoading() {
	const container = document.querySelector('.dataUser-container');
	container.innerHTML = '<p class="loading">Loading...</p>';
}

function renderUserData(dataUser) {
	const containerUser = document.querySelector('.dataUser-container');
	containerUser.innerHTML = '';

	if (!containerUser) {
		console.error('No se encontró el contenedor');
		return;
	}

	const div = document.createElement('div');
	div.className = 'user';
	div.innerHTML = `<p class="user">${dataUser?.results[0]?.name?.first} ${dataUser?.results[0]?.name?.last}</p>`;
	containerUser.appendChild(div);
}

// random cat fact
document.getElementById('fetchUser-button').addEventListener('click', fetchCatData);

async function fetchCatData() {
	renderCatLoading();
	try {
		const responseCat = await fetch('https://catfact.ninja/fact');
		if (!responseCat.ok) throw new Error('Oops, error');
		const dataCat = await responseCat.json();
		renderCatData(dataCat);
	} catch (error) {
		renderError();
	}
}

function renderCatLoading() {
	const containerCat = document.querySelector('.dataCat-container');
	containerCat.innerHTML = '<p class="loading">Loading...</p>';
}

function renderCatData(dataCat) {
	console.log(dataCat);
	const containerCatApi = document.querySelector('.dataCat-container');
	containerCatApi.innerHTML = '';

	if (!containerCatApi) {
		console.error('No se encontró el contenedor');
		return;
	}

	const subtitle = document.createElement('p');
	subtitle.innerHTML = `<h3 class="subtitle">My fav cat fact</h3>`;
	containerCatApi.appendChild(subtitle);

	const div = document.createElement('div');
	div.className = 'cat';
	div.innerHTML = `<p class="cat">${dataCat?.fact}</p>`;
	containerCatApi.appendChild(div);
}

// anime
document.getElementById('buttonSearch').addEventListener('click', fetchData);
document.getElementById('buttonClear').addEventListener('click', clearInputs);

async function fetchData(limit, query, type) {
	renderLoading();
	limit = parseInt(document.getElementById('LimitInput').value) || 10;
	query = document.getElementById('SearchInput').value.toLowerCase() || '';
	type = document.querySelector('.dropdown .active').innerText || 'tv';

	try {
		const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&type=${type}&limit=${limit}`);
		if (!response.ok) throw new Error('Oops, error');
		const data = await response.json();
		renderData(data);
	} catch (error) {
		renderError();
	}
}

function renderLoading() {
	const container = document.getElementById('data-container');
	container.innerHTML = '<p class="loading">Loading...</p>';
}

function renderError() {
	const container = document.getElementById('data-container');
	container.innerHTML = '<p>Oops, error...</p>';
}

function renderData({ data }) {
	const container = document.getElementById('data-container');
	container.innerHTML = '';

	data.forEach((anime) => {
		const div = document.createElement('div');
		div.className = 'item';

		const title = document.createElement('h1');
		title.innerText = anime.titles[0].title;
		div.appendChild(title);

		const type = document.createElement('h3');
		type.innerText = anime.type;
		div.appendChild(type);

		const image = document.createElement('img');
		image.src = anime.images.jpg.image_url;
		div.appendChild(image);

		container.appendChild(div);
	});
}

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach((dropdown) => {
	const select = dropdown.querySelector('.select');
	const caret = dropdown.querySelector('.caret');
	const menu = dropdown.querySelector('.menu');
	const options = dropdown.querySelectorAll('.menu li');
	const selected = dropdown.querySelector('.selected');

	select.addEventListener('click', () => {
		select.classList.toggle('select-clicked');
		caret.classList.toggle('caret-rotate');
		menu.classList.toggle('menu-open');
	});

	options.forEach((option) => {
		option.addEventListener('click', () => {
			selected.innerText = option.innerText;
			select.classList.remove('select-clicked');
			caret.classList.remove('caret-rotate');
			menu.classList.remove('menu-open');

			options.forEach((option) => {
				option.classList.remove('active');
			});

			option.classList.add('active');
		});
	});
});

function clearInputs() {
	document.getElementById('LimitInput').value = '';
	document.getElementById('SearchInput').value = '';
	document.querySelector('.dropdown .active').value = 'tv';
	console.log('Inputs cleared');
}

const cats = [
    {
        name: 'Luna',
        age: '2 años',
        breed: 'Siamés',
        description: 'Aventurera, ama las ventanas soleadas y las cajas pequeñas.',
        image: 'https://images.clarin.com/2021/02/23/pixel-el-gato-acusado-de___8F86pdZ_O_1200x630__1.jpg'
    },
    {
        name: 'Milo',
        age: '1 año',
        breed: 'Mestizo',
        description: 'Curioso y juguetón, siempre listo para un ratón de juguete.',
        image: 'https://i.pinimg.com/236x/05/bf/7d/05bf7d0f98e82fdf64c239e1fbcdfa9c.jpg'
    },
    {
        name: 'Nube',
        age: '3 años',
        breed: 'Persa',
        description: 'Silenciosa y elegante, le encanta dormir en tu regazo.',
        image: 'https://png.pngtree.com/thumb_back/fh260/background/20230527/pngtree-very-angry-pet-persian-cat-staring-at-the-camera-image_2695023.jpg'
    },
    {
        name: 'Sushi',
        age: '1.5 años',
        breed: 'Bengalí',
        description: 'Enérgico y sociable, ideal para quienes quieren un compañero dinámico.',
        image: 'https://thumbs.dreamstime.com/b/gatito-enojado-de-bengala-en-estudio-129614351.jpg'
    },
    {
        name: 'Misu',
        age: '4 años',
        breed: 'British Shorthair',
        description: 'Calmado y dulce, le encanta tomar siestas largas y recibir mimos.',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/000/837/927/small_2x/angry-cat.jpg'
    }
];

const cardStack = document.getElementById('cardStack');
const matchInfo = document.getElementById('matchInfo');
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const superLikeBtn = document.getElementById('superLikeBtn');

function createCard(cat) {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.name = cat.name;
    card.innerHTML = `
        <img class="card__foto" src="${cat.image}" alt="Foto de ${cat.name}">
        <div class="card__texto">
            <h3>${cat.name}</h3>
            <p>${cat.description}</p>
        </div>
        <div class="card__meta">
            <span>${cat.age}</span>
            <span>${cat.breed}</span>
        </div>
    `;
    return card;
}

function renderCards() {
    cardStack.innerHTML = '';
    const cards = cats.slice().reverse();
    cards.forEach((cat) => cardStack.appendChild(createCard(cat)));
    updateMatchInfo('Usa los botones o las flechas del teclado para comenzar.');
}

function updateMatchInfo(message) {
    matchInfo.textContent = message;
}

function handleChoice(type) {
    const card = cardStack.querySelector('.card:last-child');
    if (!card) {
        updateMatchInfo('No quedan gatitos. Recarga la página para ver más.');
        return;
    }

    const name = card.dataset.name;
    card.classList.add('card--removed');

    if (type === 'like') {
        card.style.transform = 'translateX(120%) rotate(18deg)';
        updateMatchInfo(`¡Te gusta ${name}! Sigue descubriendo más gatitos.`);
    } else if (type === 'dislike') {
        card.style.transform = 'translateX(-120%) rotate(-18deg)';
        updateMatchInfo(`${name} no pasó a favoritos. Prueba con el siguiente.`);
    } else {
        card.style.transform = 'translateY(-140%) rotate(-10deg)';
        updateMatchInfo(`¡Super Match con ${name}!`);
    }

    setTimeout(() => {
        card.remove();
        if (!cardStack.querySelector('.card')) {
            updateMatchInfo('No hay más gatitos por ahora. Recarga la página para ver más.');
        }
    }, 250);
}

likeBtn.addEventListener('click', () => handleChoice('like'));
dislikeBtn.addEventListener('click', () => handleChoice('dislike'));
superLikeBtn.addEventListener('click', () => handleChoice('superlike'));

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        handleChoice('like');
    } else if (event.key === 'ArrowLeft') {
        handleChoice('dislike');
    } else if (event.key === 'ArrowUp') {
        handleChoice('superlike');
    }
});

renderCards();

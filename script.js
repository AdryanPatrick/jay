// Data de início
const startDate = new Date('2025-04-02T21:00:00');

// Obtém a div 'years' e seu parent uma vez
const yearsDiv = document.getElementById('years');
const counterDiv = yearsDiv.parentNode;

// Cria o elemento 'monthsDiv' uma vez
const monthsDiv = document.createElement('div');
monthsDiv.classList.add('time');
monthsDiv.id = 'months';

// Insere o 'monthsDiv' após o 'yearsDiv' uma vez
counterDiv.insertBefore(monthsDiv, yearsDiv.nextSibling);

// Carrega a imagem do coração
const heartImage = new Image();
heartImage.src = 'images/coracao.png'; // Substitua 'heart.png' pelo nome do seu arquivo de imagem

// Música de fundo com botão de play
const music = document.getElementById('background-music');
const playButton = document.getElementById('play-button');
let isPlaying = false;

// NÃO tocar a música automaticamente! Somente depois do clique.
playButton.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        isPlaying = false;
        playButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#fff">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14zm10-8l-6 4V7l6 4z"/>
            </svg>
        `;
    } else {
        music.play()
            .then(() => {
                isPlaying = true;
                playButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#fff">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                `;
            })
            .catch(error => {
                console.error('Erro ao tentar tocar a música:', error);
            });
    }
});


playButton.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        isPlaying = false;
        playButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#fff">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14zm10-8l-6 4V7l6 4z"/>
            </svg>
        `;
    } else {
        music.play()
            .then(() => {
                isPlaying = true;
                playButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#fff">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                `;
            })
            .catch(error => {
                console.error('Erro ao tentar tocar a música:', error);
            });
    }
});

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const years = Math.floor(totalDays / 365.25);
    const remainingDaysAfterYears = totalDays % 365.25;
    const months = Math.floor(remainingDaysAfterYears / 30.44); // Média de dias em um mês
    const days = Math.floor(remainingDaysAfterYears % 30.44);
    const hours = Math.floor(totalHours % 24);
    const minutes = Math.floor(totalMinutes % 60);
    const seconds = Math.floor(totalSeconds % 60);

    yearsDiv.innerHTML = `<span>${years >= 0 ? years : 0}</span><small>anos</small>`;
    document.getElementById('days').innerHTML = `<span>${days >= 0 ? days : 0}</span><small>Dias</small>`;
    document.getElementById('hours').innerHTML = `<span>${hours >= 0 ? hours : 0}</span><small>Horas</small>`;
    document.getElementById('minutes').innerHTML = `<span>${minutes >= 0 ? minutes : 0}</span><small>Minutos</small>`;
    document.getElementById('seconds').innerHTML = `<span>${seconds >= 0 ? seconds : 0}</span><small>Segundos</small>`;

    // Apenas atualiza o conteúdo do 'monthsDiv'
    monthsDiv.innerHTML = `<span>${months >= 0 ? months : 0}</span><small>Mêses</small>`;
}

setInterval(updateCounter, 1000);
updateCounter();

// Corações caindo
const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');

let hearts = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function Heart() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 15 + 5; // Ajustei o tamanho base
    this.speedY = Math.random() * 1 + 0.5;
    this.scale = Math.random() * 0.05 + 0.05; // Ajustei a escala para a imagem
    this.rotation = Math.random() * Math.PI * 2;
}

function handleHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        heart.y += heart.speedY;
        ctx.save();
        ctx.translate(heart.x, heart.y);
        ctx.scale(heart.scale, heart.scale);
        ctx.rotate(heart.rotation);

        // Desenha a imagem do coração.
        // O -heartImage.width / 2 e -heartImage.height / 2 centralizam a imagem na posição x, y.
        ctx.drawImage(heartImage, -heartImage.width / 2, -heartImage.height / 2);

        ctx.restore();

        if (heart.y > canvas.height) {
            hearts.splice(index, 1);
            hearts.push(new Heart());
        }
    });
}

function animate() {
    handleHearts();
    requestAnimationFrame(animate);
}

for (let i = 0; i < 50; i++) {
    hearts.push(new Heart());
}
animate();

// Carrossel
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Trocar automaticamente a cada 5 segundos
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// QR Code
const qrCodeContainer = document.getElementById('qrcode');
const urlAtual = window.location.href;
QRCode.toCanvas(qrCodeContainer, urlAtual, { width: 150 }, function (error) {
    if (error) console.error(error);
});
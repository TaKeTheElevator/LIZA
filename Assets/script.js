const word = "♥LIZA♥"; // Замените на слово, которое хотите использовать
const heartSymbol = "❤️"; // Символ сердечка
let index = 0;
let isWordVisible = true;

const circle = document.querySelector('.circle');
let brightness = 0.5; // Начальная яркость круга
const wordsContainer = document.querySelector('.words-container');
const words = document.querySelectorAll('.word-block');

function updateTitle() {
    const titleElement = document.getElementById("site-title");
    const length = word.length;

    let newTitle = "";
    for (let i = 0; i < length; i++) {
        if (isWordVisible && i < index) {
            newTitle += word[i];
        } else {
            newTitle += heartSymbol; // Используем один и тот же символ сердечка
        }
    }

    titleElement.innerText = newTitle;

    if (isWordVisible) {
        if (index < length) {
            index++; // Увеличиваем индекс, чтобы заменить следующую букву
        } else {
            isWordVisible = false; // Скрываем слово
            index = length; // Устанавливаем индекс на длину слова для стирания
        }
    } else {
        if (index > 0) {
            index--; // Уменьшаем индекс, чтобы стереть букву
        } else {
            isWordVisible = true; // Показываем слово снова
            index = 0; // Сбрасываем индекс для следующего цикла
        }
    }
}

setInterval(updateTitle, 1000); // Обновление каждую секунду
// Получаем все элементы с классом .word-block
const wordBlocks = document.querySelectorAll('.word-block');

// Функция для проверки, когда блок появляется или исчезает в области видимости
function checkVisibility() {
    wordBlocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Если верхняя часть блока находится в пределах окна браузера (и ниже его верхней границы)
        if (rect.top <= windowHeight - 100 && rect.bottom >= 0) {
            // Добавляем класс для анимации появления
            block.classList.add('visible');
        } else {
            // Убираем класс для скрытия элемента, когда он выходит из области видимости
            block.classList.remove('visible');
        }
    });
}

// Добавляем событие прокрутки, чтобы проверять видимость при прокрутке
window.addEventListener('scroll', checkVisibility);

// Анимация появления сердца и текста
document.addEventListener("scroll", function () {
    let heartSection = document.querySelector(".heart-section");
    let heart = document.querySelector(".heart");
    let loveText = document.querySelector(".love-text");
    let footerText = document.querySelector(".footer-text");

    let sectionPosition = heartSection.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 1.2;

    if (sectionPosition < screenPosition) {
        heartSection.classList.add("visible");
        heart.classList.add("visible");
        loveText.classList.add("visible");
        footerText.classList.add("visible");
        startTypingEffect();
    }
});

// Печатающийся текст
const lovePhrases = [
    "Я ЛЮБЛЮ ТЕБЯ ♥️",
    "I LOVE YOU ♥️",
    "JE T'AIME ♥️",
    "TE AMO ♥️",
    "ICH LIEBE DICH ♥️",
    "TI AMO ♥️",
    "我爱你 ♥️",
    "愛してる ♥️",
    "사랑해 ♥️",
    "EU TE AMO ♥️"
];

let loveText = document.querySelector(".love-text");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function startTypingEffect() {
    let currentPhrase = lovePhrases[phraseIndex];

    if (isDeleting) {
        loveText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        loveText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => (isDeleting = true), 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % lovePhrases.length;
    }

    let speed = isDeleting ? 50 : 150;
    setTimeout(startTypingEffect, speed);
}







document.addEventListener("DOMContentLoaded", function () {
    const folderPath = "Assets/collage/"; // Путь к папке с фото
    const gridWidth = 3; // 3 в ширину
    const gridHeight = 4; // 4 в высоту
    const gridSize = gridWidth * gridHeight; // 12 фото в сетке
    const container = document.querySelector(".heart-background");

    let images = [
        "photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg",
        "photo5.jpg", "photo6.jpg", "photo7.jpg", "photo8.jpg",
        "photo9.jpg", "photo10.jpg", "photo11.jpg", "photo12.jpg",
        "photo13.jpg", "photo14.jpg", "photo15.jpg", "photo16.jpg",
        "photo17.jpg", "photo18.jpg", "photo19.jpg", "photo20.jpg"
    ];

    images = images.map(img => folderPath + img);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function isValidPlacement(grid, row, col, img) {
        const index = row * gridWidth + col;

        if (col > 0 && grid[index - 1] === img) return false; // Левый сосед
        if (row > 0 && grid[index - gridWidth] === img) return false; // Верхний сосед
        return true;
    }

    function createGrid() {
        shuffleArray(images);
        let grid = new Array(gridSize).fill(null);
        let availableImages = [...images];

        container.innerHTML = '';

        for (let row = 0; row < gridHeight; row++) {
            for (let col = 0; col < gridWidth; col++) {
                let img = null;
                let attempts = 0;

                do {
                    img = availableImages[Math.floor(Math.random() * availableImages.length)];
                    attempts++;
                } while (!isValidPlacement(grid, row, col, img) && attempts < 10);

                grid[row * gridWidth + col] = img;
                availableImages = availableImages.filter(i => i !== img); // Убираем использованное фото

                const cell = document.createElement("div");
                cell.style.backgroundImage = `url('${img}')`;
                container.appendChild(cell);
            }
        }
    }

    function changeRandomImage() {
        shuffleArray(images);
        const cells = document.querySelectorAll(".heart-background div");
        let randomIndex;
        let newImage;
        let attempts = 0;

        do {
            randomIndex = Math.floor(Math.random() * cells.length);
            newImage = images[Math.floor(Math.random() * images.length)];
            attempts++;
        } while (
            [...cells].some(cell => cell.style.backgroundImage.includes(newImage)) && attempts < 10
        );

        cells[randomIndex].style.opacity = "0";

        setTimeout(() => {
            cells[randomIndex].style.backgroundImage = `url('${newImage}')`;
            cells[randomIndex].style.opacity = "1";
        }, 500);
    }

    createGrid();
    setInterval(changeRandomImage, 1000);
});



document.addEventListener("DOMContentLoaded", function () {
    const heartContainer = document.createElement("div");
    heartContainer.classList.add("floating-hearts-container");
    document.body.appendChild(heartContainer);

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");
        heart.innerHTML = "❤️"; // Можно заменить на 💖, 💘, 💞

        // Случайное положение по горизонтали
        heart.style.left = Math.random() * 100 + "vw";

        // Случайный размер сердечка
        let size = Math.random() * 20 + 10; // 10px - 30px
        heart.style.fontSize = size + "px";

        // Случайная продолжительность анимации
        let duration = Math.random() * 3 + 2; // 2 - 5 секунд
        heart.style.animationDuration = duration + "s";

        // Добавляем в контейнер
        heartContainer.appendChild(heart);

        // Удаляем после завершения анимации
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Создаем сердечки каждую секунду
    setInterval(createHeart, 500);
});
document.addEventListener("DOMContentLoaded", () => {
    const musicBtn = document.getElementById("play-music");
    const bgMusic = document.getElementById("bg-music");

    // Функция обновления кнопки
    function updateMusicButton() {
        if (!bgMusic.paused) {
            musicBtn.classList.add("playing");
        } else {
            musicBtn.classList.remove("playing");
        }
    }

    // Проверяем состояние при загрузке страницы
    updateMusicButton();

    // При клике на кнопку включаем/выключаем музыку
    musicBtn.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
        } else {
            bgMusic.pause();
        }
        updateMusicButton();
    });

    // Если музыка началась/остановилась без нажатия кнопки (например, автозапуск)
    bgMusic.addEventListener("play", updateMusicButton);
    bgMusic.addEventListener("pause", updateMusicButton);
});


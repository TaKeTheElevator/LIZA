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

// Выполняем проверку видимости сразу, чтобы элементы появлялись, если они уже видимы
checkVisibility();
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

// Массив фраз "Я люблю тебя" на 10 языках
const lovePhrases = [
    "Я ЛЮБЛЮ ТЕБЯ ♥️",  // Русский
    "I LOVE YOU ♥️",     // Английский
    "JE T'AIME ♥️",      // Французский
    "TE AMO ♥️",        // Испанский
    "ICH LIEBE DICH ♥️", // Немецкий
    "TI AMO ♥️",        // Итальянский
    "我爱你 ♥️",         // Китайский
    "愛してる ♥️",       // Японский
    "사랑해 ♥️",        // Корейский
    "EU TE AMO ♥️"      // Португальский
];

let loveText = document.querySelector(".love-text");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Функция печати текста с эффектом "ручного письма"
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
        setTimeout(() => (isDeleting = true), 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % lovePhrases.length;
    }

    let speed = isDeleting ? 50 : 100; // Скорость печати/стирания
    setTimeout(startTypingEffect, speed);
}









document.addEventListener("DOMContentLoaded", async function () {
    const folderPath = "Assets/collage/";  // Укажи путь к папке с фото
    const gridSize = 5 * 5; // 5x5 сетка
    const container = document.querySelector(".heart-background");

    // Функция для получения списка изображений из папки (зависит от сервера)
    async function fetchImages() {
        let images = [];
        try {
            // Заглушка (если нельзя получить список файлов автоматически)
            images = [
                "photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg",
                "photo6.jpg", "photo7.jpg", "photo8.jpg", "photo9.jpg", "photo10.jpg",
                "photo11.jpg", "photo12.jpg", "photo13.jpg", "photo14.jpg", "photo15.jpg",
                "photo16.jpg", "photo17.jpg", "photo18.jpg", "photo19.jpg", "photo20.jpg",
                "photo21.jpg", "photo22.jpg", "photo23.jpg", "photo24.jpg", "photo25.jpg"
            ];
        } catch (error) {
            console.error("Ошибка загрузки фото:", error);
        }
        return images.map(img => folderPath + img);
    }

    // Функция создания сетки
    async function createGrid() {
        const images = await fetchImages();
        if (images.length === 0) return;

        for (let i = 0; i < gridSize; i++) {
            const cell = document.createElement("div");
            const randomImage = images[Math.floor(Math.random() * images.length)];
            cell.style.backgroundImage = `url('${randomImage}')`;
            container.appendChild(cell);
        }
    }

    // Функция случайной смены фото в сетке
    async function changeRandomImage() {
        const images = await fetchImages();
        if (images.length === 0) return;

        const cells = document.querySelectorAll(".heart-background div");
        const randomCell = cells[Math.floor(Math.random() * cells.length)];
        const newImage = images[Math.floor(Math.random() * images.length)];

        randomCell.style.opacity = 0;
        setTimeout(() => {
            randomCell.style.backgroundImage = `url('${newImage}')`;
            randomCell.style.opacity = 1;
        }, 500);
    }

    // Создаём сетку и запускаем смену фото
    await createGrid();
    setInterval(changeRandomImage, 10000); // Меняем фото каждые 10 секунд
});

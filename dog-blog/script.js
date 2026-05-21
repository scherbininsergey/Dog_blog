// Данные для фотографий (статьи)
const photoData = {
    1: {
        title: "Моя первая прогулка",
        text: "Привет! Это моя самая первая прогулка в парке. Я был так взволнован! Столько новых запахов, столько интересных мест для исследования. Мама сказала, что я вел себя очень хорошо, хотя мне очень хотелось погнаться за каждой белкой. В следующий раз я обязательно научусь ходить спокойно на поводке. А пока — я просто счастливый щенок, который открыл для себя огромный мир!"
    },
    2: {
        title: "День на пляже",
        text: "Сегодня мы ездили на озеро! Это было невероятно! Я впервые увидел такую большую воду. Сначала я боялся заходить глубоко, но потом понял, как весело плескаться в волнах. Мой мячик летал дальше, чем когда-либо! Хозяин кидал его, а я приносил обратно. К концу дня я был самым счастливым и немного уставшим псом. Обязательно вернемся еще!"
    },
    3: {
        title: "Встреча с друзьями",
        text: "На собачьей площадке я встретил столько новых друзей! Был там золотистый ретривер по имени Бобби, он научил меня правильно играть в догонялки. Еще была маленькая такса Мила, которая оказалась очень смелой. Мы бегали, играли, делились игрушками. Оказывается, быть социальным — это так весело! Теперь у нас есть регулярные встречи каждую субботу."
    },
    4: {
        title: "Мой первый снег",
        text: "Это было волшебство! Я проснулся утром и увидел, что весь мир стал белым. Снег был таким холодным и пушистым! Я пытался его поймать языком, копал носом, делал снежные ангелы (по крайней мере, так сказала мама). Мои лапы сначала мерзли, но потом я привык. Зимние прогулки оказались совсем другим приключением. Люблю снег!"
    },
    5: {
        title: "День рождения",
        text: "Ура! Мне исполнился год! Был настоящий праздник с собачьим тортом (без сахара, конечно). Друзья принесли подарки: новые игрушки, вкусняшки и даже специальный ошейник. Я получил столько внимания и любви! Задул свечку (ну, почти) и сделал много смешных фото. Этот день запомнится надолго. Спасибо всем, кто делает мою жизнь такой замечательной!"
    }
};

// Переменная для отслеживания текущей позиции карусели
let carouselCurrentIndex = 0;
const itemsPerView = 4;

// Функция открытия модального окна
function openModal(photoId) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalText = document.getElementById('modalText');
    
    // Находим все изображения на странице
    const allImages = document.querySelectorAll('[data-photo]');
    let currentPhotoIndex = -1;
    
    // Находим индекс текущего фото
    allImages.forEach((img, index) => {
        if (parseInt(img.getAttribute('data-photo')) === parseInt(photoId)) {
            currentPhotoIndex = index;
        }
    });
    
    // Получаем данные для текущего фото
    const data = photoData[photoId];
    
    if (data) {
        // Берем изображение из локальной папки
        const currentImg = allImages[currentPhotoIndex].querySelector('img');
        const largeImageSrc = currentImg.src;
        
        modalImage.src = largeImageSrc;
        modalImage.alt = data.title;
        modalText.innerHTML = `<h3 style="color: #667eea; margin-bottom: 1rem; font-size: 1.5rem;">${data.title}</h3><p>${data.text}</p>`;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
        
        // Сохраняем текущий индекс для навигации
        modal.dataset.currentIndex = currentPhotoIndex;
    }
}

// Функция закрытия модального окна
function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку
}

// Навигация в модальном окне (следующее/предыдущее фото)
function navigateModal(direction) {
    const modal = document.getElementById('photoModal');
    const currentIndex = parseInt(modal.dataset.currentIndex);
    const allImages = document.querySelectorAll('[data-photo]');
    
    let newIndex;
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % allImages.length;
    } else {
        newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    }
    
    const newPhotoId = allImages[newIndex].getAttribute('data-photo');
    openModal(newPhotoId);
}

// Функция для открытия модального окна входа
function openLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Функция для закрытия модального окна входа
function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Функция проверки логина и пароля
function checkLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (username === '123' && password === '123') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        closeLoginModal();
        window.location.href = 'adm_site.html';
    } else {
        alert('Неверный логин или пароль!');
    }
}

// Функция загрузки постов из localStorage
function loadPostsFromStorage() {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    return posts;
}

// Функция добавления постов из localStorage в карусель и галерею
function renderPostsFromStorage() {
    const posts = loadPostsFromStorage();
    
    if (posts.length === 0) return;
    
    // Добавляем в карусель на главной странице
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        posts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.className = 'photo-item';
            postItem.setAttribute('data-photo', `post-${post.id}`);
            postItem.innerHTML = `<img src="${post.image}" alt="История">`;
            carouselTrack.appendChild(postItem);
        });
    }
    
    // Добавляем в галерею
    const photoGridLarge = document.querySelector('.photo-grid-large');
    if (photoGridLarge) {
        posts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.className = 'photo-item-large';
            postItem.setAttribute('data-photo', `post-${post.id}`);
            postItem.innerHTML = `<img src="${post.image}" alt="История">`;
            photoGridLarge.appendChild(postItem);
        });
    }
    
    // Обновляем photoData для постов
    posts.forEach(post => {
        photoData[`post-${post.id}`] = {
            title: post.title,
            text: post.content
        };
    });
}

// Добавляем обработчики событий
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем посты из localStorage и рендерим их
    renderPostsFromStorage();
    
    // Обработчики для всех элементов с фото
    const photoItems = document.querySelectorAll('[data-photo]');
    
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const photoId = this.getAttribute('data-photo');
            openModal(photoId);
        });
    });
    
    // Закрытие по клику на крестик
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Закрытие по клику вне контента для модального окна входа
    window.addEventListener('click', function(event) {
        const loginModal = document.getElementById('loginModal');
        if (event.target === loginModal) {
            closeLoginModal();
        }
        
        const modal = document.getElementById('photoModal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Навигация клавишами
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('photoModal');
        if (modal.style.display === 'block') {
            if (event.key === 'Escape') {
                closeModal();
            } else if (event.key === 'ArrowRight') {
                navigateModal('next');
            } else if (event.key === 'ArrowLeft') {
                navigateModal('prev');
            }
        }
        
        const loginModal = document.getElementById('loginModal');
        if (loginModal && loginModal.style.display === 'block' && event.key === 'Escape') {
            closeLoginModal();
        }
    });
    
    // Добавляем кнопки навигации в модальное окно
    const modalContent = document.querySelector('.modal-content');
    
    if (modalContent) {
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '&#10094;';
        prevBtn.className = 'nav-btn nav-btn-prev';
        prevBtn.onclick = () => navigateModal('prev');
        
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '&#10095;';
        nextBtn.className = 'nav-btn nav-btn-next';
        nextBtn.onclick = () => navigateModal('next');
        
        modalContent.appendChild(prevBtn);
        modalContent.appendChild(nextBtn);
    }
    
    // Инициализация карусели
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselPrevBtn = document.querySelector('.carousel-prev');
    const carouselNextBtn = document.querySelector('.carousel-next');
    
    if (carouselTrack && carouselPrevBtn && carouselNextBtn) {
        const carouselItems = carouselTrack.querySelectorAll('.photo-item');
        const totalItems = carouselItems.length;
        
        function updateCarousel() {
            const itemWidth = carouselItems[0].offsetWidth + 24; // ширина + gap
            carouselTrack.style.transform = `translateX(-${carouselCurrentIndex * itemWidth}px)`;
        }
        
        carouselPrevBtn.addEventListener('click', () => {
            if (carouselCurrentIndex > 0) {
                carouselCurrentIndex--;
                updateCarousel();
            }
        });
        
        carouselNextBtn.addEventListener('click', () => {
            const maxIndex = totalItems - itemsPerView;
            if (carouselCurrentIndex < maxIndex) {
                carouselCurrentIndex++;
                updateCarousel();
            }
        });
    }
});

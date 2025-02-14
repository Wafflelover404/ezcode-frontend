<script setup>
import { onMounted, ref } from 'vue';
import { HomeIcon, FilmIcon, PlusIcon } from "@heroicons/vue/solid"
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const currentLanguage = ref('en');
const colorMode = useColorMode();
const isSidebarOpen = ref(false);
const sidebarMode = ref('login'); // 'login' or 'signup'

const translations = {
  en: {
    
    welcome: 'Welcome to ezcode',
    platform: 'ezcode is a platform for learning.',
    aboutTitle: 'About Us',
    aboutText: 'At ezcode, we believe in making programming education accessible to everyone. Our platform combines innovative learning approaches with practical experience to help you master coding skills effectively and enjoyably.',
    goalTitle: 'Our Goal',
    goalText: 'Our mission is to break down the barriers to learning programming. We strive to create an inclusive environment where beginners can start their coding journey with confidence and experienced developers can enhance their skills.',
    teamTitle: 'Meet Our Team',
    teamText: 'Our team consists of passionate educators, developers, and industry experts dedicated to your learning success. Together, we bring years of experience in both software development and education to create the most effective learning experience.',
    role1: 'Fullstack Developer, production manager',
    role2: 'Fullstack Developer, main developer',
    role3: 'Best tutor ever! Team lead',
    login: 'Login',
    signup: 'Sign up'
  },
  ru: {
    welcome: 'Добро пожаловать в ezcode',
    platform: 'ezcode - это платформа для обучения.',
    aboutTitle: 'О нас',
    aboutText: 'В ezcode мы верим в то, что программирование должно быть доступно каждому. Наша платформа сочетает инновационные подходы к обучению с практическим опытом, чтобы помочь вам эффективно и с удовольствием освоить навыки программирования.',
    goalTitle: 'Наша цель',
    goalText: 'Наша миссия - устранить барьеры в изучении программирования. Мы стремимся создать инклюзивную среду, где начинающие могут уверенно начать свой путь в программировании, а опытные разработчики - улучшить свои навыки.',
    teamTitle: 'Познакомьтесь с нашей командой',
    teamText: 'Наша команда состоит из увлеченных преподавателей, разработчиков и экспертов отрасли, преданных вашему успеху в обучении. Вместе мы привносим годы опыта как в разработке программного обеспечения, так и в образовании, чтобы создать наиболее эффективный опыт обучения.',
    role1: 'Fullstack разработчик, менеджер производства',
    role2: 'Fullstack разработчик, главный разработчик',
    role3: 'Лучший учитель! Лидер команды',
    login: 'Войти',
    signup: 'Регистрация',
    toggleTheme: 'Переключить тему'
  },
  be: {
    welcome: 'Сардэчна запрашаем у ezcode',
    platform: 'ezcode - гэта платформа для навучання.',
    aboutTitle: 'Пра нас',
    aboutText: 'У ezcode мы верым у тое, што праграмаванне павінна быць даступна кожнаму. Наша платформа спалучае інавацыйныя падыходы да навучання з практычным досведам, каб дапамагчы вам эфектыўна і з задавальненнем асвоіць навыкі праграмавання.',
    goalTitle: 'Наша мэта',
    goalText: 'Наша місія - ліквідаваць бар\'еры ў вывучэнні праграмавання. Мы імкнемся стварыць інклюзіўнае асяроддзе, дзе пачаткоўцы могуць упэўнена пачаць свой шлях у праграмаванні, а вопытныя распрацоўшчыкі - палепшыць свае навыкі.',
    teamTitle: 'Пазнаёмцеся з нашай камандай',
    teamText: 'Наша каманда складаецца з захопленых выкладчыкаў, распрацоўшчыкаў і экспертаў галіны, адданых вашаму поспеху ў навучанні. Разам мы прыносім гады досведу як у распрацоўцы праграмнага забеспячэння, так і ў адукацыі, каб стварыць найбольш эфектыўны досвед навучання.',
    role1: 'Fullstack распрацоўшчык, менеджэр вытворчасці',
    role2: 'Fullstack распрацоўшчык, галоўны распрацоўшчык',
    role3: 'Найлепшы навучыльнік! Лiдэр каманды',
    login: 'Увайсці',
    signup: 'Рэгістрацыя'
  }
};

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

// Add data for the graph
const telegramData = {
  labels: ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024'],
  values: [10, 45, 120, 180]
};

// Check auth status on mount
onMounted(() => {
  const articles = document.querySelectorAll('.article');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  articles.forEach(article => {
    observer.observe(article);
  });

  // Add graph initialization
  const ctx = document.getElementById('userGraph');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: telegramData.labels,
        datasets: [{
          label: 'Telegram Users',
          data: telegramData.values,
          borderColor: '#0088cc',
          backgroundColor: 'rgba(0, 136, 204, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'var(--text-primary)'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'var(--text-primary)'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'var(--text-primary)'
            }
          }
        }
      }
    });
  }
});

const openSidebar = (mode) => {
  sidebarMode.value = mode;
  isSidebarOpen.value = true;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>

<template>
  <div class="container-landing">
    <div class="top-bar">
      <div class="flex justify-between items-center px-6 py-4">
        <UDropdown :items="[
          [{
            label: 'Telegram',
            icon: 'i-heroicons-paper-airplane',
            href: 'https://t.me/learnezcode'
          }],
          [{
            label: 'Email',
            icon: 'i-heroicons-envelope',
            href: 'mailto:afanasieffivan@gmail.com'
          }]
        ]" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
          <UButton
            color="white"
            variant="ghost"
            icon="i-heroicons-paper-airplane"
            class="top-bar-button"
          />

          <template #item="{ item }">
            <a :href="item.href" class="flex items-center w-full" target="_blank" rel="noopener">
              <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 me-2" />
              <span class="truncate">{{ item.label }}</span>
            </a>
          </template>
        </UDropdown>
        <div class="flex gap-4">
          <UDropdown :items="[
            [{
              label: 'English',
              value: 'en'
            }],
            [{
              label: 'Русский',
              value: 'ru'
            }],
            [{
              label: 'Беларуская',
              value: 'be'
            }]
          ]" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
            <UButton
              color="white"
              variant="ghost"
              icon="i-heroicons-globe-alt"
              class="top-bar-button"
            />
            <template #item="{ item }">
              <button @click="currentLanguage = item.value" class="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                <span class="truncate">{{ item.label }}</span>
              </button>
            </template>
          </UDropdown>
          <UButton
            color="white"
            variant="ghost" 
            :icon="colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
            class="top-bar-button"
            @click="toggleTheme"
          />
          <UButton
            color="white"
            variant="ghost"
            :label="translations[currentLanguage].login"
            class="top-bar-button"
            @click="openSidebar('login')"
          />
          <UButton
            color="white"
            variant="ghost"
            :label="translations[currentLanguage].signup"
            class="top-bar-button"
            @click="openSidebar('signup')"
          />
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div id="glow-container">
        <h1>{{ translations[currentLanguage].welcome }}</h1>
      </div>
      <div id="glow-container">
        <p class="platform-description-slogan">
          {{ translations[currentLanguage].platform }}
        </p>
      </div>
    </div>
  </div>

  <div class="articles-wrapper">
    <div class="articles-section">
      <article class="article">
        <div class="article-content">
          <div class="article-image left"></div>
          <div class="article-text-content">
              <h2>{{ translations[currentLanguage].aboutTitle }}</h2>
            <p class="article-text">
              {{ translations[currentLanguage].aboutText }}
            </p>
          </div>
        </div>
      </article>

      <article class="article" id="article1">
        <div class="article-content">
          <div class="article-text-content">
            <h2>{{ translations[currentLanguage].goalTitle }}</h2>
            <p class="article-text">
              {{ translations[currentLanguage].goalText }}
            </p>
          </div>
          <div class="article-image right"></div>
        </div>
      </article>

      <article class="article" id="article2">
        <h2>{{ translations[currentLanguage].teamTitle }}</h2>
        <p class="article-text">
          {{ translations[currentLanguage].teamText }}
        </p>
        <div class="team-grid">
          <div class="team-member">
            <div class="team-member-image" id="victor"></div>
            <h3>Demeshko Victor</h3>
            <p>{{ translations[currentLanguage].role2 }}</p>
          </div>
          <div class="team-member">
            <div class="team-member-image" id="iryna"></div>
            <h3>Gorbatsevich Iryna</h3>
            <p>{{ translations[currentLanguage].role3 }}</p>
          </div>
          <div class="team-member">
            <div class="team-member-image" id="ivan"></div>
            <h3>Afanasieff Ivan</h3>
            <p>{{ translations[currentLanguage].role1 }}</p>
          </div>
        </div>
      </article>
      <div class="graph-section article">
        <h2>Our Community Growth</h2>
        <div class="graph-container">
          <canvas id="userGraph"></canvas>
        </div>
    </div>
    </div>
  </div>

  <!-- Add sidebar -->
  <div 
    class="sidebar-overlay" 
    :class="{ 'active': isSidebarOpen }"
    @click="closeSidebar"
  ></div>
  <div class="sidebar" :class="{ 'active': isSidebarOpen }">
    <button class="close-button" @click="closeSidebar">×</button>
    <div class="sidebar-content">
      <h2>{{ sidebarMode === 'login' ? translations[currentLanguage].login : translations[currentLanguage].signup }}</h2>
      <!-- Add your login/signup form here -->
    </div>
  </div>
</template>

<style>
  h1 {
    font-size: clamp(2em, 8vw, 6.5em);
    text-align: center;
    font-family: 'Poppins', sans-serif;
    margin: 0;
    color: var(--text-primary);
    position: relative;
    z-index: 1;
    transition: transform 0.5s ease-out;
  }
  p {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    margin: 1em 0 1.5em;
    color: var(--text-primary);
    position: relative;
    z-index: 1;
    transition: transform 0.5s ease-out;
    font-size: clamp(0.9em, 2vw, 1.1em);
  }

  @keyframes gradientStatic {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes gradientHover {
    0% {
      background-position: 100% 50%;
    }
    50% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  #glow-container {
    font-size: 36px;
    font-weight: bold;
    text-shadow: 0 0 5px white;
  }

  #glow-container-description {
    font-size: 36px;
    text-shadow: 0 0 0.5px white;
  }

  .container-landing {
    position: relative;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(0deg, var(--gradient-from), var(--gradient-to));
    background-size: 200% 200%;
    background-attachment: fixed;
    animation: gradientStatic 6s ease infinite;
    display: flex;
    flex-direction: column;
    transform-style: preserve-3d;
    perspective: 1000px;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateZ(0);
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
    padding: 1em;
  }

  .landing-button {
    min-width: 7.5em;
    font-weight: 500;
    letter-spacing: 0.031em;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .landing-button:hover {
    transform: translateY(-0.125em);
    box-shadow: 0 0.25em 0.75em var(--shadow-color);
  }

  .top-bar-button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .top-bar-button:hover {
    transform: translateY(-0.063em);
  }

  .articles-wrapper {
    background: linear-gradient(0deg, var(--gradient-to), var(--gradient-from));
    position: relative;
    z-index: 2;
    transform: translateZ(-6.25em);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.95;
  }

  .articles-wrapper:hover {
    transform: translateZ(0);
    opacity: 1;
  }

  .container-landing:hover + .articles-wrapper {
    transform: translateZ(-3.125em);
    opacity: 0.98;
  }

  .articles-section {
    padding: 2em 1em;
    max-width: 75em;
    margin: 0 auto;
    color: var(--text-primary);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .article {
    margin-bottom: 2em;
    padding: 1.5em;
    background: var(--background-secondary);
    border-radius: 1em;
    backdrop-filter: blur(0.625em);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s ease;
    opacity: 0;
    transform: translateY(6.25em);
  }

  .article.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .article-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5em;
  }

  @media (min-width: 48em) {
    .article-content {
      flex-direction: row;
    }
  }

  .article-image {
    width: 100%;
    height: 12em;
    background: var(--background-hover);
    border-radius: 0.5em;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
  }

  @media (min-width: 48em) {
    .article-image {
      width: 18.75em;
      height: 12.5em;
    }
  }

  .article-image.left {
    background-image: url('/images/about.png');
  }

  .article-image.right {
    background-image: url('/images/goal.jpg');
  }

  .article-text-content {
    flex: 1;
  }

  .article:hover {
    transform: translateY(-0.625em) scale(1.02);
    background: linear-gradient(90deg, var(--gradient-from), var(--gradient-to));
    box-shadow: 0 0.625em 1.875em var(--shadow-color);
  }

  #article1:hover {
    background: linear-gradient(270deg, var(--gradient-from), var(--gradient-to));
  }

  .article h2 {
    font-size: clamp(1.5em, 4vw, 2em);
    margin-bottom: 0.8em;
    font-family: 'Poppins', sans-serif;
    transition: transform 0.3s ease;
  }

  .article-text {
    font-size: clamp(0.9em, 2vw, 1.1em);
    line-height: 1.6;
    margin-bottom: 1.5em;
    transition: opacity 0.3s ease;
    text-align: left;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    gap: 1.5em;
    margin-top: 2em;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .team-member {
    text-align: center;
    padding: 1.2em;
    background: var(--background-secondary);
    border-radius: 0.5em;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .team-member-image {
    width: 8em;
    height: 8em;
    background: var(--background-hover);
    border-radius: 50%;
    margin: 0 auto 1em;
    background-size: cover;
    background-position: center;
  }

  #ivan {
    background-image: url('/images/ivan.jpg');
  }

  #victor {
    background-image: url('/images/victor.jpg');
  }

  #iryna {
    background-image: url('/images/iryna.jpg');
  }

  .team-member:hover {
    transform: translateY(-0.313em) scale(1.05);
    background: var(--background-hover);
    box-shadow: 0 0.313em 0.938em var(--shadow-color);
  }

  .team-member h3 {
    font-size: clamp(1em, 3vw, 1.25em);
    margin-bottom: 0.5em;
    font-family: 'Poppins', sans-serif;
    transition: transform 0.3s ease;
  }

  .team-member p {
    font-size: clamp(0.8em, 2vw, 1em);
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  .platform-description {
    font-size: clamp(1.2em, 3vw, 2em);
    line-height: 1.6;
    margin-bottom: 1.5em;
    margin-top: 0.5em;
    transition: opacity 0.3s ease;
    padding: 0 1em;
  }

  #article2:hover {
    background: linear-gradient(180deg, var(--gradient-from), var(--gradient-to));
  }

  :root {
    /* Colors */
    --white: #ffffff;
    --black: #000000;
    --gray-100: #f3f4f6;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    
    /* Theme Colors - Light */
    --gradient-from: rgb(0, 66, 180);
    --gradient-to: rgb(190, 204, 236);
    --text-primary: rgb(0, 0, 0);
    --text-secondary: rgba(0, 0, 0, 0.8);
    --background-primary: rgb(51, 102, 204);
    --background-secondary: rgba(255, 255, 255, 0.05);
    --background-hover: rgba(255, 255, 255, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.2);
    --gradient-hover-1: rgb(190, 204, 236);
    --gradient-hover-2: rgba(0, 53, 151, 0.26);
  }

  .dark {
    /* Theme Colors - Dark */
    --gradient-from: rgb(0, 0, 0);
    --gradient-to: rgb(0, 42, 119);
    --text-primary: rgb(255, 255, 255);
    --text-secondary: rgba(255, 255, 255, 0.8);
    --background-primary: rgb(0, 0, 0);
    --background-secondary: rgba(255, 255, 255, 0.05);
    --background-hover: rgba(255, 255, 255, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.3);
    --gradient-hover-1: rgb(0, 0, 0);
    --gradient-hover-2: rgba(0, 53, 151, 0.26);
  }

  .graph-section {
    padding: 2em;
    margin: 2em auto;
    max-width: 75em;
  }

  .graph-container {
    height: 400px;
    width: 100%;
    position: relative;
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  .sidebar-overlay.active {
    opacity: 1;
    visibility: visible;
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: -400px;
    width: 400px;
    height: 100vh;
    background: var(--background-primary);
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    z-index: 999;
    transition: right 0.3s ease;
    padding: 2rem;
    backdrop-filter: blur(10px);
    background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to));
  }

  .sidebar.active {
    right: 0;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .close-button:hover {
    transform: scale(1.1);
  }

  .sidebar-content {
    margin-top: 3rem;
  }

  .sidebar-content h2 {
    color: var(--text-primary);
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    .sidebar {
      width: 100%;
      right: -100%;
    }
  }
</style>

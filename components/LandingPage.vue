<script setup>
import { onMounted, ref } from 'vue';
import { HomeIcon, FilmIcon, PlusIcon } from "@heroicons/vue/solid"
import { Chart, registerables } from 'chart.js';
import { useRouter } from 'vue-router';

Chart.register(...registerables);

const currentLanguage = ref('en');
const colorMode = useColorMode();
const isSidebarOpen = ref(false);
const sidebarMode = ref('login'); // 'login' or 'signup'
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const translations = {
  en: {
    welcome: 'Welcome to ezcode',
    platform: 'ezcode is a comprehensive educational platform combining coding and interactive learning.',
    aboutTitle: 'About Us',
    aboutText: 'At ezcode, we believe in making education accessible and engaging for everyone. Our platform combines innovative learning approaches with practical experience across various disciplines, with a special focus on programming and technology. We create an environment where learning becomes an exciting journey of discovery.',
    goalTitle: 'Our Mission',
    goalText: 'Our mission is to transform traditional education through technology. We strive to create an inclusive learning environment where students can master both technical and non-technical skills through interactive courses, hands-on projects, and personalized learning paths.',
    teamTitle: 'Meet Our Team',
    teamText: 'Our team consists of passionate educators, technology experts, and industry professionals dedicated to revolutionizing education. Together, we bring years of experience in education, software development, and instructional design to create the most effective learning experience.',
    role1: 'Fullstack Developer, production manager',
    role2: 'Fullstack Developer, main developer',
    role3: 'Best tutor ever! Team lead',
    login: 'Login',
    signup: 'Sign up'
  },
  ru: {
    welcome: 'Добро пожаловать в ezcode',
    platform: 'ezcode - это комплексная образовательная платформа, сочетающая программирование и интерактивное обучение.',
    aboutTitle: 'О нас',
    aboutText: 'В ezcode мы верим в то, что образование должно быть доступным и увлекательным для каждого. Наша платформа сочетает инновационные подходы к обучению с практическим опытом в различных дисциплинах, с особым фокусом на программировании и технологиях. Мы создаем среду, где обучение становится увлекательным путешествием открытий.',
    goalTitle: 'Наша миссия',
    goalText: 'Наша миссия - трансформировать традиционное образование с помощью технологий. Мы стремимся создать инклюзивную образовательную среду, где студенты могут освоить как технические, так и нетехнические навыки через интерактивные курсы, практические проекты и персонализированные пути обучения.',
    teamTitle: 'Познакомьтесь с нашей командой',
    teamText: 'Наша команда состоит из увлеченных преподавателей, технических экспертов и профессионалов индустрии, преданных революции в образовании. Вместе мы привносим годы опыта в образовании, разработке программного обеспечения и учебном дизайне, чтобы создать наиболее эффективный опыт обучения.',
    role1: 'Fullstack разработчик, менеджер производства',
    role2: 'Fullstack разработчик, главный разработчик',
    role3: 'Лучший учитель! Лидер команды',
    login: 'Войти',
    signup: 'Регистрация',
    toggleTheme: 'Переключить тему'
  },
  be: {
    welcome: 'Сардэчна запрашаем у ezcode',
    platform: 'ezcode - гэта комплексная адукацыйная платформа, якая спалучае праграмаванне і інтэрактыўнае навучанне.',
    aboutTitle: 'Пра нас',
    aboutText: 'У ezcode мы верым у тое, што адукацыя павінна быць даступнай і захапляльнай для кожнага. Наша платформа спалучае інавацыйныя падыходы да навучання з практычным досведам у розных дысцыплінах, з асаблівым фокусам на праграмаванні і тэхналогіях. Мы ствараем асяроддзе, дзе навучанне становіцца захапляльным падарожжам адкрыццяў.',
    goalTitle: 'Наша місія',
    goalText: 'Наша місія - трансфармаваць традыцыйную адукацыю з дапамогай тэхналогій. Мы імкнемся стварыць інклюзіўнае адукацыйнае асяроддзе, дзе студэнты могуць асвоіць як тэхнічныя, так і нетэхнічныя навыкі праз інтэрактыўныя курсы, практычныя праекты і персаналізаваныя шляхі навучання.',
    teamTitle: 'Пазнаёмцеся з нашай камандай',
    teamText: 'Наша каманда складаецца з захопленых выкладчыкаў, тэхнічных экспертаў і прафесіяналаў індустрыі, адданых рэвалюцыі ў адукацыі. Разам мы прыносім гады досведу ў адукацыі, распрацоўцы праграмнага забеспячэння і навучальным дызайне, каб стварыць найбольш эфектыўны досвед навучання.',
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
  // Reset form fields when opening sidebar
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const router = useRouter();
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
      <div id="glow-container-description">
        <p class="platform-description-slogan">
          {{ translations[currentLanguage].platform }}
        </p>
      </div>
      <!-- Add the redirect button -->
      <div class="live-demo-container">
        <button class="live-demo-button" @click="router.push('/courses')">
          Go to Course Selection
        </button>
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

      <!-- Add new sign-up section -->
      <div class="signup-section article">
        <h2>Join Our Learning Community Today</h2>
        <div class="signup-content">
          <div class="signup-info">
            <div class="info-item">
              <UIcon name="i-heroicons-users" class="info-icon" />
              <h3>Vibrant Community</h3>
              <p>Connect with learners and experts across various fields</p>
            </div>
            <div class="info-item">
              <UIcon name="i-heroicons-academic-cap" class="info-icon" />
              <h3>Diverse Courses</h3>
              <p>From coding to soft skills, learn what matters to you</p>
            </div>
            <div class="info-item">
              <UIcon name="i-heroicons-light-bulb" class="info-icon" />
              <h3>Interactive Learning</h3>
              <p>Engage with hands-on projects and real-world applications</p>
            </div>
          </div>
          <div class="cta-container">
            <button class="cta-button" @click="openSidebar('signup')">
              {{ translations[currentLanguage].signup }}
            </button>
            <p class="cta-subtext">Start your coding journey today!</p>
          </div>
        </div>
      </div>

      <!-- Add footer -->
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Contact Us</h3>
            <a href="mailto:afanasieffivan@gmail.com" class="footer-link">
              <UIcon name="i-heroicons-envelope" class="footer-icon" />
              afanasieffivan@gmail.com
            </a>
            <a href="https://t.me/learnezcode" target="_blank" class="footer-link">
              <UIcon name="i-heroicons-paper-airplane" class="footer-icon" />
              Telegram Community
            </a>
          </div>
          <div class="footer-section">
            <h3>Follow Us</h3>
            <div class="social-links">
              <a href="https://github.com/learnezcode" target="_blank" class="social-link">
                <UIcon name="i-heroicons-code-bracket" class="footer-icon" />
              </a>
              <a href="https://t.me/learnezcode" target="_blank" class="social-link">
                <UIcon name="i-heroicons-paper-airplane" class="footer-icon" />
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 ezcode. All rights reserved.</p>
        </div>
      </footer>
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
      
      <!-- Telegram Login Button -->
      <div class="telegram-login">
        <button class="telegram-button">
          <img src="./images/telegram-logo.svg" alt="Telegram" class="telegram-icon" />
          {{ sidebarMode === 'login' ? 'Login with Telegram' : 'Sign up with Telegram' }}
        </button>
      </div>

      <div class="divider">
        <span>or</span>
      </div>

      <!-- Email/Password Form -->
      <form class="auth-form" @submit.prevent>
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div v-if="sidebarMode === 'signup'" class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword"
            placeholder="Confirm your password"
            required
          />
        </div>

        <button type="submit" class="submit-button">
          {{ sidebarMode === 'login' ? translations[currentLanguage].login : translations[currentLanguage].signup }}
        </button>
      </form>

      <p class="switch-mode">
        {{ sidebarMode === 'login' ? "Don't have an account?" : "Already have an account?" }}
        <button 
          class="switch-button"
          @click="sidebarMode = sidebarMode === 'login' ? 'signup' : 'login'"
        >
          {{ sidebarMode === 'login' ? translations[currentLanguage].signup : translations[currentLanguage].login }}
        </button>
      </p>
    </div>
  </div>
</template>

<style src="../assets/css/landing.css" rel="stylesheet"></style> 
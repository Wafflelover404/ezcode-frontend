<template>
  <div class="sidebar-wrapper" :class="{ 'active': isOpen }">
    <div class="sidebar-overlay" @click="closeSidebar"></div>
    <div class="sidebar" :class="{ 'slide-in': isOpen }">
      <button class="close-button" @click="closeSidebar">×</button>
      
      <div class="sidebar-content">
        <h2>{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
        
        <div id="alert" v-if="alert">{{ alert }}</div>

        <form v-if="!isLogin" @submit.prevent="signupWithPassword" class="auth-form">
          <label>
            Email address
            <input type="email" v-model="email" />
          </label>
          <label>
            Account name
            <input type="text" v-model="accountName" />
          </label>
          <label>
            Password
            <input type="password" v-model="password" />
          </label>
          <label>
            Verify password
            <input type="password" v-model="passwordVerify" />
          </label>
          <button type="submit" class="submit-btn">Sign up</button>
        </form>

        <form v-else @submit.prevent="loginWithPassword" class="auth-form">
          <label>
            Email address
            <input type="email" v-model="email" />
          </label>
          <label>
            Password
            <input type="password" v-model="password" />
          </label>
          <button type="submit" class="submit-btn">Login</button>
        </form>

        <div class="divider">
          <span>or</span>
        </div>

        <button @click.prevent="signupWithSSO" class="google-btn">
          {{ isLogin ? 'Login' : 'Sign up' }} with Google
        </button>

        <p class="switch-mode">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <a href="#" @click.prevent="toggleMode">
            {{ isLogin ? 'Sign up' : 'Login' }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Userfront from "@userfront/core";

// Initialize Userfront
Userfront.init("demo1234");

export default {
  data() {
    return {
      isOpen: false,
      isLogin: false,
      email: "",
      accountName: "",
      password: "",
      passwordVerify: "",
      alert: "",
    };
  },
  methods: {
    openSidebar(mode) {
      this.isLogin = mode === 'login';
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeSidebar() {
      this.isOpen = false;
      document.body.style.overflow = 'auto';
    },
    toggleMode() {
      this.isLogin = !this.isLogin;
    },
    signupWithPassword() {
      this.alert = "";
      if (this.password !== this.passwordVerify) {
        this.alert = "Passwords must match";
        return;
      }
      Userfront.signup({
        method: "password",
        email: this.email,
        password: this.password,
        data: {
          accountName: this.accountName,
        },
      }).catch((error) => {
        this.alert = error.message;
      });
    },
    loginWithPassword() {
      this.alert = "";
      Userfront.login({
        method: "password",
        email: this.email,
        password: this.password,
      }).catch((error) => {
        this.alert = error.message;
      });
    },
    signupWithSSO() {
      Userfront.signup({ method: "google" });
    },
  },
};
</script>

<style scoped>
.sidebar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  z-index: 1000;
}

.sidebar-wrapper.active {
  visibility: visible;
}

.sidebar-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(4px);
}

.active .sidebar-overlay {
  opacity: 1;
}

.sidebar {
  position: absolute;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100%;
  background: rgba(var(--background-primary-rgb), 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.slide-in {
  transform: translateX(-400px);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  transition: transform 0.2s ease;
}

.close-button:hover {
  transform: rotate(90deg);
}

.sidebar-content {
  margin-top: 2rem;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s ease;
}

.slide-in .sidebar-content {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 0.2s;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 
    0 0 20px rgba(255, 255, 255, 0.1), 
    inset 0 0 20px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--text-primary);
}

input {
  padding: 0.75rem;
  border: 1px solid rgba(var(--border-color-rgb), 0.3);
  border-radius: 4px;
  background: rgba(var(--background-secondary-rgb), 0.8);
  color: var(--text-primary);
  transition: all 0.2s ease;
  backdrop-filter: blur(5px);
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 10px rgba(var(--primary-color-rgb), 0.2);
}

.submit-btn {
  padding: 0.75rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  background: var(--primary-color-dark);
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(0);
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: var(--border-color);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.google-btn {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.google-btn:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
}

.google-btn:active {
  transform: translateY(0);
}

.switch-mode {
  text-align: center;
  margin-top: 1.5rem;
}

.switch-mode a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.switch-mode a:hover {
  color: var(--primary-color-dark);
}

#alert {
  color: red;
  margin-bottom: 1rem;
  text-align: center;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
</style>
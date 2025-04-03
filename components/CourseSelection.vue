<script setup>
const courses = [
  { id: 1, title: 'Introduction to Programming', description: 'Learn the basics of programming.' },
  { id: 2, title: 'Web Development', description: 'Build modern websites with HTML, CSS, and JavaScript.' },
  { id: 3, title: 'Advanced JavaScript', description: 'Master JavaScript concepts and frameworks.' },
];
</script>

<template>
  <div class="course-selection">
    <h1>Available Courses</h1>
    <ul>
      <li v-for="course in courses" :key="course.id">
        <h2>{{ course.title }}</h2>
        <p>{{ course.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style>
.course-selection {
  padding: 2rem;
  text-align: center;
}
.course-selection ul {
  list-style: none;
  padding: 0;
}
.course-selection li {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>

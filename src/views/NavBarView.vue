<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <RouterLink class="navbar-item" to="/">
          <img src="/src/assets/lgfoot.png" alt="Logo"> <Strong class="web has-text-white">  Arcturus Workshop</Strong>
        </RouterLink>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-content">
          <RouterLink class="navbar-item" to="/">
            <span class="icon-text">
              <span class="icon">
                <img src="/src/assets/home.svg">
              </span>
              <span class="home has-text-white">Home</span>
            </span>
          </RouterLink>
          <RouterLink class="navbar-item" to="/about">
            <div class="icon-text">
              <span class="icon has-text-info">
                <img src="/src/assets/information-circle.svg">
              </span>
              <span class="about has-text-white">About</span>
            </div>
          </RouterLink>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
               <span class="icon-text">
              <span class="icon">
                <img src="/src/assets/list-circle.svg">
              </span>
              <span class="api has-text-white">Data Workshop</span>
            </span>

            </a>
            <div class="navbar-dropdown">
              <RouterLink class="navbar-item" to="/customer">
                Customer
              </RouterLink>
              <RouterLink class="navbar-item" to="/teknisi">
                Teknisi
              </RouterLink>
              <RouterLink class="navbar-item" to="/service">
                Service
              </RouterLink>
              <RouterLink class="navbar-item" to="/supplier">
                Supplier
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});
export default {
  name: "NavBarView"
}
</script>

<style scoped>
.navbar{
  --color-text: white;
  background-color: #311610;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}
</style>
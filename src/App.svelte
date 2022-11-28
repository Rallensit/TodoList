<script>
  export let name;
  import Login from "./Login.svelte";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700&family=Rubik+Glitch&display=swap"
    rel="stylesheet"
  />
  <!-- <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css"
  /> -->
</svelte:head>

<main class="content">
  <div>
    <span>TC</span>
    <!-- <img src="images/favicon_1_15.png" alt="MainImage" /> -->
    <h1>{name}</h1>
  </div>
  <Login />
</main>

<style>
  main {
    margin: 20px;
    border-color: #3700b3 !important;
  }
  div {
    display: flex;
    align-items: center;
  }
  span {
    color: #450fc2;
    font-family: "Rubik Glitch", Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 68px;
    user-select: none;
  }
  h1 {
    margin-left: 20px;
    color: #ccc !important;
    font-family: "Chakra Petch", sans-serif;
  }
</style>

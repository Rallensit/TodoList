<script>
  export let name;
  import Login from "./Login.svelte";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css"
  />
</svelte:head>

<main class="content">
  <div>
    <img src="images/favicon_1_15.png" alt="MainImage" />
    <h1>{name}</h1>
  </div>
  <Login />
</main>

<style>
  main {
    margin: 20px;
    /* background-color: rgb(42, 52, 82); */
  }
  div{
    display: flex;
  }
  h1{
    /* color: #ccc !important; */
  }
</style>

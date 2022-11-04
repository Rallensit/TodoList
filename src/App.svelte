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
  <h1>Welcome to {name}</h1>

  <Login />
</main>

<!-- 
	<script>
  import Profile from "./Profile.svelte";
  import Todos from "./Todos.svelte";

  import { auth, googleProvider } from "./firebase";
  import { authState } from "rxfire/auth";

  let user;

  const unsubscribe = authState(auth).subscribe((u) => (user = u));

  function login() {
    auth.signInWithPopup(googleProvider);
  }
</script> -->

<!-- <section>
  {#if user}
    <Profile {...user} />
    <button on:click={() => auth.signOut()}>Logout</button>
    <hr />
    <Todos uid={user.uid} />
  {:else}
    <button on:click={login}> Signin with Google </button>
  {/if}
</section> -->

<style>
  h1 {
    color: purple;
  }
  main {
    margin: 20px;
  }
</style>

<script>
  import Profile from "./Profile.svelte";
  import Todos from "./Todos.svelte";

  import { auth, googleProvider } from "./firebase";
  import { authState } from "rxfire/auth";
  import { reload } from "firebase/auth";

  let user;

  const unsubscribe = authState(auth).subscribe((u) => (user = u));

  function login() {
    auth.signInWithPopup(googleProvider);
  }

  function windowReload() {
    location.reload();
  }
</script>

<section>
  {#if user}
    <Profile {...user} />
    <button
      on:click={() => auth.signOut()}
      on:click={() => windowReload()}
      class="button">Logout</button
    >
    <hr />
    <Todos uid={user.uid} />
  {:else}
    <button on:click={login} class="button"> Signin with Google </button>
  {/if}
</section>

<style>
  section {
    background: rgb(235, 235, 235);
    /* background-color: rgb(125, 158, 255); */
    /* color: white; */
    padding: 20px;
  }
</style>

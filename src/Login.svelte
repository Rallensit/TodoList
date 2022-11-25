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
    background: #232323;
    color: whitesmoke;
    padding: 20px;
  }
  .button {
    background-color: #e7e7e7;
    color: black;
  }
</style>

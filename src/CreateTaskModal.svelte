<script>
  // import { Modal } from "svelte-simple-modal";
  import { db } from "./firebase";

  import { fly, fade } from "svelte/transition";
  export let close;
  let hasError = false;
  let isSuccessVisible = false;
  let submitted = false;

  const errMessage = "All the fields are required";

  //validation https://www.youtube.com/watch?v=lx71zJldzEs&ab_channel=TheNetNinja
  async function handleSubmit(e) {
    isSuccessVisible = true;
    setTimeout(function () {
      isSuccessVisible = false;
    }, 4000);
    await add();
    close();
  }

  export let uid;
  export let description = "";
  export let plate = "";
  export let km = "";
  export let model = "";
  export let color = "#000000";
  export let updated = "";

  function add() {
    // Open Create Task Modal
    db.collection("todos").add({
      uid,
      plate,
      km,
      model,
      color,
      description,
      complete: false,
      created: Date.now(),
      updated,
    });
  }
</script>

<!-- para meter validacion https://svelte.dev/repl/5230b1d71f1b4b048cf05e3a7a49aefc?version=3.24.0 -->

{#if hasError == true}
  <p class="error-alert">{errMessage}</p>
{:else if isSuccessVisible}
  <p class="error-alert" transition:fade={{ duration: 150 }}>
    Data added succesfully
  </p>
{/if}

<div>
  <h3>Add new task</h3>
  <hr />
  <form id="taskForm" class:submitted on:submit|preventDefault={handleSubmit}>
    <div class="formDiv">
      <h4 class="formText">Plate</h4>
      <input
        class="formInput"
        placeholder="Min 4 characters and max 12"
        bind:value={plate}
        required
      />
    </div>
    <div class="formDiv">
      <h4 class="formText">KM</h4>
      <input
        class="formInput"
        placeholder="From 0 to 999999999999"
        bind:value={km}
        required
      />
    </div>
    <div class="formDiv">
      <h4 class="formText">Model</h4>
      <input
        class="formInput"
        placeholder="Max 30 characters"
        bind:value={model}
        required
      />
    </div>
    <div class="formDiv">
      <h4 class="formText">Description</h4>
      <textarea
        class="formInput"
        placeholder="Max 30 characters"
        bind:value={description}
        rows="5"
        required
      />
    </div>
    <div class="formDiv">
      <h4 class="formText">Color</h4>
      <input class="formInput" type="color" bind:value={color} />
    </div>
    <hr />
    <div class="formDiv">
      <button class="button" on:click={() => (submitted = true)}>
        Add Task
      </button>
    </div>
  </form>
</div>

<style>
  :global(.formInput) {
    display: block;
    width: 80%;
  }

  :global(.formText) {
    display: block;
    width: 20%;
  }

  :global(.formDiv) {
    display: flex;
  }

  :global(.formDiv:last-of-type) {
    float: right;
  }
</style>

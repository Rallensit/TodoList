<script>
  import { Modal } from "svelte-simple-modal";
  import { db } from "./firebase";

  export let close;

  export let uid;
  export let description = "";
  export let plate = "";
  export let km = "";
  export let model = "";
  export let color = "#000000";
  export let updated = "";

  // console.log(uid);

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

    // Close Modal
    close();
  }
</script>

<div>
  <h3>Add new task</h3>
  <div class="formDiv">
    <h4 class="formText">Plate</h4>
    <input
      class="formInput"
      placeholder="0000AAA o AA0000AA"
      bind:value={plate}
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">KM</h4>
    <input class="formInput" placeholder="p.ej 150000" bind:value={km} />
  </div>
  <div class="formDiv">
    <h4 class="formText">Model</h4>
    <input
      class="formInput"
      placeholder="p.ej Seat Ibiza 1.9tdi"
      bind:value={model}
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">Description</h4>
    <input
      class="formInput"
      placeholder="Descripcion tarea"
      bind:value={description}
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">Color</h4>
    <input class="formInput" type="color" bind:value={color} />
  </div>
  <hr />
  <div class="formDiv">
    <button on:click={add}> Add Task </button>
  </div>
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

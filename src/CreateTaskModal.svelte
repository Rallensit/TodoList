<script>
  import { Modal } from "svelte-simple-modal";
  import { db } from "./firebase";

  export let close;

  export let uid;
  export let text = "";
  export let matricula = "";
  export let km = "";
  export let modelo = "";
  export let color = "#000000";

  // console.log(uid);

  function add() {
    // Open Create Task Modal
    db.collection("todos").add({
      uid,
      matricula,
      km,
      modelo,
      color,
      text,
      complete: false,
      created: Date.now(),
    });

    // Cerrar Modal
    close();
  }
</script>

<div>
  <h3>Añadir nueva tarea</h3>
  <div class="formDiv">
    <h4 class="formText">Matricula</h4>
    <input
      class="formInput"
      placeholder="0000AAA o AA0000AA"
      bind:value={matricula}
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">KM</h4>
    <input class="formInput" placeholder="p.ej 150000" bind:value={km} />
  </div>
  <div class="formDiv">
    <h4 class="formText">Modelo</h4>
    <input
      class="formInput"
      placeholder="p.ej Seat Ibiza 1.9tdi"
      bind:value={modelo}
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">Tarea</h4>
    <input
      class="formInput"
      placeholder="Descripcion tarea"
      bind:value={text}
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">Color</h4>
    <input class="formInput" type="color" bind:value={color} />
  </div>
</div>

<hr />

<button class="button is-info" on:click={add}>Add Task</button>

<style>
  :global(.formInput) {
    display: block;
    width: 85%;
  }

  :global(.formText) {
    display: block;
    width: 15%;
  }

  :global(.formDiv) {
    display: flex;
  }
</style>

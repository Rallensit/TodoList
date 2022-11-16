<script>
  import { Modal } from "svelte-simple-modal";
  import { db } from "./firebase";
  // Añadir funciones de crear tareas
  // export let message = "Hi";

  export let uid;
  export let text = "";
  export let matricula = "";
  export let km = "";
  export let modelo = "";
  export let color = "#000000";

  console.log(uid);

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
    Modal.close();
  }
</script>

<div>
  <h3>Añadir nueva tarea</h3>
  <p>Matricula</p>
  <input placeholder="0000AAA o AA0000AA" bind:value={matricula} />
  <p>KM</p>
  <input placeholder="p.ej 150000" bind:value={km} />
  <p>Modelo</p>
  <input placeholder="p.ej Seat Ibiza 1.9tdi" bind:value={modelo} />
  <p>Descripcion tarea</p>
  <input placeholder="Descripcion tarea" bind:value={text} />
  <p>Color</p>
  <input type="color" bind:value={color} />
</div>

<hr />

<button class="button is-info" on:click={add}>Add Task</button>

<style>
  input {
    display: block;
  }
</style>

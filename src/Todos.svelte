<script>
  import TodoItem from "./TodoItem.svelte";
  import { db } from "./firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  export let uid;

  let text = "";
  let matricula = "";
  let km = "";
  let modelo = "";
  let color = "#000000";

  const query = db
    .collection("todos")
    .where("uid", "==", uid)
    .orderBy("created", "desc");

  const todos = collectionData(query, "id").pipe(startWith([]));

  async function getDocName(datetime) {
    const nameQuery = db
      .collection("todos")
      .where("uid", "==", uid)
      .where("created", "==", datetime);

    let querySnapshot = await nameQuery.get();
    return querySnapshot.docs[0].id;
  }

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
    text = "";
    matricula = "";
    km = "";
    modelo = "";
  }

  async function updateStatus(event) {
    const { newStatus, created } = event.detail;
    const id = await getDocName(created);
    db.collection("todos").doc(id).update({ complete: newStatus });
  }

  async function removeItem(event) {
    const { created } = event.detail;
    const id = await getDocName(created);
    db.collection("todos").doc(id).delete();
  }
</script>

<ul>
  {#each $todos as todo}
    <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
  {/each}
</ul>

<hr />
<!-- añadir el formulario en una modal de svelte -->
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

<!-- <p>Your task: <strong>{text}</strong></p> -->

<button class="button is-info" on:click={add}>Add Task</button>

<style>
  input {
    display: block;
  }
</style>

<script>
  import TodoItem from "./TodoItem.svelte";
  import { db } from "./firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";
  import Content from "./Content.svelte";
  import Modal from "svelte-simple-modal";
  import { async } from "rxjs";

  export let uid;

  // let text = "";
  // let matricula = "";
  // let km = "";
  // let modelo = "";
  // let color = "#000000";

  let search;
  let filteredQuery;

  let query = db
    .collection("todos")
    .where("uid", "==", uid)
    .orderBy("created", "desc");
    // .where("matricula", "==", "%54%");

  async function filter(search) {
    // funcionalidad de filtrar por matricula
    query = query.where("matricula", "==", "%54%");
    console.log(search);
  }

  const todos = collectionData(query, "id").pipe(startWith([]));

  async function getDocName(datetime) {
    const nameQuery = db
      .collection("todos")
      .where("uid", "==", uid)
      .where("created", "==", datetime);

    let querySnapshot = await nameQuery.get();
    return querySnapshot.docs[0].id;
  }

  // function add() {
  //   // Open Create Task Modal
  //   db.collection("todos").add({
  //     uid,
  //     matricula,
  //     km,
  //     modelo,
  //     color,
  //     text,
  //     complete: false,
  //     created: Date.now(),
  //   });
  //   text = "";
  //   matricula = "";
  //   km = "";
  //   modelo = "";
  // }

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

<!--
Filtros para la tabla
https://svelte.dev/repl/0429bd69748e44cdaeb8074c982f967d?version=3.41.0 
-->

<ul>
  <div style="float: right;">
    <input type="search" bind:value={search} placeholder="Search" />
    <button on:click={filter(search)}>Search</button>
  </div>
  <table>
    <tr>
      <th>Modelo</th>
      <th>Matricula</th>
      <th>Km</th>
      <th>Descripcion</th>
      <th>Fecha</th>
      <th />
    </tr>
    {#each $todos as todo}
      <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
    {/each}
  </table>
</ul>

<hr />

<Modal><Content modalType="add" {uid} /></Modal>

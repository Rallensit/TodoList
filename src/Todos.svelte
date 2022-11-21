<script>
  import TodoItem from "./TodoItem.svelte";
  import { db } from "./firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";
  import Content from "./Content.svelte";
  import Modal from "svelte-simple-modal";

  export let uid;

  // Mirar este tutorial para las modales:
  // https://svelte.dev/examples/modal
  // https://svelte.dev/repl/b95ce66b0ef34064a34afc5c0249f313?version=3.53.1

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


<script>
  import TodoItem from "./TodoItem.svelte";
  import { db } from "./firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  export let uid;

  // mirarme este video https://www.youtube.com/watch?v=_TTlatg865k&ab_channel=WebJeda
  // TODO: intentar pasarle con la constante todos los id(nombre del documento)

  let text = "some task";

  const query = db
    .collection("todos")
    .where("uid", "==", uid)
    .orderBy("created");

  const todos = collectionData(query, "id").pipe(startWith([]));

  // db.collection("todos").onSnapshot((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id); // For doc name
  //   });
  // });

  // const id = [];
  // query.get().then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     id.push(doc.id);
  //     console.log(doc.data().created);
  //   });
  // });

  async function getDocName(datetime) {
    const nameQuery = db
      .collection("todos")
      .where("uid", "==", uid)
      .where("created", "==", datetime);

    // nameQuery.get().then((querySnapshot) => {
    //   const DocName = querySnapshot.docs[0].id;
    //   // TODO: el console log sava los datos que quiero pero en el return no los obtengo
    //   console.log(DocName);
    //   return querySnapshot.docs[0].id;
    // });
    let querySnapshot = await nameQuery.get();
    return querySnapshot.docs[0].id;
  }

  function add() {
    db.collection("todos").add({
      uid,
      text,
      complete: false,
      created: Date.now(),
    });
    text = "";
  }

  async function updateStatus(event) {
    const { newStatus, created } = event.detail;
    const id = await getDocName(created);
    // console.log(id);
    db.collection("todos").doc(id).update({ complete: newStatus });
  }

  async function removeItem(event) {
    const { created } = event.detail;
    const id = await getDocName(created);
    db.collection("todos").doc(id).delete();
  }
</script>

<ul>
  {#each $todos as todo, i}
    <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
  {/each}
</ul>

<input bind:value={text} />

<hr />

<p>Your task: <strong>{text}</strong></p>

<button class="button is-info" on:click={add}>Add Task</button>

<style>
  input {
    display: block;
  }
</style>

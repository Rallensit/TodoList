<script>
  import { async } from "rxjs";
  import TodoItem from "./TodoItem.svelte";
  import { db } from "./firebase";
  import { collectionData } from "rxfire/firestore";
  import { last, startWith } from "rxjs/operators";
  import Content from "./Content.svelte";
  import Modal from "svelte-simple-modal";
  import { element } from "svelte/internal";
  import { endBefore, snapshotEqual, startAfter } from "firebase/firestore";

  export let uid;

  let search = "";
  let query;
  let todos;

  let thereIsNextButton = true;
  let thereIsPreviousButton = false;
  let nextquery;

  let lastVisible;
  let firstVisible;

  let firstData;

  let page = 0;
  let pagination = 5;

  (async () => {
    baseQuery();
    let querySnapshot = await query.get();
    firstData = querySnapshot.docs[0].id;
  })();

  // Arreglar filtro para que funcione con paginacion
  // Meter todos query en una funcion que sea llamada desde el if, separando con search y sin search
  async function baseQuery(){
    query = db
      .collection("todos")
      .where("uid", "==", uid)
      .orderBy("created", "desc")
      .limit(5);
    todos = collectionData(query, "id").pipe(startWith([]));
    await query.get().then(function (documentSnapshots) {
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    });
  }

  function filteredQuery(search) {
    query = db
      .collection("todos")
      .where("uid", "==", uid)
      .where("plate", "==", search)
      .orderBy("created", "desc")
      .limit(5);
    todos = collectionData(query, "id").pipe(startWith([]));
    query.get().then(function (documentSnapshots) {
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    });
  }

  $: if (search) {
    filteredQuery(search);
  } else {
    baseQuery();
  }

  // query = db
  //   .collection("todos")
  //   .where("uid", "==", uid)
  //   .orderBy("created", "desc")
  //   .limit(5);
  // todos = collectionData(query, "id").pipe(startWith([]));
  // query.get().then(function (documentSnapshots) {
  //   lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  //   firstVisible = documentSnapshots.docs[0];
  // });


  // Revisar esto de abajo
  async function thereIsNext() {
    if (search) {
      nextquery = db
      .collection("todos")
      .where("uid", "==", uid)
      .where("plate", "==", search)
      .orderBy("created", "desc")
      .startAfter(lastVisible)
      .limit(1);
    } else {
      nextquery = db
      .collection("todos")
      .where("uid", "==", uid)
      .orderBy("created", "desc")
      .startAfter(lastVisible)
      .limit(1);
    }
    

    await nextquery.get().then(function (documentSnapshots) {
      if (documentSnapshots.docs.length != 0) {
        thereIsNextButton = true;
      } else {
        thereIsNextButton = false;
      }
    });
  }

  async function thereIsPrevious(query) {
    await query.get().then(function (documentSnapshots) {
      if (documentSnapshots.docs[0].id != firstData) {
        thereIsPreviousButton = true;
      } else {
        thereIsPreviousButton = false;
      }
    });
  }

  async function next() {
    query = db
      .collection("todos")
      .where("uid", "==", uid)
      .orderBy("created", "desc")
      .startAfter(lastVisible)
      .limit(5);
    todos = collectionData(query, "id").pipe(startWith([]));

    await query.get().then(function (documentSnapshots) {
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      firstVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    });

    await thereIsNext();
    await thereIsPrevious(query);
  }

  async function previous() {
    let snapshot = await query.get();
    let last = snapshot.docs[0];
    query = db
      .collection("todos")
      .where("uid", "==", uid)
      .orderBy("created", "desc")
      .endBefore(last)
      .limitToLast(5);
    todos = collectionData(query, "id").pipe(startWith([]));
    await query.get().then(function (documentSnapshots) {
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    });

    await thereIsNext();
    await thereIsPrevious(query);
  }

  async function getDocName(datetime) {
    const nameQuery = db
      .collection("todos")
      .where("uid", "==", uid)
      .where("created", "==", datetime);

    let querySnapshot = await nameQuery.get();
    return querySnapshot.docs[0].id;
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
  <div>
    <Modal>
      <Content modalType="add" {uid} />
    </Modal>

    <input
      type="search"
      class="input"
      bind:value={search}
      placeholder="Search for plate"
    />
  </div>
  <table>
    <thead>
      <tr>
        <th>Model</th>
        <th>Plate Number</th>
        <th>Km</th>
        <th>Description</th>
        <th>Date</th>
        <th />
      </tr>
    </thead>
    <tbody id="tbody">
      {#each $todos as todo}
        <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
      {/each}
    </tbody>
  </table>
</ul>

<hr />

{#if thereIsPreviousButton}
  <button class="button" id="previousButton" on:click={previous}
    >Previous</button
  >
{:else}
  <button class="button" id="previousButton" disabled on:click={previous}
    >Previous</button
  >
{/if}

{#if thereIsNextButton}
  <button class="button" id="nextButton" on:click={next}>Next</button>
{:else}
  <button class="button" id="nextButton" disabled on:click={next}>Next</button>
{/if}

<style>
  th {
    color: whitesmoke !important;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
  input {
    margin-left: 25px;
    max-width: 250px;
  }
</style>

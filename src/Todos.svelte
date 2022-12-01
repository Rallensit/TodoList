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

  // number of rows per page
  let pagination = 5;

  // Search variable
  let search = "";

  // Query
  let query;
  let nextquery;

  // Result of query ready to show
  let todos;

  // first data of the query of all documents
  let firstData;

  // First and last document in the query
  let lastVisible;
  let firstVisible;

  // Number of documents
  let docNum;

  let thereIsNextButton = true;
  let thereIsPreviousButton = false;

  (async () => {
    await baseQuery();
    let querySnapshot = await query.get();
    firstData = querySnapshot.docs[0].id;
  })();

  // Arreglar filtro para que funcione con paginacion
  // Meter todos query en una funcion que sea llamada desde el if, separando con search y sin search

  async function baseQuery() {
    query = db
      .collection("todos")
      .where("uid", "==", uid)
      .orderBy("created", "desc")
      .limit(pagination);
    todos = collectionData(query, "id").pipe(startWith([]));
    await query.get().then(function (documentSnapshots) {
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // docNum = documentSnapshots.docs.length;
    });
    thereIsNext();
    thereIsPrevious(query);
  }

  function filteredQuery(search) {
    query = db
      .collection("todos")
      .where("uid", "==", uid)
      .where("plate", "==", search)
      .orderBy("created", "desc");
    todos = collectionData(query, "id").pipe(startWith([]));
    query.get().then(function (documentSnapshots) {
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    });
    thereIsNextButton = false;
    thereIsPreviousButton = false;
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
  //   .limit(pagination);
  // todos = collectionData(query, "id").pipe(startWith([]));
  // query.get().then(function (documentSnapshots) {
  //   lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  //   firstVisible = documentSnapshots.docs[0];
  // });

  // Comprueba si hay mas registros
  async function thereIsNext() {
    nextquery = db
      .collection("todos")
      .where("uid", "==", uid)
      .orderBy("created", "desc")
      .startAfter(lastVisible)
      .limit(1);

    await nextquery.get().then(function (documentSnapshots) {
      if (documentSnapshots.docs.length != 0) {
        thereIsNextButton = true;
      } else {
        thereIsNextButton = false;
      }
    });
  }

  // Comprueba si hay mas datos antes
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
      .limit(pagination);
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
      .limitToLast(pagination);
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
  <div class="tableFixHead">
    <table>
      <thead>
        <tr>
          <th>Model</th>
          <th>Plate Number</th>
          <th>Km</th>
          <th>Description</th>
          <th>Date</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody id="tbody">
        {#each $todos as todo}
          <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
        {/each}
      </tbody>
    </table>
  </div>
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
  
  .tableFixHead {
    overflow-y: auto; /* Hide vertical scrollbar */
    overflow-x: hidden; /* Hide horizontal scrollbar */
    height: 370px;
  }
  .tableFixHead thead th {
    position: sticky;
    background-color: #232323;
    top: 0;
    z-index: 100;
  }

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

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 7px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #6d2eff;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #4404d9;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #3b01c1;
  }
</style>

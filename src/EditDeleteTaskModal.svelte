<script>
  import { db } from "./firebase";

  export let close;

  export let created;
  export let uid;
  export let description;
  export let plate;
  export let km;
  export let model;
  export let color;

  // Load data from selected item
  async function getDocData(datetime) {
    const nameQuery = db
      .collection("todos")
      .where("uid", "==", uid)
      .where("created", "==", datetime);

    let querySnapshot = await nameQuery.get();
    let data = querySnapshot.docs[0].data();
    description = data.description;
    plate = data.plate;
    km = data.km;
    model = data.model;
    color = data.color;
  }

  // Get the id of the selected document
  async function getDocName(datetime) {
    const nameQuery = db
      .collection("todos")
      .where("uid", "==", uid)
      .where("created", "==", datetime);

    let querySnapshot = await nameQuery.get();
    return querySnapshot.docs[0].id;
  }

  // Edit and delete functions
  async function updateItem() {
    const id = await getDocName(created);
    db.collection("todos").doc(id).update({
      color: color,
      km: km,
      plate: plate,
      model: model,
      description: description,
      updated: Date.now(),
    });
    close();
  }

  async function removeItem() {
    const id = await getDocName(created);
    db.collection("todos").doc(id).delete();
    close();
  }

  getDocData(created);
</script>

<div>
  <h3>View the task</h3>
  <hr />
  <div class="formDiv">
    <h4 class="formText">Plate:</h4>
    <input
      class="formInput"
      placeholder="Min 4 characters and max 12"
      bind:value={plate}
      required
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">KM:</h4>
    <input
      class="formInput"
      placeholder="From 0 to 999999999999"
      bind:value={km}
      required
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">Model:</h4>
    <input
      class="formInput"
      placeholder="Max 30 characters"
      bind:value={model}
      required
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">Description:</h4>
    <textarea
      class="formInput"
      placeholder="Max 30 characters"
      bind:value={description}
      rows="5"
      required
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">Color:</h4>
    <input class="formInput" type="color" bind:value={color} />
  </div>
  <hr />
  <div class="formDiv">
    <button class="button" on:click={updateItem}> Edit </button>
    <button class="button" on:click={removeItem}> Delete </button>
  </div>
</div>

<style>
  button {
    margin-left: 10px;
  }
</style>

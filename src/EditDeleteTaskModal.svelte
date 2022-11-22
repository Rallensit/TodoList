<script>
  import { db } from "./firebase";

  export let close;

  export let created;
  export let uid;
  export let text;
  export let matricula;
  export let km;
  export let modelo;
  export let color;

  // Load data from selected item
  async function getDocData(datetime) {
    const nameQuery = db
      .collection("todos")
      .where("uid", "==", uid)
      .where("created", "==", datetime);

    let querySnapshot = await nameQuery.get();
    let data = querySnapshot.docs[0].data();
    text = data.text;
    matricula = data.matricula;
    km = data.km;
    modelo = data.modelo;
    color = data.color;
  }

  // get the id of the selected document
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
      matricula: matricula,
      modelo: modelo,
      text: text,
      updated: Date.now()
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
  <h3>Añadir nueva tarea</h3>
  <div class="formDiv">
    <h4 class="formText">Matricula:</h4>
    <input
      class="formInput"
      placeholder="0000AAA o AA0000AA"
      bind:value={matricula}
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">KM:</h4>
    <input class="formInput" placeholder="p.ej 150000" bind:value={km} />
  </div>
  <div class="formDiv">
    <h4 class="formText">Modelo:</h4>
    <input
      class="formInput"
      placeholder="p.ej Seat Ibiza 1.9tdi"
      bind:value={modelo}
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">Tarea:</h4>
    <input
      class="formInput"
      placeholder="Descripcion tarea"
      bind:value={text}
    />
  </div>
  <div class="formDiv">
    <h4 class="formText">Color:</h4>
    <input class="formInput" type="color" bind:value={color} />
  </div>
  <div class="formDiv">
    <button on:click={updateItem}> Editar </button>
    <button on:click={removeItem}> Eliminar </button>
  </div>
</div>

<style>
  button {
    margin-left: 10px;
  }
</style>

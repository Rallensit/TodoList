<script>
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Content from "./Content.svelte";
  import Modal from "svelte-simple-modal";

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch("remove", { created });
  }

  function toggleStatus() {
    let newStatus = !complete;
    dispatch("toggle", {
      newStatus,
      created,
    });
  }

  export let id;
  export let text;
  export let complete;
  export let created;
  export let matricula;
  export let km;
  export let modelo;
  export let color;

  function dateFormat(dateTime, format) {
    // Parsear el input
    const date = new Date(dateTime);

    // Extraer las partes de la fecha
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Reemplazar el mes
    format = format.replace("mm", month.toString().padStart(2, "0"));

    // Reemplazar el año
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    }

    // Reemplazar el día
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
  }

  function textFormat(txt) {
    if (txt.length > 10) {
      txt = txt.substring(0, 10) + "...";
    }
    return txt;
  }
</script>

<tr in:fly={{ x: 900, duration: 500 }} out:fade>
  <td>
    {textFormat(modelo)}
  </td>
  <td>
    {matricula}
  </td>
  <td>
    {km}
  </td>
  <td>
    {textFormat(text)}
  </td>
  <td>
    {dateFormat(created, "dd-mm-yyyy")}
  </td>
  <td style="display: inline-flex;">
    <div
    class="color-div"
    style="background-color: {color}; border:1px solid {color};"
    />
    {#if complete}
      <button class="is-button" on:click={toggleStatus}> ✔️ </button>
    {:else}
      <button class="is-button" on:click={toggleStatus}> ❌ </button>
    {/if}
    <!-- <button class="is-button" on:click={edit}> ✏️ </button> -->
    <button class="is-button" on:click={remove}> 🗑️ </button>
    <Modal><Content modalType="edit-delete" /></Modal>
  </td>
</tr>

<style>
  .color-div {
    display: block;
    content: "";
    width: 40px;
    height: 40px;
  }
</style>

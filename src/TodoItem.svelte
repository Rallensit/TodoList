<script>
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Content from "./Content.svelte";
  import Modal from "svelte-simple-modal";

  const dispatch = createEventDispatcher();

  function toggleStatus() {
    let newStatus = !complete;
    dispatch("toggle", {
      newStatus,
      created,
    });
  }

  export let uid;
  export let description;
  export let complete;
  export let created;
  export let plate;
  export let km;
  export let model;

  function dateFormat(dateTime, format) {
    // Parse the input
    const date = new Date(dateTime);

    // Extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Replace month
    format = format.replace("mm", month.toString().padStart(2, "0"));

    // Replace the year
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    }

    // Replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
  }

  function textFormat(txt) {
    if (txt.length > 10) {
      txt = txt.substring(0, 20) + "...";
    }
    return txt;
  }
</script>

<tr in:fly={{ x: 900, duration: 500 }} out:fade id={created}>
  <td class="hidden">
    {textFormat(model)}
  </td>
  <td>
    {plate}
  </td>
  <td class="hidden">
    {km}
  </td>
  <td class="hidden-small">
    {textFormat(description)}
  </td>
  <td>
    {dateFormat(created, "dd-mm-yyyy")}
  </td>
  <td style="display: inline-flex;">
    {#if complete}
      <button class="is-button hidden-small" on:click={toggleStatus}> ✔️ </button>
    {:else}
      <button class="is-button hidden-small" on:click={toggleStatus}> ❌ </button>
    {/if}
    <Modal><Content modalType="edit-delete" {created} {uid} /></Modal>
  </td>
</tr>


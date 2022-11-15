<script>
  import { fade, fly } from "svelte/transition";

  import { createEventDispatcher } from "svelte";

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

  // document ID
  export let id;
  export let text;
  export let complete;
  export let created;
  export let matricula;
  export let km;
  export let modelo;
  export let color;

  function dateFormat(dateTime, format) {
    //parse the input date
    const date = new Date(dateTime);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("mm", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
  }
</script>

<li in:fly={{ x: 900, duration: 500 }} out:fade>
  {#if complete}
    <span class="is-complete">
      {modelo}
      {matricula}
      {km}
      {text} - {dateFormat(created, "dd-mm-yyyy")}
    </span>
    <button class="is-button" on:click={toggleStatus}> ✔️ </button>
  {:else}
    <span>
      {modelo}
      {matricula}
      {km}
      {text} - {dateFormat(created, "dd-mm-yyyy")}
    </span>
    <button class="is-button" on:click={toggleStatus}> ❌ </button>
  {/if}
  <div
    class="color-div"
    style="background-color: {color}; border:1px solid {color};"
  />
  <button class="is-button" on:click={remove}> 🗑️ </button>
</li>

<style>
  .is-complete {
    text-decoration: line-through;
    color: green;
  }

  li {
    display: flex;
    font-size: 1.2em;
    font-weight: bold;
  }

  .color-div {
    display: block;
    content: "";
    padding: 20px;
    /* background-image:url('../images/gold-line-2v.gif');  */
    /* background-repeat:repeat-y; */
    height: 100%;
  }

  span {
    margin-right: auto;
  }
</style>

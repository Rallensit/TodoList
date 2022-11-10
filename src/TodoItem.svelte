<script>
  import { fade, fly } from "svelte/transition";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch("remove", { id });
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
</script>

<li in:fly={{ x: 900, duration: 500 }} out:fade>
  {#if complete}
    <span class="is-complete">
      {text}
      +
      {id}
      <!-- {text + ' - ' + id} -->
    </span>
    <button class="is-button" on:click={toggleStatus}> ✔️ </button>
  {:else}
    <span>
      {text}
      +
      {id}
      <!-- {text + ' - ' + id} -->
    </span>
    <button class="is-button" on:click={toggleStatus}> ❌ </button>
  {/if}

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

  span {
    margin-right: auto;
  }
</style>

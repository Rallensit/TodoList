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
      id,
      newStatus,
    });
  }

  export let id; // document ID
  export let text;
  export let complete;
</script>

<li in:fly={{ x: 900, duration: 500 }}>
  <span class:complete>{text}</span>
  {#if complete}
    <button on:click={toggleStatus}> ✔️ </button>
  {:else}
    <button on:click={toggleStatus}> ❌ </button>
  {/if}

  <button on:click={remove}> 🗑 </button>
</li>

<style>
  .complete {
    text-decoration: line-through;
    color: green;
  }
</style>

<script>
  export let modalType;
  export let uid;
  export let created;
  import { getContext } from "svelte";
  import CreateTaskModal from "./CreateTaskModal.svelte";
  import EditDeleteTaskModal from "./EditDeleteTaskModal.svelte";
  const { open, close } = getContext("simple-modal");

  const showModal = () => {
    // Open task modal passing the user id to assing the data to him
    if (modalType === "add") {
      open(CreateTaskModal, { close, uid: uid });
    } else if (modalType === "edit-delete") {
      open(EditDeleteTaskModal, { close, uid: uid, created: created });
    }
  };
</script>

<p>
  {#if modalType === "add"}
    <button class="button" on:click={showModal}>Add new Task</button>
  {:else}
    <button class="is-button" on:click={showModal}> ⚙️ </button>
  {/if}
</p>

<style>
  :global(.is-button) {
    height: 40px;
    width: 40px;
  }
</style>

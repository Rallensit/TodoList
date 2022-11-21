<script>
  import { db } from "./firebase.js";
  export let modalType;
  export let uid;
  import { getContext } from "svelte";
  import CreateTaskModal from "./CreateTaskModal.svelte";
  import EditDeleteTaskModal from "./EditDeleteTaskModal.svelte";
  const { open, close } = getContext("simple-modal");

  const showModal = () => {
    if (modalType === "add") {
      open(CreateTaskModal, { close, uid: uid });
    } else if (modalType === "edit-delete") {
      // Pass the selected task data
      open(EditDeleteTaskModal, { close, uid: uid });
    }
  };
</script>

<p>
  {#if modalType === "add"}
    <button on:click={showModal}>Add new Task</button>
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

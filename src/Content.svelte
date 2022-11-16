<script>
  export let modalType;
  export let uid;
  import { getContext } from "svelte";
  import CreateTaskModal from "./CreateTaskModal.svelte";
  import EditDeleteTaskModal from "./EditDeleteTaskModal.svelte";
  const { open } = getContext("simple-modal");
  const showModal = () => {
    if (modalType === "add") {
      
      open(CreateTaskModal, { uid: uid });
    } else if (modalType === "edit-delete") {
      open(EditDeleteTaskModal, { uid: "Imodal!" });
    }
  };
</script>

<p>
  {#if modalType === "add"}
    <button on:click={showModal}>Add new Task</button>
  {:else}
    <button on:click={showModal}> ⚙️ </button>
  {/if}
</p>

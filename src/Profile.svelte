<script>
    export let displayName;
    export let photoURL;
    export let uid;
</script>

<div style="display: flex;">
    <img src={ photoURL } width="100" alt="user avatar">
    <h3>Bienvenido { displayName }!</h3>
</div>

<!-- <p>Your userID is { uid }</p> -->
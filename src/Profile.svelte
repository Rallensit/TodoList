<script>
  export let displayName;
  export let photoURL;
  export let uid;
</script>

<div id="frame">
  <div id="circle">
    <img src={photoURL} alt="user avatar" />
  </div>
  <h3>Welcome {displayName}!</h3>
</div>

<!-- <p>Your userID is { uid }</p> -->
<style>
  h3 {
    color: #ccc;
  }
  #frame {
    display: flex;
    margin-bottom: 10px;
  }
  #circle {
    border-color: #7e24f3;
    border-image: none;
    border-radius: 50% 50% 50% 50%;
    border-style: solid;
    border-width: 2px;
    height: 100px;
    width: 100px;
    overflow: hidden;
    margin-right: 10px;
  }
  img {
    width: 100%;
    height: 100%;
  }
</style>

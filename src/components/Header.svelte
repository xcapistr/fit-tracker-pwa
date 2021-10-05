<script>
  export let user
</script>

<div class="header">
  <div class="left">
    <pwa-install style="margin: 0 auto" />
  </div>
  <div class="center">
    <h1>FitTracker</h1>
  </div>
  <div class="right">
    <button class="profile">
      <img src={user?.photoURL} alt="profile" />
    </button>
  </div>
</div>

<style>
  .header {
    width: 100vw;
    height: 50px;
    position: fixed;
    background-color: #314fe6;
    display: flex;
    padding: 5px 10px;
    box-sizing: border-box;
    color: #fff;
    z-index: 50;
  }

  .center {
    flex: 1;
  }

  .left,
  .right {
    width: 50px;
  }
  .left {
    padding-top: 5px;
  }

  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: normal;
    line-height: 40px;
    text-align: center;
  }

  button.profile {
    height: 40px;
    width: 40px;
    margin: 0;
    border: none;
    outline: none;
    border-radius: 50%;
    background-color: transparent;
    overflow: hidden;
    padding: 0;
  }

  .profile > img {
    width: 40px;
    height: 40px;
  }

</style>

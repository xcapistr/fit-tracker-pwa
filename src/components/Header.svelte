<script>
</script>

<div class="header">
  <div class="left">
    <button>+</button>
  </div>
  <div class="center">
    <h1>FitTracker</h1>
  </div>
  <div class="right"><pwa-install style="margin: 0 auto" /></div>
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
  .right {
    padding-top: 5px;
  }

  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: normal;
    line-height: 40px;
    text-align: center;
  }

  button {
    height: 40px;
    width: 40px;
    line-height: 30px;
    font-size: 20px;
    padding: 5px;
    margin: 0;
    border: none;
    outline: none;
    border-radius: 50%;
    background-color: transparent;
    color: #fff;
  }

  button:active {
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>

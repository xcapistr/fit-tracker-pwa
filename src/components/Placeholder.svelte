<script>
  // your script goes here
</script>

<div class="wrapper">
  <div>
    <div class="dot" />
  </div>
  <div />
</div>

<style>
  @keyframes loading {
    from {
      opacity: 0.9;
    }
    to {
      opacity: 0.3;
    }
  }

  .wrapper {
    padding: 0 20px;
  }

  .wrapper > div {
    margin: 20px 0;
    width: 100%;
    height: 231px;
    background-color: #fff;
    border-radius: 20px;
    box-sizing: border-box;
    position: relative;
  }

  .wrapper > div:first-child {
    height: 391px;
    margin-bottom: 40px;
  }

  .wrapper > div:first-child > div {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: -20px;
    left: calc(50% - 20px);
    background-color: #fff;
    border-radius: 50%;
  }

  div {
      animation: loading 1s infinite alternate linear;
  }
</style>

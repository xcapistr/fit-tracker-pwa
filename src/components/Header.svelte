<script>
  import { fly } from 'svelte/transition'

  export let user
  export let isTableOpen
  export let goBack
</script>

<div class="header">
  <div class="left">
    {#if isTableOpen}
      <button
        class="back"
        on:click={goBack}
        in:fly={{ x: -40, delay: 300 }}
        out:fly={{ x: -40 }}
      >
        <img src="/images/icons/chevron-back-outline.svg" alt="back" />
      </button>
    {/if}

    <!-- <pwa-install style="margin: 0 auto" /> -->
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
    /* position: fixed; */
    background-color: #314fe6;
    display: flex;
    padding: 5px;
    box-sizing: border-box;
    color: #fff;
    z-index: 50;
  }

  .center {
    flex: 1;
  }

  .left,
  .right {
    width: 40px;
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
    margin: 0;
    border: none;
    outline: none;
    border-radius: 50%;
    background-color: transparent;
    overflow: hidden;
  }

  button.profile {
    padding: 0;
  }

  button.back {
    padding: 10px;
  }

  .profile > img {
    width: 40px;
    height: 40px;
  }

  .back > img {
    width: 20px;
    height: 20px;
  }
</style>

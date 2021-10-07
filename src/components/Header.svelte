<script>
  import { useNavigate } from 'svelte-navigator'
  import { fly, scale } from 'svelte/transition'
  import { user } from '../store'

  export let isTableOpen
  export let goBack

  const navigate = useNavigate()
</script>

<div class="header">
  <div class="left">
    {#if isTableOpen}
      <button
        class="back"
        on:click={goBack}
        in:fly={{ x: -40, delay: 400 }}
        out:fly={{ x: -40 }}
      >
        <img src="/images/icons/chevron-back-outline.svg" alt="back" />
      </button>
    {:else}
      <button
        class="back"
        on:click={goBack}
        out:scale
        in:scale={{ delay: 400 }}
      >
        <img src="/images/icons/calendar-outline.svg" alt="calendar" />
      </button>
    {/if}

    <!-- <pwa-install style="margin: 0 auto" /> -->
  </div>
  <div class="center">
    <h1>FitTracker</h1>
    <p>2020.01.01 - 2020.12.31</p>
  </div>
  <div class="right">
    <button class="profile" on:click={() => {$user = null; navigate('/login');}}>
      <img src={$user?.photoURL} alt="profile" />
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .left,
  .right {
    width: 40px;
  }

  h1 {
    margin: 0;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    padding: 0;
    outline: none;
  }

  p {
    margin: 0;
    font-size: 16px;
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

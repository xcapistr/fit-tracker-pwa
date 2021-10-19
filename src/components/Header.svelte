<script>
  import { router } from '../router.js'
  import { fly, scale } from 'svelte/transition'
  import { user, displayBackArrow } from '../store'

  router.afterEach((to, from) => {
     // displayBackArrow has to be in store otherwise it doesn't work after first sign in
     // afterEach hook was called but component doesn't rerender
    $displayBackArrow = to.name !== 'Home'
  })

  let isFilterApplied = false
</script>

<div class="header">
  <div class="left">
    {#if $displayBackArrow}
      <button
        class="back"
        on:click={() => router.back()}
        in:fly={{ x: -40, delay: 300 }}
        out:fly={{ x: -40 }}
      >
        <img src="/images/icons/chevron-back-outline.svg" alt="back" />
      </button>
    {:else}
      <button
        class="back"
        on:click={() => {
          isFilterApplied = !isFilterApplied
        }}
        out:scale
        in:scale={{ delay: 400 }}
      >
        <img src="/images/icons/calendar-outline.svg" alt="calendar" />
      </button>
    {/if}

    <!-- <pwa-install style="margin: 0 auto" /> -->
  </div>
  <div class="center">
    <h1 class:small={isFilterApplied}>FitTracker</h1>
    {#if isFilterApplied}
      <p transition:scale>2020.01.01 - 2020.12.31</p>
    {/if}
  </div>
  <div class="right">
    <button
      class="profile"
      on:click={() => {
        $user = null
        router.push('/login')
      }}
    >
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
    position: relative;
  }

  .left,
  .right {
    width: 40px;
  }

  h1 {
    position: absolute;
    margin: 0;
    font-size: 20px;
    font-weight: normal;
    padding: 0;
    top: 10px;
    width: 100%;
    outline: none;
    text-align: center;
    transition: transform 0.3s ease-out;
  }

  h1.small {
    transform: translateY(-12px) scale(0.7);
  }

  p {
    position: absolute;
    top: 18px;
    width: 100%;
    text-align: center;
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

<script>
  import { router } from '../router.js'
  import { fly, scale } from 'svelte/transition'
  import { displayBackArrow, filter } from '../store'
  import { getAuth, signOut } from 'firebase/auth'
  import EditDateFilter from './EditDateFilter.svelte'

  let isFilterOpened = false

  router.afterEach((to, from) => {
    // displayBackArrow has to be in store otherwise it doesn't work after first sign in
    // afterEach hook was called but component doesn't rerender
    $displayBackArrow = to.name !== 'Home'
  })

  const auth = getAuth()

  const userPhotoURL = getAuth().currentUser.photoURL

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        router.push('/login')
      })
      .catch(error => {
        // An error happened.
      })
  }

  $: datesDisplayed = ($filter.dateFrom || $filter.dateTo) && !isFilterOpened
</script>

<div class="wrapper">
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
            isFilterOpened = !isFilterOpened
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
      <h1 class:small={datesDisplayed && !$displayBackArrow}>FitTracker</h1>
      {#if datesDisplayed && !$displayBackArrow}
        <p transition:scale>{$filter.dateFrom || 'X'} - {$filter.dateTo || 'X'}</p>
      {/if}
    </div>
    <div class="right">
      <button class="profile" on:click={signOutUser}>
        <img src={userPhotoURL} alt="profile" />
      </button>
    </div>
  </div>
  {#if isFilterOpened}
    <EditDateFilter setIsFilterApplied={()=>{}}/>
  {/if}
</div>

<style>
  .wrapper {
    width: 100vw;
    z-index: 50;
  }
  .header {
    
    height: 50px;
    width: 100%;
    /* position: fixed; */
    background-color: #314fe6;
    display: flex;
    padding: 5px;
    box-sizing: border-box;
    color: #fff;
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

<script>
  import { router } from '../router.js'
  import { RouterOutlet } from 'svelte-easyroute'
  import { user, userData } from '../store'
  import Header from './Header.svelte'
  import ChartCard from './ChartCard.svelte'
  import Placeholder from './Placeholder.svelte'

  if ($user === null) {
    router.push('/login')
  }

  const getUserData = async (uid, accessToken) => {
    const authQuery = accessToken ? `?auth=${accessToken}` : ''
    const response = await fetch(
      `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json${authQuery}`
    )
    const data = await response.json()
    userData.reload(data)
  }

  if ($user) {
    getUserData($user?.uid, $user?.accessToken)
  }
</script>

<Header isTableOpen="false" goBack={() => {}} />
<div class="content-wrapper">
  {#if !$userData}
    <Placeholder />
  {:else}
    <!-- <CalendarFilter /> -->
    <ChartCard
      series={$userData.chartsData}
      height={300}
      name="All"
      showTable="true"
    />
    {#each $userData.chartsData as property}
      <ChartCard series={[property]} height={150} name={property.name} />
    {/each}
    <RouterOutlet />
  {/if}
</div>

<style>
  .content-wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    height: calc(100vh - 50px); /* Fallback for browsers that do not support Custom Properties */
    height: calc((var(--vh, 1vh) * 100) - 50px);
  }
</style>

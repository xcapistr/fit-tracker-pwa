<script>
  import { RouterOutlet } from 'svelte-easyroute'
  import { userData } from '../store'
  import Header from './Header.svelte'
  import ChartCard from './ChartCard.svelte'
  import Placeholder from './Placeholder.svelte'
  import { getAuth } from 'firebase/auth'

  let currentUser = getAuth().currentUser

  const createNewUser = async (uid, accessToken) => {
    const newData = {
      [uid]: {
        logs: {
          [(d => new Date(d.setDate(d.getDate() - 7)))(new Date())
            .toISOString()
            .split('T')[0]]: {
            weight: 50
          },
          [new Date().toISOString().split('T')[0]]: {
            weight: 49
          }
        },
        attributes: {
          weight: {
            color: '#314fe6',
            units: 'kg'
          }
        }
      }
    }
    await fetch(
      `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json?auth=${accessToken}`,
      {
        method: 'PUT',
        body: JSON.stringify(newData[uid])
      }
    )
    userData.reload(newData[uid])
  }

  const getUserData = async (uid, accessToken) => {
    const authQuery = accessToken ? `?auth=${accessToken}` : ''
    const response = await fetch(
      `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json${authQuery}`
    )
    const data = await response.json()

    if (response.ok && data === null) {
      createNewUser(uid, accessToken)
      return
    }
    userData.reload(data)
  }

  if (currentUser) {
    getUserData(currentUser.uid, currentUser.accessToken)
  }
</script>

<Header
  isTableOpen="false"
  toggleFilter={() => (isFilterOpened = !isFilterOpened)}
/>
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
    height: calc(
      100vh - 50px
    ); /* Fallback for browsers that do not support Custom Properties */
  }
</style>

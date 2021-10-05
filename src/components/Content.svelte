<script>
  import ChartCard from './ChartCard.svelte'

  export let user

  let userData = []

  const formatChartData = data => {
    return Object.keys(data).map(k => [
      {
        name: k,
        data: Object.keys(data[k].logs).map(l => [new Date(l), data[k].logs[l]]),
        color: data[k].color
      }
    ])
  }

  const getUserData = async (uid, accessToken) => {
    try {
      const authQuery = accessToken ? `?auth=${accessToken}` : ''
      const response = await fetch(
        `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json${authQuery}`
      )
      const data = await response.json()
      const formatedData = formatChartData(data.properties)
      userData = formatedData
    } catch (error) {
      throw new Error('Cannot load user data')
    }
  }

  getUserData(user.uid, user.accessToken)
</script>

<div class="content-wrapper">
  {#if userData.length == 0}
    loading...
  {:else}
    <ChartCard series={userData.map(d=>d[0])} height={300} name="All" />
    {#each userData as property}
      <ChartCard series={property} height={150} name={property[0].name} />
    {/each}
  {/if}
</div>

<style>
  .content-wrapper {
    padding: 60px 0 50px;
  }
</style>

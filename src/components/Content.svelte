<script>
  import Header from './Header.svelte'
  import ChartCard from './ChartCard.svelte'
  import CalendarFilter from './CalendarFilter.svelte'
  import Table from './Table.svelte'

  export let user

  let userData = []
  let isTableOpen = false

  const formatChartData = data => {
    return Object.keys(data).map(k => [
      {
        name: k,
        data: Object.keys(data[k].logs).map(l => [
          new Date(l),
          data[k].logs[l]
        ]),
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

<Header
  {user}
  {isTableOpen}
  goBack={() => {
    isTableOpen = false
  }}
/>
<div class="content-wrapper">
  {#if userData.length == 0}
    loading...
  {:else}
    <CalendarFilter />
    <ChartCard
      series={userData.map(d => d[0])}
      height={300}
      name="All"
      showTable={() => {
        isTableOpen = true
      }}
    />
    {#each userData as property}
      <ChartCard series={property} height={150} name={property[0].name} />
    {/each}
    {#if isTableOpen}
      <Table />
    {/if}
  {/if}
</div>

<style>
  .content-wrapper {
    height: calc(100vh - 50px);
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
  }
</style>

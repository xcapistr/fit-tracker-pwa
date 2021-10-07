<script>
  import { useNavigate } from 'svelte-navigator'
  import { user } from "../store";
  import Header from './Header.svelte'
  import ChartCard from './ChartCard.svelte'
  // import CalendarFilter from './CalendarFilter.svelte'
  import Table from './Table.svelte'
  import Placeholder from './Placeholder.svelte'

  const navigate = useNavigate()
  if ($user === null) {
    console.log('user is null');
    navigate('/login')
  }

  let userData = []
  let tableHead = []
  let tableData = []
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

  const formatTableData = data => {
    let columns = Object.keys(data)
    console.log('columns:', columns);
    const rowsObj = {}
    columns.forEach(prop => {
      Object.keys(data[prop].logs).forEach(date => {
        if (rowsObj[date]) {
          rowsObj[date][prop] = data[prop].logs[date]
        } else {
          rowsObj[date] = {[prop]: data[prop].logs[date]}
        }
      });
    });

    const rows = []

    Object.keys(rowsObj).forEach(date=>{
      rows.push([date])
      columns.forEach(c=>{
        rows[rows.length - 1].push(rowsObj[date][c] || '-')
      })
    })

    columns = ['date', ...columns]
    console.log('pred aha', [columns, rows]);
    return [columns, rows]
  }

  const getUserData = async (uid, accessToken) => {
    try {
      const authQuery = accessToken ? `?auth=${accessToken}` : ''
      const response = await fetch(
        `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json${authQuery}`
      )
      const data = await response.json()
      console.log('data', data);
      const formatedData = formatChartData(data.properties)
      const formatedTable = formatTableData(data.properties)
      tableHead = formatedTable[0]
      tableData = formatedTable[1]
      console.log('aha', tableHead, tableData);
      userData = formatedData
      console.log('userData', userData);
    } catch (error) {
      throw new Error('Cannot load user data')
    }
  }
  if ($user) {
    getUserData($user?.uid, $user?.accessToken)
  }  
</script>

<Header
  {isTableOpen}
  goBack={() => {
    isTableOpen = false
  }}
/>
<div class="content-wrapper">
  {#if userData.length == 0}
    <Placeholder />
  {:else}
    <!-- <CalendarFilter /> -->
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
      <Table {tableHead} {tableData}/>
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

<script>
  import { fly } from 'svelte/transition'
  import { RouterOutlet, RouterLink } from 'svelte-easyroute'
  import { userData } from '../store'
  import { router } from '../router'

  const getNewDate = () => {
    let newDate
    let i = 0
    do {
      newDate = (d => new Date(d.setDate(d.getDate() + i)))(new Date())
        .toISOString()
        .split('T')[0]
      i++
    } while (
      $userData.firebase.logs[newDate]
    )

    return newDate
  }

  const addRow = async () => {
    const newDate = getNewDate()

    userData.reload({
      ...$userData.firebase,
      logs: {
        ...$userData.firebase.logs,
        [newDate]: {}
      }
    })
  }
</script>

<div class="wrapper" transition:fly={{ y: window.screen.height, opacity: 100 }}>
  <table>
    <thead>
      <tr>
        {#each $userData.tableData.columns as column, i}
          <th>
            {#if i}
              <RouterLink to={`/table/edit-column/${column}`}
                >{column}</RouterLink
              >
            {:else}
              {column}
            {/if}
          </th>
        {/each}
        <th>
          <button
            class="add-button column"
            on:click={() => router.push('/table/add-column')}
          >
            <img src="/images/icons/add-column.svg" alt="add-column" />
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each $userData.tableData.rows as row}
        <tr>
          {#each row as d, i}
            <td>
              {#if i}
                <RouterLink
                  to={`/table/edit/${row[0]}/${$userData.tableData.columns[i]}`}
                  >{d || '-'}</RouterLink
                >
              {:else}
                <RouterLink to={`/table/edit-row/${d}`}>{d}</RouterLink>
              {/if}
            </td>
          {/each}
          <td />
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="bottom-panel">
    <button class="add-button row" on:click={addRow}>
      <img src="/images/icons/add-column.svg" alt="add-row" />
    </button>
  </div>

  <RouterOutlet />
</div>

<style>
  .wrapper {
    height: calc(100vh - 50px);
    overflow: scroll;
    box-sizing: border-box;
    position: absolute;
    top: 50px;
    z-index: 1;
    background-color: #fff;
    width: 100%;
  }

  table {
    min-width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    font-size: 14px;
  }

  th {
    background-color: #fff;
    padding: 10px;
    position: sticky;
    top: 0;
    box-shadow: inset 0 -1px 0 0 rgb(235, 233, 240);
  }

  th:last-child {
    right: 0;
    width: 40px;
    padding-right: 5px;
  }

  tr > td:first-child,
  tr > th:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
  }

  tr > td:first-child {
    z-index: 2;
    box-shadow: inset -1px 0 0 0 rgb(235, 233, 240);
  }

  tr > th:first-child {
    z-index: 3;
    box-shadow: inset -1px -1px 0 0 rgb(235, 233, 240);
  }

  td {
    padding: 10px;
    text-align: center;
  }

  tr:nth-child(2n) > td {
    background-color: #fff;
  }

  tr:not(:nth-child(2n)) > td {
    background-color: rgb(241, 240, 243);
  }

  .add-button {
    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    padding: 5px;
    margin: 0;
    border-radius: 50%;
  }

  .add-button > img {
    width: 30px;
    height: 30px;
  }

  .add-button.row {
    margin: 10px auto;
    width: 80px;
    padding: 5px 25px;
    border-radius: 20px;
  }

  .add-button.row > img {
    transform: rotate(90deg);
  }

  .bottom-panel {
    width: 100%;
    text-align: center;
    position: sticky;
    bottom: 0;
    border-top: 1px solid rgb(235 233 240);
    background-color: #fff;
    z-index: 3;
  }
</style>

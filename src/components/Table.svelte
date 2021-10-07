<script>
  import { fly } from 'svelte/transition'

  export let tableData
  export let tableHead
</script>

<div class="wrapper" transition:fly={{ y: window.screen.height, opacity: 100 }}>
  <table>
    <thead>
      <tr>
        {#each tableHead as h}
          <th>{h}</th>
        {/each}
        <th>
          <button class="add-button">
            <img src="/images/icons/add-outline.svg" alt="add" />
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each tableData as row}
        <tr>
          {#each row as d}
            <td>{d}</td>
          {/each}
          <td />
        </tr>
      {/each}
      <tr>
        <td>
          <button class="add-button">
            <img src="/images/icons/add-outline.svg" alt="add" />
          </button>
        </td>
        {#each tableHead as col}
          <td />
        {/each}
      </tr>
    </tbody>
  </table>
  <br />
  <br />
  <br />
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
  }

  tr > td:first-child,
  tr > th:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
  }

  tr:last-child > td {
    position: sticky;
    bottom: 0;
    background-color: #fff !important;
    box-shadow: inset 0 1px 0 0 rgb(235, 233, 240);
  }

  tr:not(:last-child) > td:first-child {
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
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 15px;
    outline: none;
    background-color: #999;
    padding: 5px;
    margin: 0;
  }

  .add-button > img {
    width: 20px;
    height: 20px;
  }
</style>

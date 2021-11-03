<script>
  import { slide } from 'svelte/transition'
  import { filter } from '../store'

  const setLastMonths = (count) => {
    const d = new Date()
    d.setMonth(d.getMonth() - count);
    $filter.dateFrom = d.toISOString().split('T')[0]
    $filter.dateTo = new Date().toISOString().split('T')[0]
  }

  const setLastYear = () => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 1);
    $filter.dateFrom = d.toISOString().split('T')[0]
    $filter.dateTo = new Date().toISOString().split('T')[0]
  }

  const removeFilter = () => {
    $filter.dateFrom = null
    $filter.dateTo = null
  }

</script>

<div class="wrapper" transition:slide>
  <div class="dates">
    <div class="date">
      <p>Date from</p>
      <input type="date" class="date-from" bind:value={$filter.dateFrom} min="1980-01-01" max="2070-01-01"/>
    </div>
    <div class="date">
      <p>Date to</p>
      <input type="date" class="date-to" bind:value={$filter.dateTo} min="1980-01-01" max="2070-01-01"/>
    </div>
    <button class="delete-button" on:click={removeFilter}>
      <img src="/images/icons/trash-outline.svg" alt="delete" />
    </button>
  </div>
  <div class="buttons">
    <button on:click={setLastYear}>Year</button>
    <button on:click={() => setLastMonths(6)}>6 months</button>
    <button on:click={() => setLastMonths(3)}>3 months</button>
    <button on:click={() => setLastMonths(1)}>1 month</button>
  </div>
</div>

<style>
  .wrapper {
    width: 100%;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
  }

  .dates {
    width: 100%;
    display: flex;
    align-items: flex-end;
    margin-bottom: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: 10px;
  }

  .date > p {
    margin: 0 0 5px;
  }

  input {
    margin: 0;
    max-width: calc(50vw - 50px);
    display: block;
    border-radius: 5px;
  }

  .delete-button {
    width: 40px;
    height: 40px;
    border: none;
    outline: none;
    padding: 10px;
    margin: 0;
    border-radius: 10px;
  }

  .delete-button > img {
    width: 20px;
    height: 20px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-size: 12px;
  }

  .buttons > button {
    flex: 1;
    margin: 0;
    background-color: rgb(63, 93, 192);
    color: #fff;
    border: none;
    border-radius: 5px;
  }
</style>

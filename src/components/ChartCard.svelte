<script>
  import { router } from '../router'
  import { chart } from 'svelte-apexcharts'
  import { filter } from '../store'
  
  export let name
  export let series
  export let height
  export let showTable

  // $ updates when series props are updated
  $: options = {
    series,
    markers: {
      size: 5
    },
    xaxis: {
      type: 'datetime',
      min: $filter.dateFrom ? new Date($filter.dateFrom).getTime() : null,
      max: $filter.dateTo ? new Date($filter.dateTo).getTime() : null
    },
    chart: {
      height,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      legend: {
        show: true
      }
    },
    legend: {
      show: true
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    }
  }
</script>

<div class="card" class:with-table={showTable}>
  <h2>{name}</h2>
  <div use:chart={options} />
  {#if showTable}
    <button class="show-table-btn" on:click={() => router.push('/table')}>
      <img src="/images/icons/table-outline.svg" alt="table" />
    </button>
  {/if}
</div>

<style>
  .card {
    background-color: #fff;
    border-radius: 20px;
    margin: 20px;
    max-width: 100%;
    padding: 20px 10px;
  }
  .card.with-table {
    margin-bottom: 40px;
    padding-bottom: 30px;
  }
  h2 {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
    margin: 10px 10px 0;
  }

  .show-table-btn {
    width: 40px;
    height: 40px;
    margin: 0;
    padding: 10px;
    border: none;
    border-radius: 20px;
    outline: none;
    background-color: rgb(63, 93, 192);
    position: absolute;
    bottom: -20px;
    left: calc(50% - 20px);
  }

  .show-table-btn > img {
    width: 20px;
    height: 20px;
  }
</style>

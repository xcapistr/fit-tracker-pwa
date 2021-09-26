<script>
  import { chart } from 'svelte-apexcharts'

  export let series
  export let height

  const options = {
    series,
    markers: {
      size: 5
    },
    xaxis: {
      type: 'datetime'
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

<div class="card">
  <h2>Weight vs Fat</h2>
  <div use:chart={options} />
</div>

<style>
  .card {
    background-color: #fff;
    border-radius: 20px;
    margin: 20px;
    max-width: 100%;
    padding: 20px 10px 10px;
  }
  h2 {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
    margin: 10px 10px 0;
  }
</style>

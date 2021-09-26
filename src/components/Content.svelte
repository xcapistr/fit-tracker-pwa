<script>
  import ChartCard from './ChartCard.svelte'
  import data from '../mock'
</script>

<div class="content-wrapper">
  <ChartCard
    series={data[0]}
    height={300}
  />
  <ChartCard
    series={data[1]}
    height={150}
  />
  <ChartCard
    series={data[2]}
    height={150}
  />
</div>

<style>
  .content-wrapper {
    padding: 60px 0 50px;
  }
</style>

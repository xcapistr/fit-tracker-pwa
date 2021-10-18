<script>
  import { EasyrouteProvider, RouterOutlet } from 'svelte-easyroute'
  import { router } from './router'
</script>

<main>
  <EasyrouteProvider {router}>
    <RouterOutlet />
  </EasyrouteProvider>
</main>

<style></style>

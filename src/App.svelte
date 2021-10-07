<script>
  import { Router, Route } from 'svelte-navigator'
  import Content from './components/Content.svelte'
  import Login from './components/Login.svelte'
</script>

<main>
  <Router>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/" primary>
      <Content />
    </Route>
  </Router>
</main>

<style></style>

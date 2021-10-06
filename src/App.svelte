<script>
  import Content from './components/Content.svelte'
  import Login from './components/Login.svelte'

  let user = {}

  const setUser = newUser => {
    user = { ...newUser }
  }
</script>

<main>
  {#if Object.keys(user).length == 0}
    <Login {setUser} />
  {:else}
    <Content {user} />
  {/if}
</main>

<style></style>

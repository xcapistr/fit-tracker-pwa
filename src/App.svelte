<script>
  import { EasyrouteProvider, RouterOutlet } from 'svelte-easyroute'
  import { router } from './router'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  // must be here for now (to establish db connection)
  import './db'
  import { push } from '@firebase/database'

  const currentUser = getAuth().currentUser

  if (currentUser) {
    router.push('/')
  } else {
    router.push('/login')
  }

  onAuthStateChanged(getAuth(), userInfo => {
    if (userInfo) {
      router.push('/')
    } else {
      push('/login')
    }
  })
</script>

<main>
  <EasyrouteProvider {router}>
    <RouterOutlet />
  </EasyrouteProvider>
</main>

<style></style>

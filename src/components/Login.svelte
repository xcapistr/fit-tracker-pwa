<script>
  import { user } from '../store'
  import { router } from '../router.js'
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithRedirect,
  } from 'firebase/auth'

  const googleLogIn = async () => {
    // https://firebase.google.com/docs/auth/web/google-signin
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/userinfo.email')
    await signInWithRedirect(getAuth(), provider)
  }
</script>

<div class="wrapper">
  <div class="card">
    <h2 class="title">Login</h2>
    <button on:click={googleLogIn} class="google-login-btn"
      >Login with Google</button
    >
  </div>
</div>

<style>
  .wrapper {
    width: 100vw;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }

  .card {
    background-color: #fff;
    border-radius: 20px;
    text-align: center;
    padding: 20px;
    margin: 30px auto 0;
    max-width: 400px;
  }

  .title {
    margin-top: 0;
    outline: none;
  }

  .google-login-btn {
    outline: none;
    border: none;
    border-radius: 20px;
    background-color: #314fe6;
    color: #fff;
    padding: 20px;
  }
</style>

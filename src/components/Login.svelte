<script>
  import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider
  } from 'firebase/auth'

  import db from '../db'

  export let setUser

  const googleLogIn = async () => {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/userinfo.email')
    const auth = getAuth()

    const signInResult = await signInWithPopup(auth, provider)
    const uid = signInResult.user.uid
    const credential = GoogleAuthProvider.credentialFromResult(signInResult)
    const token = signInResult.user.accessToken

    setUser({
        accessToken: signInResult.user.accessToken,
        uid: signInResult.user.uid,
        name: signInResult.user.displayName,
        photoURL: signInResult.user.photoURL
    })

    console.log({
        accessToken: signInResult.user.accessToken,
        uid: signInResult.user.uid,
        name: signInResult.user.displayName,
        photoURL: signInResult.user.photoURL
    });
  }

  // const logIn = () => {
  //   const auth = getAuth()
  //   const email = 'test@test.test'
  //   const password = '123456'
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(userCredential => {
  //       // Signed in
  //       user = userCredential.user
  //       console.log('user:', user)
  //     })
  //     .catch(error => {
  //       const errorCode = error.code
  //       const errorMessage = error.message
  //       console.log(errorMessage)
  //     })
  // }
</script>

<div class="wrapper">
  <div class="card">
    <h2 class="title">Login</h2>
    <button on:click={googleLogIn} class="google-login-btn">Login with Google</button>
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

<script>
  import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
  } from 'firebase/auth'
  import ChartCard from './ChartCard.svelte'
  import mock from '../mock'
  import db from '../db'

  let userData = []

  const formatChartData = data => {
    return Object.keys(data).map(k => [
      {
        name: k,
        data: Object.keys(data[k].logs).map(l => [new Date(l), data[k].logs[l]])
      }
    ])
  }

  const getUserData = async (uid, accessToken) => {
    try {
      const authQuery = accessToken ? `?auth=${accessToken}` : ''
      const response = await fetch(
        `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json${authQuery}`
      )
      const data = await response.json()
      const formatedData = formatChartData(data.properties)
      return formatedData
    } catch (error) {
      throw new Error('Cannot load user data')
    }
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

  const googleLogIn = async () => {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/userinfo.email')
    const auth = getAuth()

    const signInResult = await signInWithPopup(auth, provider)
    const uid = signInResult.user.uid
    const credential = GoogleAuthProvider.credentialFromResult(signInResult)
    const token = signInResult.user.accessToken
    userData = await getUserData(uid, token)
    console.log('userData:', userData)
  }
</script>

<div class="content-wrapper">
  {#if userData.length == 0}
    <ChartCard series={mock[0]} height={300} name="Weight vs Fat" />
    <ChartCard series={mock[1]} height={150} name="Weight" />
    <ChartCard series={mock[2]} height={150} name="Fat" />
  {:else}
    {#each userData as property}
      <ChartCard series={property} height={150} name={property[0].name} />
    {/each}
  {/if}
  <button on:click={googleLogIn}>Log-in with google</button>
  <button>Log-out</button>
</div>

<style>
  .content-wrapper {
    padding: 60px 0 50px;
  }
</style>

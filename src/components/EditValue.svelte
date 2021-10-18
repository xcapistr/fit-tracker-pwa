<script>
  import { router } from '../router'
  import { fly } from 'svelte/transition'
  import { user, userData } from '../store'

  const { date, attr } = router.currentRoute.params
  let value = date && attr ? $userData.firebase.logs[date][attr] : null

  const focus = el => {
    el.focus()
  }

  const save = async () => {
    const uid = $user?.uid
    const authQuery = $user?.accessToken ? `?auth=${$user.accessToken}` : ''
    userData.reload({
      ...$userData.firebase,
      logs: {
        ...$userData.firebase.logs,
        [date]: {
          ...$userData.firebase.logs[date],
          [attr]: value
        }
      }
    })
    router.back()
    await fetch(
      `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/logs/${date}.json${authQuery}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ [attr]: value })
      }
    )
  }
</script>

<div class="wrapper" transition:fly={{ y: 200, duration: 200 }}>
  <div class="label-row">
    <h2 class="prop-name" id="prop-name">{attr}</h2>
    <p class="date" id="date">{date}</p>
  </div>
  {#if attr === 'date'}
    <input type="date" bind:value aria-labelledby="date prop-name" use:focus />
  {:else}
    <input
      type="number"
      bind:value
      aria-labelledby="date prop-name"
      use:focus
    />
  {/if}
  <div class="btn-row">
    <button class="cancel" on:click={()=>router.back()}>Cancel</button>
    <button class="save" on:click={save}>Save</button>
  </div>
</div>

<style>
  .wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 4;
    padding: 20px;
  }

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .date {
    margin: 0;
  }

  .prop-name {
    margin: 0;
  }

  input {
    width: 100%;
    font-size: 24px;
    text-align: right;
    box-sizing: border-box;
  }

  .btn-row {
    width: 100%;
    display: flex;
  }

  button {
    flex: 1;
    margin: 0;
    height: 40px;
  }
</style>

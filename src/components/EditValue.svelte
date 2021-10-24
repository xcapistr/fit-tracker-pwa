<script>
  import { router } from '../router'
  import { fly } from 'svelte/transition'
  import { userData } from '../store'
  import { getAuth } from 'firebase/auth'
  import Button from './Button.svelte'

  const { date, attr } = router.currentRoute.params
  let value = date && attr ? $userData.firebase.logs[date][attr] : null

  const focus = el => {
    el.focus()
  }

  const save = async () => {
    const currentUser = getAuth().currentUser
    const uid = currentUser.uid
    const authQuery = `?auth=${currentUser.accessToken}`
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
    <p class="prop-name" id="prop-name">{attr}</p>
    <p class="date" id="date">{date}</p>
  </div>
  <input type="number" inputmode="decimal" bind:value aria-labelledby="date prop-name" use:focus/>
  <div class="btn-row">
    <Button
      on:click={()=>{value = null; save();}}
      label="Delete"
      variant="danger"
      class="button"
    />
    <Button on:click={save} label="Save" variant="success" class="button" />
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
    margin-bottom: 2px;
  }

  .date {
    margin: 0;
  }

  .prop-name {
    margin: 0;
  }

  input {
    width: 100%;
    font-size: 20px;
    text-align: right;
    box-sizing: border-box;
  }

  .btn-row {
    width: 100%;
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .btn-row > :global(.button) {
    flex: 1;
  }
</style>

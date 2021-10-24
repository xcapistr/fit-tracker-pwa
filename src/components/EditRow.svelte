<script>
  import { router } from '../router'
  import { fly } from 'svelte/transition'
  import { userData } from '../store'
  import { getAuth } from 'firebase/auth'
  import Button from './Button.svelte'

  const { date } = router.currentRoute.params
  let value = date || null

  let currentUser = getAuth().currentUser

  const focus = el => {
    el.focus()
  }

  const save = async () => {
    if (!$userData.firebase.logs[value]) {
      const newLogs = { ...$userData.firebase.logs }
      const updatedLog = { ...newLogs[date] }
      delete newLogs[date]
      newLogs[value] = updatedLog

      fetch(
        `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}/logs.json?auth=${currentUser.accessToken}`,
        {
          method: 'PUT',
          body: JSON.stringify(newLogs)
        }
      )
      userData.reload({
        ...$userData.firebase,
        logs: newLogs
      })
      router.back()
    }
  }

  const remove = async () => {
    const shouldRemove = confirm(
      `Do you realy want to delete all records with date ${date}?`
    )
    if (shouldRemove) {
      fetch(
        `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}/logs/${date}.json?auth=${currentUser.accessToken}`,
        {
          method: 'DELETE'
        }
      )
      const newLogs = { ...$userData.firebase.logs }
      delete newLogs[date]
      userData.reload({
        ...$userData.firebase,
        logs: newLogs
      })
      router.back()
    }
  }
</script>

<div class="wrapper" transition:fly={{ y: 200, duration: 200 }}>
  <div class="form-row">
    <div class="form-item">
      <p class="prop-name" id="prop-name">Date</p>
      <input type="date" bind:value use:focus />
    </div>
  </div>
  <div class="btn-row">
    <Button
      on:click={remove}
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

  .form-row {
    width: 100%;
    display: flex;
    gap: 10px;
  }

  .form-row > .form-item {
    flex: 1;
  }

  .prop-name {
    margin: 0;
  }

  input {
    text-align: right;
    width: 100%;
    font-size: 20px;
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

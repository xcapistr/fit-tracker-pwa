<script>
  import { router } from '../router'
  import { fly } from 'svelte/transition'
  import { userData } from '../store'
  import { getAuth } from 'firebase/auth'

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
  <div class="label-row">
    <h2 class="prop-name" id="prop-name">Date</h2>
    <button class="delete" on:click={remove}
      ><img
        src="/images/icons/trash-bin-outline.svg"
        alt="delete"
        title="Delete"
      /></button
    >
  </div>
  <input type="date" bind:value use:focus />
  <div class="btn-row">
    <button class="cancel" on:click={() => router.back()}>Cancel</button>
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

  .btn-row > button {
    flex: 1;
    margin: 0;
    height: 40px;
  }

  .delete {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 5px;
    margin: 0;
    border: none;
    background-color: transparent;
  }

  .delete > img {
    width: 30px;
    height: 30px;
  }
</style>

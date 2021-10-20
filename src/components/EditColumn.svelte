<script>
  import { router } from '../router'
  import { fly } from 'svelte/transition'
  import { userData } from '../store'
  import { getAuth } from 'firebase/auth'

  const { attribute } = router.currentRoute.params

  let currentUser = getAuth().currentUser

  let attributeName = attribute || ''
  let units = attributeName
    ? $userData.firebase.attributes[attribute].units
    : ''
  let color = attributeName
    ? $userData.firebase.attributes[attribute].color
    : ''

  const focus = el => {
    el.focus()
  }

  const save = async () => {
    const newAttributes = { ...$userData.firebase.attributes }

    if (attribute) {
      delete newAttributes[attribute]

      const newLogs = { ...$userData.firebase.logs }
      Object.keys(newLogs).forEach(d => {
        const newLog = newLogs[d][attribute]
        delete newLogs[d][attribute]
        newLogs[d][attributeName] = newLog
      })

      fetch(
        `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}/logs.json?auth=${currentUser.accessToken}`,
        {
          method: 'PUT',
          body: JSON.stringify(newLogs)
        }
      )
    }

    newAttributes[attributeName] = {
      units,
      color
    }

    fetch(
      `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}/attributes.json?auth=${currentUser.accessToken}`,
      {
        method: 'PUT',
        body: JSON.stringify(newAttributes)
      }
    )

    userData.reload({
      ...$userData.firebase,
      attributes: newAttributes
    })

    router.back()
  }

  const remove = async () => {
    const shouldRemove = confirm(
      `Do you realy want to delete attribute ${attribute}?`
    )
    if (shouldRemove) {
      fetch(
        `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}/attributes/${attribute}.json?auth=${currentUser.accessToken}`,
        {
          method: 'DELETE'
        }
      )

      const newAttributes = { ...$userData.firebase.attributes }
      delete newAttributes[attribute]

      const newLogs = { ...$userData.firebase.logs }
      Object.keys(newLogs).forEach(k => {
        delete newLogs[k][attribute]
        if (Object.keys(newLogs[k]).length === 0) {
          delete newLogs[k]
        }
      })

      fetch(
        `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.uid}/logs.json?auth=${currentUser.accessToken}`,
        {
          method: 'PUT',
          body: JSON.stringify(newLogs)
        }
      )

      userData.reload({
        ...$userData.firebase,
        logs: newLogs,
        attributes: newAttributes
      })
      router.back()
    }
  }
</script>

<div class="wrapper" transition:fly={{ y: 200, duration: 200 }}>
  <div class="label-row">
    <h2 class="prop-name" id="attr-name">Attribute name</h2>
    {#if attribute}
      <button class="delete" on:click={remove}
        ><img
          src="/images/icons/trash-bin-outline.svg"
          alt="delete"
          title="Delete"
        /></button
      >
    {/if}
  </div>
  <input
    type="text"
    bind:value={attributeName}
    aria-labelledby="attr-name"
    use:focus
  />
  <div class="label-row">
    <h2 class="prop-name" id="attr-units">Units</h2>
  </div>
  <input type="text" bind:value={units} aria-labelledby="attr-units" />
  <div class="label-row">
    <h2 class="prop-name" id="attr-color">Color</h2>
  </div>
  <input type="text" bind:value={color} aria-labelledby="attr-color" />
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

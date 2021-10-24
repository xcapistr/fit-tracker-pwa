<script>
  import { router } from '../router'
  import { fly } from 'svelte/transition'
  import { userData } from '../store'
  import { getAuth } from 'firebase/auth'
  import ColorPicker from './ColorPicker.svelte'
  import Button from './Button.svelte'

  const { attribute } = router.currentRoute.params

  let currentUser = getAuth().currentUser

  let attributeName = attribute || ''
  let units = attributeName
    ? $userData.firebase.attributes[attribute].units
    : ''
  let color = attributeName
    ? $userData.firebase.attributes[attribute].color
    : '#6740B4'

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
  <div class="form-row">
    <div class="form-item">
      <p class="prop-name" id="attr-name">Attribute name</p>
      <input
        type="text"
        bind:value={attributeName}
        aria-labelledby="attr-name"
        use:focus
        tabindex="0"
      />
    </div>
  </div>
  <div class="form-row">
    <div class="form-item">
      <p class="prop-name">Units</p>
      <input
        type="text"
        bind:value={units}
        aria-labelledby="attr-units"
        tabindex="0"
      />
    </div>
    <div class="form-item">
      <p class="prop-name">Color</p>
      <ColorPicker
        {color}
        setColor={c => {
          color = c
          console.log('new color', c)
        }}
      />
    </div>
  </div>
  <div class="btn-row">
    {#if attribute}
      <Button
        on:click={remove}
        label="Delete"
        variant="danger"
        class="button"
      />
    {/if}
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

  .prop-name {
    margin: 0;
  }

  input {
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

  .form-row {
    width: 100%;
    display: flex;
    gap: 10px;
  }

  .form-row > .form-item:first-child {
    flex: 1;
  }

  .form-row > .form-item:nth-child(2) {
    width: 70px;
  }
</style>

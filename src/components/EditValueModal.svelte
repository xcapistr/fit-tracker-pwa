<script>
  import { fly, fade } from 'svelte/transition'
  import { user } from '../store'

  export let property
  export let date
  export let originalValue
  export let close

  let value = originalValue

  const focus = el => {
    el.focus()
  }

  const save = async () => {
    const uid = $user?.uid
    const authQuery = $user?.accessToken ? `?auth=${$user.accessToken}` : ''
    if (value) {
      const response = await fetch(
        `https://fit-tracker-a6ff2-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/properties/${property}/logs.json${authQuery}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ [date]: value })
        }
      )
      console.log('response:', response)
    } else {
      // insert
    }

    close()
  }
</script>

<div class="wrapper" transition:fade={{ duration: 200 }}>
  <div class="modal" transition:fly={{ y: 200, duration: 200 }}>
    <p class="date" id="date">{date}</p>
    <h2 class="prop-name" id="prop-name">{property}</h2>
    <input
      type="number"
      bind:value
      aria-labelledby="date prop-name"
      use:focus
    />
    <div class="btn-row">
      <button class="cancel" on:click={close}>Cancel</button>
      <button class="save" on:click={save}>Save</button>
    </div>
  </div>
</div>

<style>
  .wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(50, 50, 100, 0.8);
    z-index: 4;
  }

  .modal {
    width: 300px;
    position: absolute;
    top: calc(50% - 111px);
    left: calc(50% - 150px);
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
  }

  .date {
    margin: 0;
  }

  .prop-name {
    margin: 10px 0 25px;
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

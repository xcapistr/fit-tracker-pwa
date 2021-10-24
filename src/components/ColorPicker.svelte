<script>
  export let color
  export let setColor

  const colors = [
    '#F2453D',
    '#E72565',
    '#9B2FAE',
    // '#6740B4',
    '#4154B3',
    '#2C98F0',
    '#1EABF1',
    '#1FBCD3',
    '#159688',
    '#50AE55',
    '#8DC252',
    '#CDDB49',
    '#FEEA4E',
    '#FDBF2F',
    '#FD9827',
    '#FD5830'
  ]

  let isOpen = false
</script>

<div class="wrapper">
  <div
    class="color-button"
    style="background-color: {color}"
    on:click={() => {
      isOpen = true
      console.log('open');
      
    }}
  />
  {#if isOpen}
    <div class="colors">
      {#each colors as c}
        <div
          class="color"
          id={`color-${c.substring(1)}`}
          style="background-color: {c}"
          on:click={() => {
            setColor(c)
            isOpen = false
          }}
        >
          {#if color === c}
            <img src="/images/icons/checkmark-outline.svg" alt="checkmark" />
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .wrapper {
    height: 41px;
    width: 100%;
    border-radius: 10px;
    position: relative;
  }

  .color-button {
    height: 41px;
    width: 100%;
    border-radius: 15px;
  }

  .colors {
    border: 1px solid #ccc;
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: #fff;
    position: absolute;
    top: 100%;
    right: 0;
    width: 200px;
    z-index: 1;
  }

  .color {
    width: 30px;
    height: 30px;
    margin: 5px;
    padding: 5px;
    border-radius: 50%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .color > img {
    width: 20px;
    height: 20px;
  }
</style>

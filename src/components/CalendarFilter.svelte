<script>
  let isOpen = false
</script>

<div class="wrapper">
  <div class="filter" class:open={isOpen}>
    <button on:click={()=>{isOpen = true}}>
      <img
        class="calendar-icon"
        src="/images/icons/calendar-outline.svg"
        alt="calendar"
      />
    </button>
    <p>1.1.2021 - now</p>
    <button on:click={()=>{isOpen = false}}>
      <img
        class="calendar-icon"
        src="/images/icons/close-outline.svg"
        alt="close"
      />
    </button>
  </div>
</div>

<style>
  .wrapper {
    width: clac(100% - 40px);
    margin: 20px;
    box-sizing: border-box;
  }

  .filter {
    background-color: #fff;
    border: 1px solid rgb(63, 93, 192);
    border-radius: 20px;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    color: rgb(63, 93, 192);
    display: flex;
    align-items: center;
    margin: 0 auto 0 0;
    overflow: hidden;
     transition: width 0.1s ease-out;
  }

  .filter.open {
    width: 100%;
  }

  .filter > p {
    font-size: 14px;
    line-height: 20px;
    margin: 10px 20px;
    flex: 1;
    text-align: center;
    white-space: nowrap;
    min-width: 100px;
  }

  .filter > button {
    outline: none;
    border: none;
    width: 40px;
    height: 40px;
    background-color: transparent;
    margin: 0;
    padding: 9px;
    border-radius: 20px;
  }

  .filter > button:active {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .calendar-icon {
    width: 20px;
    height: 20px;
  }
</style>

<script>
  export let label
  export let variant
</script>

<button
  on:click
  class:danger={variant === 'danger'}
  class:primary={variant === 'primary'}
  class:success={variant === 'success'}
  class={$$props.class}>{label}</button
>

<style>
  button {
    margin: 0;
    padding: 15px;
    border: none;
    outline: none;
    border-radius: 10px;
    height: 50px;
    background-color: rgb(219, 220, 224);
    color: #333;
    text-transform: uppercase;
    font-weight: bold;
  }

  .primary {
    background-color: #007bff;
    color: #fff;
  }

  .danger {
    background-color: #dc3545;
    color: #fff;
  }

  .success {
    background-color: #28a745;
    color: #fff;
  }
</style>

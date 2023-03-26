<script lang="ts">
  let a = 0
  let b = 0
  let total = 0
  let val = 'hello'
  async function add() {
    const response = await fetch('/api/add', {
      method: 'POST',
      body: JSON.stringify({ a, b }),
      headers: {
        'content-type': 'application/json',
      },
    })

    total = await response.json()
  }
</script>

<h1>{val}</h1>

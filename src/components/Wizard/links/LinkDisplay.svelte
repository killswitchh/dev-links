<script lang="ts">
  import type { Link } from '../../../core/models/link.dto';

  export let link: Link;
</script>

<div class="mt-2 w-[50%] h-[20%] bg-white rounded-xl">
  {link.id}
</div>

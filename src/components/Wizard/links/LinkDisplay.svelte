<script lang="ts">
  import type { Link } from '../../../core/models/link.dto';

  export let link: Link;
</script>

<div class="mt-2 w-[50%] h-[100px] min-h-full bg-white rounded-xl flex flex-col items-center">
  <div>ID: {link.id}</div>
  <div>url: {link.url}</div>
  <div>provider: {link.provider}</div>
  <div>enrich: {link.enrich}</div>
</div>

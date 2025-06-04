<script lang="ts">
	import { MehIcon } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { Label } from '../ui/label';
	import { Switch } from '../ui/switch';
</script>

<div class="p-5">
	<div class="flex items-center space-x-2">
		<Switch id="notify-me" />
		<Label for="notify-me" class="ms-4 text-xl"
			>Notify me when someone is looking for challengers</Label
		>
	</div>

	<div class="mt-10">
		<!--
        <Button class="w-full h-10 text-xl bg-orange-500 dark:bg-orange-500 hover:bg-orange-700 hover:dark:bg-orange-700"><MehIcon />This court is not usable</Button>
        -->
	</div>
</div>

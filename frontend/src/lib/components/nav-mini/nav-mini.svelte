<script>
	import LightSwitch from '../light-switch/light-switch.svelte';
	import * as NavigationMenu from '../ui/navigation-menu';
</script>

<div class="flex w-full justify-end">
	<NavigationMenu.Root class="p-4 pe-8">
		<NavigationMenu.List>
			<NavigationMenu.Item class="ms-auto">
				<LightSwitch />
			</NavigationMenu.Item>
		</NavigationMenu.List>
	</NavigationMenu.Root>
</div>

<script lang="ts">
	import ArmDumbbellIcon from './ArmDumbbellIcon.svelte';

	import BathtubIcon from './BathtubIcon.svelte';
	import BedIcon from './BedIcon.svelte';
	import BicycleIcon from './BicycleIcon.svelte';
	import BottleWineIcon from './BottleWineIcon.svelte';
	import BroomIcon from './BroomIcon.svelte';
	import CarWashingIcon from './CarWashingIcon.svelte';
	import DiningRoomIcon from './DiningRoomIcon.svelte';
	import GamepadIcon from './GamepadIcon.svelte';
	import GlassDrinksIcon from './GlassDrinksIcon.svelte';
	import HairWashingSinkIcon from './HairWashingSinkIcon.svelte';
	import LeisureIcon from './LeisureIcon.svelte';
	import PingPongIcon from './PingPongIcon.svelte';
	import ShowerIcon from './ShowerIcon.svelte';
	import SleepingInBedIcon from './SleepingInBedIcon.svelte';
	import SoupPlateIcon from './SoupPlateIcon.svelte';
	import StoveCookingPotIcon from './StoveCookingPotIcon.svelte';

	export type RoomIconName =
		| 'arm-dumbbell'
		| 'bathtub'
		| 'bed-2'
		| 'bicycle-3'
		| 'book-shelf'
		| 'bottle-wine'
		| 'broom'
		| 'car-washing'
		| 'dining-room'
		| 'gamepad'
		| 'glass-drinks'
		| 'hair-washing-sink'
		| 'kitchen-cabinets'
		| 'leisure'
		| 'ping-pong'
		| 'shower-2'
		| 'sleeping-in-bed'
		| 'sofa'
		| 'soup-plate'
		| 'stove-cooking-pot'
		| 'summer'
		| 'toilet-bowl'
		| 'washing-machine'
		| 'wing-chair';

	let {
		icon,
		className
	}: {
		className?: string;
		icon: RoomIconName;
	} = $props();
</script>

{#if icon === 'arm-dumbbell'}
	<ArmDumbbellIcon {className} />
{/if}
{#if icon === 'bathtub'}
	<BathtubIcon {className} />
{/if}
{#if icon === 'bed-2'}
	<BedIcon {className} />
{/if}
{#if icon === 'bicycle-3'}
	<BicycleIcon {className} />
{/if}
{#if icon === 'book-shelf'}
	<BottleWineIcon {className} />
{/if}
{#if icon === 'bottle-wine'}
	<BroomIcon {className} />
{/if}
{#if icon === 'broom'}
	<CarWashingIcon {className} />
{/if}
{#if icon === 'car-washing'}
	<CarWashingIcon {className} />
{/if}
{#if icon === 'dining-room'}
	<DiningRoomIcon {className} />
{/if}
{#if icon === 'gamepad'}
	<GamepadIcon {className} />
{/if}
{#if icon === 'glass-drinks'}
	<GlassDrinksIcon {className} />
{/if}
{#if icon === 'hair-washing-sink'}
	<HairWashingSinkIcon {className} />
{/if}
{#if icon === 'kitchen-cabinets'}
	<LeisureIcon {className} />
{/if}
{#if icon === 'leisure'}
	<PingPongIcon {className} />
{/if}
{#if icon === 'ping-pong'}
	<ShowerIcon {className} />
{/if}
{#if icon === 'shower-2'}
	<ShowerIcon {className} />
{/if}
{#if icon === 'sleeping-in-bed'}
	<SleepingInBedIcon {className} />
{/if}
{#if icon === 'sofa'}{/if}
{#if icon === 'soup-plate'}
	<SoupPlateIcon {className} />
{/if}
{#if icon === 'stove-cooking-pot'}
	<StoveCookingPotIcon {className} />
{/if}
{#if icon === 'summer'}{/if}
{#if icon === 'toilet-bowl'}{/if}
{#if icon === 'washing-machine'}{/if}
{#if icon === 'wing-chair'}{/if}

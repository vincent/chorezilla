<script lang="ts">
	let { isDropdownOpen = $bindable(false), button, menu } = $props();

	const handleDropdownClick = () => {
		isDropdownOpen = !isDropdownOpen;
	};

	const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }: FocusEvent) => {
		// use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
		if (relatedTarget instanceof HTMLElement && (currentTarget as Node)?.contains(relatedTarget))
			return; // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
		isDropdownOpen = false;
	};
</script>

<div class="flex justify-between items-center">
	<div class="dropdown" onfocusout={handleDropdownFocusLoss}>
		<button class="btn m-1" onclick={handleDropdownClick}>
			{@render button?.()}
		</button>
		<ul
			class="dropdown-content menu p-2 shadow bg-base-100 rounded-box bg-white dark:bg-gray-900 w-52"
			style:visibility={isDropdownOpen ? 'visible' : 'hidden'}
		>
			{@render menu?.()}
		</ul>
	</div>
</div>

<style>
	.dropdown {
		display: inline-block;
		position: relative;
	}

	.dropdown > :focus {
		outline-offset: 2px;
		outline: 2px solid #0000;
	}

	.dropdown .dropdown-content {
		visibility: hidden;
		z-index: 50;
		opacity: 0;
		transform-origin: top;
		--tw-scale-x: 0.95;
		--tw-scale-y: 0.95;
		transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))
			skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
			scaleY(var(--tw-scale-y));
		transition-property:
			color,
			background-color,
			border-color,
			-webkit-text-decoration-color,
			text-decoration-color,
			fill,
			stroke,
			opacity,
			box-shadow,
			transform,
			filter,
			backdrop-filter,
			-webkit-text-decoration-color,
			-webkit-backdrop-filter;
		transition-duration: 0.2s;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		position: absolute;
	}

	.dropdown-end .dropdown-content {
		right: 0;
	}

	.dropdown-left .dropdown-content {
		transform-origin: 100%;
		top: 0;
		bottom: auto;
		right: 100%;
	}

	.dropdown-right .dropdown-content {
		transform-origin: 0;
		top: 0;
		bottom: auto;
		left: 100%;
	}

	.dropdown-top .dropdown-content {
		transform-origin: bottom;
		top: auto;
		bottom: 100%;
	}

	.dropdown-end.dropdown-right .dropdown-content,
	.dropdown-end.dropdown-left .dropdown-content {
		top: auto;
		bottom: 0;
	}

	.dropdown.dropdown-open .dropdown-content,
	.dropdown.dropdown-hover:hover .dropdown-content,
	.dropdown:not(.dropdown-hover):focus .dropdown-content,
	.dropdown:not(.dropdown-hover):focus-within .dropdown-content {
		visibility: visible;
		opacity: 1;
	}
</style>

<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { members } from '$lib/stores/members';
	import { Search, User, UserPlus } from '@lucide/svelte';

	members.loadCollection();

	let filter = $state('')
	let filteredPeople = $derived(
		$members.filter(r => !filter
			|| r.name.toLowerCase().includes(filter)
			|| r.role?.toLowerCase().includes(filter)))
</script>

<svelte:head>
	<title>ChoreZilla | Members</title>
</svelte:head>

<!-- Main Content -->
<main class="container mx-auto px-4 py-6">

	<!-- Search Bar -->
	<div class="relative mb-6">
		<input
			type="text"
			placeholder="Search members..."
			class="w-full pl-10 pr-4 py-2 rounded-lg dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800"
			bind:value={filter}
		>
		<Search class="absolute left-3 top-2.5 text-gray-400"/>
	</div>

	<!-- People List -->
	<div class="space-y-4">
		{#each filteredPeople as person (person.userId)}
			<Card
				title={person.name}
				href={`/members/${person.userId}/edit`}
				subtitle={`${person.role ?? 'Roommate'} • ${person.choresCompleted ?? 0} chores completed`}
			>
				{#snippet icon()}
					<div class={`p-3 rounded-full bg-${person.avatarColor}-100 text-${person.avatarColor}-600`}>
						<User/>
					</div>
				{/snippet}
			</Card>
		{/each}

		{#if filteredPeople.length === 0}
			<p class="text-center text-gray-500">No members found.</p>
		{/if}

		<!-- Add New Person -->
		<a
			href="/members/invite"
			class="person-card border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-indigo-300 transition-colors"
		>
			<div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
				<UserPlus class="text-indigo-600"/>
			</div>
			<h3 class="font-medium text-gray-800 dark:text-white">Add new person</h3>
			<p class="text-sm text-gray-500">Invite someone to your household</p>
		</a>
	</div>
</main>

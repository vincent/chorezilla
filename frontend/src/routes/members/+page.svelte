<script lang="ts">
	import { Search, User, UserCog, UserPlus } from '@lucide/svelte';
	import Card from '$lib/components/Card.svelte';
	import { invites } from '$lib/stores/invites';
	import { members } from '$lib/stores/members';
	import { isAdmin } from '$lib/stores/auth';

	members.loadCollection();
	invites.loadCollection();

	let filter = $state('');
	let filteredPeople = $derived(
		$members.filter(
			(r) =>
				!filter || r.name.toLowerCase().includes(filter) || r.role?.toLowerCase().includes(filter)
		)
	);
	let filteredInvites = $derived(
		$invites.filter(
			(r) =>
				!filter || r.name.toLowerCase().includes(filter) || r.role?.toLowerCase().includes(filter)
		)
	);
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
		/>
		<Search class="absolute left-3 top-2.5 text-gray-400" />
	</div>

	<!-- People List -->
	<div class="space-y-4">
		{#each filteredPeople as person (person.userId)}
			<Card
				title={person.name}
				href={`/members/${person.userId}/edit`}
				subtitle={`${person.role || 'Unknown'} • ${person.choresCompleted ?? 0} chores completed`}
			>
				{#snippet icon()}
					<User class="text-gray-200" />
				{/snippet}
			</Card>
		{/each}

		{#if filteredPeople.length === 0}
			<p class="text-center text-gray-500">No members found.</p>
		{/if}

		{#each filteredInvites as person (person.id)}
			<Card
				title={person.name}
				href="/members"
				subtitle={`${person.role || 'Unknown'} • ${person.status}`}
			>
				{#snippet icon()}
					<UserCog class="text-gray-200" />
				{/snippet}
			</Card>
		{/each}

		{#if $isAdmin}
			<a
				href="/members/invite"
				class="person-card border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-indigo-300 transition-colors"
			>
				<div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
					<UserPlus class="text-indigo-600" />
				</div>
				<h3 class="font-medium text-gray-800 dark:text-white">Add new person</h3>
				<p class="text-sm text-gray-500">Invite someone to your household</p>
			</a>
		{/if}
	</div>
</main>

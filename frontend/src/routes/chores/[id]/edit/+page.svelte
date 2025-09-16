<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { chores } from '$lib/stores/chores';
	import { type Chore } from '$lib/models/chore.svelte';
  import ChoreForm from '$lib/components/ChoreForm.svelte';
	import Title from '$lib/components/Title.svelte';
	import { members } from '$lib/stores/members';
	import { rooms } from '$lib/stores/rooms';
	import type { ChoresRecord } from '$lib/pocketbase/generated-types';
	import { Trash } from '@lucide/svelte';

  let id = '';
  let initial = null as ChoresRecord | null;

  onMount(() => {
    id = String(page.params.id)

    Promise
      .all([
        chores.loadCollection(),
        members.loadCollection(),
        rooms.loadCollection(),
      ])
      .then(() => {
        const chore = chores.findChore(id);
        if (chore) {
          initial = {
            id: chore.id ?? '',
            name: chore.name ?? '',
            room: chore.room ?? '',
            icon: chore.icon ?? '',
            frequency: chore.frequency ?? '',
            household: chore.household ?? '',
            created_by: chore.created_by ?? '',
            description: chore.description ?? '',
            assigned_users: chore.assigned_users ?? []
          };
        }
      })

	})

  function handleEdit(data: ChoresRecord) {
    chores.updateChore({ ...data, id }).then(() => goto(`/chores/${id}`));
  }

  function handleDelete() {
    chores.removeChore(id).then(() => goto('/'));
  }
</script>

<svelte:head>
	<title>ChoreZilla | Edit Chore</title>
</svelte:head>

<main class="container mx-auto px-4 py-6">
  <Title title="Edit Chore" />
  {#if initial}
    <ChoreForm
      {initial}
      submitLabel="Save Changes"
      onSubmit={handleEdit}
    >
			{#snippet otherButtons()}
				<button
					type="button"
          onclick={handleDelete}
					class="me-8 mt-2 p-3 rounded-lg border-red-300 bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-colors"
				><Trash/></button>
			{/snippet}
    </ChoreForm>
  {:else}
		<section class="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
			<h1 class="text-xl font-bold text-gray-800">Chore not found</h1>
			<p class="text-gray-500">No details available for this chore.</p>
		</section>
  {/if}
</main>

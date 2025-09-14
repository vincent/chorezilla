<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { chores } from '$lib/stores/chores';
	import { type Chore } from '$lib/models/chore.svelte';
  import ChoreForm from '$lib/components/ChoreForm.svelte';
	import Title from '$lib/components/Title.svelte';

  let id = '';
  let initial = null as Chore | null;

  onMount(() => {
    if (!page.params.id) return;
    const chore = chores.findChore(page.params.id);
    if (chore) {
      initial = {
        id: chore.id ?? '',
        title: chore.title ?? '',
        roomId: chore.roomId ?? '',
        location: chore.location ?? '',
        due: chore.due ?? '',
        description: chore.description ?? '',
        icon: chore.icon ?? '',
        iconBg: chore.iconBg ?? '',
        iconColor: chore.iconColor ?? ''
      };
    }
  });

  function handleEdit(event: CustomEvent) {
    chores.updateChore({ ...event.detail });
    goto(`/chores/${id}`);
  }
</script>

<svelte:head>
	<title>Edit Chore</title>
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
					class="me-8 mt-2 p-3 rounded-lg border-red-300 bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-colors"
				>Delete chore</button>
			{/snippet}
    </ChoreForm>
  {/if}
</main>

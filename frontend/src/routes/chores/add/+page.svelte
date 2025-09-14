<script lang="ts">
  import { goto } from '$app/navigation';
  import { chores } from '$lib/stores/chores';
  import ChoreForm from '$lib/components/ChoreForm.svelte';
	import { type Chore } from '$lib/models/chore.svelte';
	import Title from '$lib/components/Title.svelte';

  function handleAdd(event: CustomEvent<Chore>) {
    const { title, roomId, due, description, icon, iconBg, iconColor } = event.detail;
    const newChore = {
      id: Date.now().toString(),
      title,
      roomId,
      due,
      description,
      icon,
      iconBg,
      iconColor,
      location: '',
    };
    chores.addChore(newChore);
    goto('/chores');
  }
</script>

<svelte:head>
	<title>Add Chore</title>
</svelte:head>

<main class="container mx-auto px-4 py-6">
  <Title title="Add a new Chore"/>
  <ChoreForm
    submitLabel="Add Chore"
    onSubmit={handleAdd}
  />
</main>

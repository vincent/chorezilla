<script lang="ts">
  import PersonForm from '$lib/components/PersonForm.svelte';
  import { members, type Person } from '$lib/stores/members';
	import Title from '$lib/components/Title.svelte';
  import { goto } from '$app/navigation';

  function handleSubmit(event: CustomEvent<Omit<Person, 'id'>>) {
    const person = event.detail;
    const id = Date.now().toString();
    members.addPerson(person);
    goto('/members');
  }
</script>

<svelte:head>
  <title>ChoreZilla | Add member</title>
</svelte:head>

<main class="container mx-auto px-4 py-6">
	<Title title="Invite a new member"/>
  <PersonForm
    useEmail
    initial={{ name: '', role: '', choresCompleted: 0, avatarColor: '' }}
    submitLabel="Invite"
    onSubmit={handleSubmit}
  />
</main>

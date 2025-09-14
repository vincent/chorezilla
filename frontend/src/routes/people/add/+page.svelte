<script lang="ts">
  import PersonForm from '$lib/components/PersonForm.svelte';
  import { people, type Person } from '$lib/stores/people';
	import Title from '$lib/components/Title.svelte';
  import { goto } from '$app/navigation';

  function handleSubmit(event: CustomEvent<Omit<Person, 'id'>>) {
    const person = event.detail;
    const id = Date.now().toString();
    people.addPerson({ ...person, id });
    goto('/people');
  }
</script>

<main class="container mx-auto px-4 py-6">
	<Title title="Add a new person"/>
  <PersonForm
    initial={{ name: '', role: '', choresCompleted: 0, avatarColor: '' }}
    submitLabel="Add Person"
    onSubmit={handleSubmit}
  />
</main>

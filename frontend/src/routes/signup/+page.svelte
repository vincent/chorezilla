<script lang="ts">
  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';
  let success = '';

  function handleSubmit(event: Event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      error = "Passwords do not match.";
      return;
    }
    // TODO: Implement signup logic (API call)
    success = "Signup successful! (Not yet implemented)";
    error = '';
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
  <form class="bg-white p-8 rounded shadow-md w-full max-w-md" on:submit|preventDefault={handleSubmit}>
    <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
    {#if error}
      <div class="mb-4 text-red-600">{error}</div>
    {/if}
    {#if success}
      <div class="mb-4 text-green-600">{success}</div>
    {/if}
    <div class="mb-4">
      <label class="block mb-1 font-medium" for="name">Name</label>
      <input class="w-full border rounded px-3 py-2" id="name" type="text" bind:value={name} required />
    </div>
    <div class="mb-4">
      <label class="block mb-1 font-medium" for="email">Email</label>
      <input class="w-full border rounded px-3 py-2" id="email" type="email" bind:value={email} required />
    </div>
    <div class="mb-4">
      <label class="block mb-1 font-medium" for="password">Password</label>
      <input class="w-full border rounded px-3 py-2" id="password" type="password" bind:value={password} required />
    </div>
    <div class="mb-6">
      <label class="block mb-1 font-medium" for="confirmPassword">Confirm Password</label>
      <input class="w-full border rounded px-3 py-2" id="confirmPassword" type="password" bind:value={confirmPassword} required />
    </div>
    <button class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition" type="submit">
      Sign Up
    </button>
    <p class="mt-4 text-center text-sm">
      Already have an account?
      <a href="/login" class="text-indigo-600 hover:underline">Log in</a>
    </p>
  </form>
</div>

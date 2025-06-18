<script lang="ts">
	import FormWrapper from '$lib/components/FormWrapper/FormWrapper.svelte';
	import NumberInput from '$lib/components/NumberInput/NumberInput.svelte';
	import ActionButton from '$lib/components/Button/Button.svelte';

	let employeeCount = '350';
	let isSubmitting = false;

	async function handleCreateEmployees() {
		if (!employeeCount || parseInt(employeeCount) <= 0) {
			alert('Bitte geben Sie eine gültige Anzahl ein.');
			return;
		}

		isSubmitting = true;

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			console.log(`Creating ${employeeCount} employees...`);
			alert(`${employeeCount} Mitarbeiter wurden erfolgreich angelegt!`);

			// Reset form
			employeeCount = '';
		} catch (error) {
			console.error('Error creating employees:', error);
			alert('Fehler beim Anlegen der Mitarbeiter. Bitte versuchen Sie es erneut.');
		} finally {
			isSubmitting = false;
		}
	}

	function handleInputChange(event: Event) {
		const target = event.target as HTMLInputElement;
		employeeCount = target.value;
	}

	console.log({ isSubmitting });
</script>

<FormWrapper title="Anzahl der Mitarbeiter die angelegt werden">
	<NumberInput
		bind:value={employeeCount}
		placeholder="Anzahl eingeben"
		disabled={isSubmitting}
		on:change={handleInputChange}
	/>

	<ActionButton
		variant="primary"
		loading={isSubmitting}
		disabled={!employeeCount || isSubmitting}
		on:click={handleCreateEmployees}
	>
		Mitarbeiter anlegen
	</ActionButton>
</FormWrapper>

<script lang="ts">
	import FormWrapper from '$lib/components/FormWrapper/FormWrapper.svelte';
	import NumberInput from '$lib/components/NumberInput/NumberInput.svelte';
	import ActionButton from '$lib/components/Button/Button.svelte';
	import { generateEmployeeList } from '$lib/utils/randomData';
	import { api } from '$lib/api/api';
	import type { BulkImportEmployeeResponse } from '$lib/types/employee';
	import { jobId } from '$lib/stores/bulkJob';

	let employeeCount = '350';
	let isSubmitting = false;

	async function handleCreateEmployees() {
		if (!employeeCount || +employeeCount <= 0) {
			alert('Bitte geben Sie eine gültige Anzahl ein.');
			return;
		}

		isSubmitting = true;

		try {
			const data = await api<Record<'buildImport', Awaited<BulkImportEmployeeResponse>>>(
				'/api/employee/bulk-import',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ employees: generateEmployeeList(+employeeCount) })
				}
			);
			jobId.set(data?.buildImport?.id);
			employeeCount = '';
		} catch (error) {
			console.error('Error creating employees:', error);
			alert('Fehler beim Anlegen der Mitarbeiter. Bitte versuchen Sie es erneut.');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<FormWrapper title="Anzahl der Mitarbeiter die angelegt werden">
	<NumberInput bind:value={employeeCount} placeholder="Anzahl eingeben" disabled={isSubmitting} />

	<ActionButton
		variant="primary"
		loading={isSubmitting}
		disabled={!employeeCount || isSubmitting}
		on:click={handleCreateEmployees}
	>
		Mitarbeiter anlegen
	</ActionButton>
</FormWrapper>

<script lang="ts">
	import FormWrapper from '$lib/components/FormWrapper/FormWrapper.svelte';
	import NumberInput from '$lib/components/NumberInput/NumberInput.svelte';
	import ActionButton from '$lib/components/Button/Button.svelte';
	import StatusPanel from '$lib/components/StatusPanel/StatusPanel.svelte';
	import { generateEmployeeList } from '$lib/utils/randomData';
	import { api } from '$lib/api/api';
	import type { BulkImportEmployeeResponse, ImportStatus } from '$lib/types/employee';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let employeeCount = '350';
	let isSubmitting = false;
	const MIN_EMPLOYEE_COUNT = 350;

	const statusInfo = writable<ImportStatus | null>(null);
	let showStatusPanel = false;

	async function handleCreateEmployees() {
		if (!employeeCount || +employeeCount < MIN_EMPLOYEE_COUNT) {
			return;
		}

		isSubmitting = true;
		showStatusPanel = true;

		try {
			await api<Record<'buildImport', Awaited<BulkImportEmployeeResponse>>>(
				'/api/employee/bulk-import',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ employees: generateEmployeeList(+employeeCount) })
				}
			);
			employeeCount = '';
			await getBulkStatus();
		} catch (error) {
			console.error('Error creating employees:', error);
			alert('Fehler beim Anlegen der Mitarbeiter. Bitte versuchen Sie es erneut.');
		} finally {
			isSubmitting = false;
		}
	}

	async function getBulkStatus() {
		try {
			const resp = await api<Record<'data', ImportStatus>>('/api/employee/bulk-import', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (resp?.data) {
				statusInfo.set(resp.data);
			}
		} catch (error) {
			console.error('Error getting bulk status:', error);
			console.error('Status check failed:', error);
		}
	}

	let statusInterval: number;

	onMount(() => {
		getBulkStatus().then(() => {
			if ($statusInfo) {
				showStatusPanel = true;
			}
		});

		statusInterval = setInterval(getBulkStatus, 5000) as unknown as number;

		return () => {
			clearInterval(statusInterval);
		};
	});
</script>

<FormWrapper title="Anzahl der Mitarbeiter die angelegt werden">
	<div>
		<NumberInput bind:value={employeeCount} placeholder="Anzahl eingeben" disabled={isSubmitting} />
	</div>

	<div class="button-container">
		<ActionButton
			variant="primary"
			loading={isSubmitting}
			disabled={!employeeCount || +employeeCount < MIN_EMPLOYEE_COUNT || isSubmitting}
			on:click={handleCreateEmployees}
		>
			Mitarbeiter anlegen
		</ActionButton>
		{#if +employeeCount < MIN_EMPLOYEE_COUNT && employeeCount !== ''}
			<div class="tooltip">
				Die Anzahl der Mitarbeiter muss mindestens {MIN_EMPLOYEE_COUNT} betragen.
			</div>
		{/if}
	</div>
	{#if showStatusPanel && $statusInfo}
		<StatusPanel status={$statusInfo} />
	{/if}
</FormWrapper>

<style lang="scss">
	.button-container {
		position: relative;
		display: inline-block;

		&:hover .tooltip {
			visibility: visible;
			opacity: 1;
		}
	}

	.tooltip {
		visibility: hidden;
		position: absolute;
		z-index: 1;
		bottom: 125%;
		left: 50%;
		transform: translateX(-50%);
		width: 200px;
		background-color: #ecefec;
		color: #6b716a;
		text-align: center;
		border-radius: 8px;
		padding: 5px;
		font-size: 12px;
		opacity: 0;
		transition: opacity 0.3s;

		&::after {
			content: '';
			position: absolute;
			top: 100%;
			left: 50%;
			margin-left: -5px;
			border-width: 5px;
			border-style: solid;
			border-color: #333 transparent transparent transparent;
		}
	}
</style>

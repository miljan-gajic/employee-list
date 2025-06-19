<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import EmployeeForm from '$lib/components/EmployeeForm/EmployeeForm.svelte';
	import NavBar from '$lib/components/NavBar/NavBar.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { writable } from 'svelte/store';
	import { api } from '$lib/api/api';
	import { onMount } from 'svelte';
	import type { EmployeeListResponse, MappedEmployeeDataSource } from '$lib/types/employee';
	import { mapEmployeeResponseToDataSource } from '$lib/utils/mappers';
	import Logo from '$lib/components/Logo/Logo.svelte';

	let error: Error = new Error('');
	const loadingBtn = writable(false);
	const loadingDataSource = writable(false);
	const dataSource = writable<MappedEmployeeDataSource[]>([]);
	const totalEntries = writable(0);

	const limit = 50;
	let allDataLoaded = false;

	let offset: number = 0;

	async function handleLogout() {
		try {
			loadingBtn.set(true);
			await api('/api/auth/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch (err) {
			error.message = (err as Error).message || 'Sign out failed. Please try again.';
		} finally {
			loadingBtn.set(false);
		}
	}

	async function getEmployeeList() {
		if (allDataLoaded) return;
		loadingDataSource.set(true);

		try {
			const response = await api<EmployeeListResponse>(
				`/api/employee/employee-list?limit=${limit}&offset=${offset}`
			);
			console.log({ response });
			const newEmployees = mapEmployeeResponseToDataSource(response?.data?.rows);

			if (newEmployees.length === 0) {
				allDataLoaded = true;
			} else {
				dataSource.update((current) => [...current, ...newEmployees]);
				totalEntries.set(response.data.total);
				offset = offset + limit;
			}
		} catch (err) {
			error.message = (err as Error).message || 'Failed to fetch employee list. Please try again.';
		} finally {
			loadingDataSource.set(false);
		}
	}

	function handleScroll(event: Event) {
		const target = event.target as HTMLElement;

		if (
			target.scrollTop + target.clientHeight >= target.scrollHeight &&
			!$loadingDataSource &&
			!allDataLoaded
		) {
			getEmployeeList();
		}
	}

	onMount(() => {
		getEmployeeList();
	});
</script>

<NavBar>
	<Logo />
	<Button
		size="small"
		type="button"
		variant="primary"
		bind:loading={$loadingBtn}
		disabled={$loadingBtn}
		on:click={handleLogout}>Abmelden</Button
	>
</NavBar>
<EmployeeForm />
<Table
	showFooter
	data={$dataSource}
	{handleScroll}
	itemsPerPage={$dataSource.length}
	totalEntries={$totalEntries}
	loading={$loadingDataSource}
/>

<script lang="ts">
	import _ from 'lodash';

	import type { MappedEmployeeDataSource } from '$lib/types/employee';

	export let data: MappedEmployeeDataSource[] = [];
	export let handleScroll: (event: Event) => void;
	export let loading: boolean = false;
	export let totalEntries: number = 0;
	export let itemsPerPage: number = 0;

	export let columns = [
		{ key: 'id', label: 'Personalnummer' },
		{ key: 'firstName', label: 'Vorname' },
		{ key: 'lastName', label: 'Nachname' },
		{ key: 'status', label: 'Aktiv' },
		{ key: 'created', label: 'Erstellt' }
	];

	export let showFooter = true;

	$: displayedItems = Math.min(itemsPerPage, totalEntries);
	$: footerText = `${displayedItems} geladen von ${totalEntries} Ergebnissen`;
</script>

<div class="data-table-container">
	<div class="table-wrapper" on:scroll={handleScroll}>
		{#if loading || !data.length}
			<div class="spinner"></div>
		{:else}
			<table class="data-table">
				<thead>
					<tr>
						{#each columns as column (column.key)}
							<th class="table-header">
								{column.label}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each data as row (row.personalNumber)}
						<tr class="table-row" class:odd={data.indexOf(row) % 2 === 1}>
							<td class="table-cell">{row.personalNumber}</td>
							<td class="table-cell">{row.firstName}</td>
							<td class="table-cell">{row.lastName}</td>
							<td class="table-cell">
								<span
									class="status-badge"
									class:active={row.active === 'active'}
									class:inactive={row.active === 'inactive'}
								>
									{_.capitalize(row.active === 'active' ? 'Aktiv' : 'Inaktiv')}
								</span>
							</td>
							<td class="table-cell">{row.startDate}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>

	{#if showFooter}
		<div class="table-footer">
			<span class="footer-text">{footerText}</span>
		</div>
	{/if}
</div>

<style lang="scss">
	.data-table-container {
		background: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		min-width: 1224px;
		font-family:
			'Inter',
			-apple-system,
			sans-serif;
	}

	.table-wrapper {
		overflow-x: auto;
		overflow-y: auto;
		max-height: 600px;
		min-height: 600px;
		display: grid;
		place-items: center;

		&::-webkit-scrollbar {
			width: 8px;
			height: 8px;
		}

		&::-webkit-scrollbar-track {
			background: #f1f1f1;
			border-radius: 4px;
		}

		&::-webkit-scrollbar-thumb {
			background: #c1c1c1;
			border-radius: 4px;

			&:hover {
				background: #a8a8a8;
			}
		}
	}

	.data-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
		color: #6b716a;

		thead {
			position: sticky;
			top: 0;
			background: white;
			box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
			z-index: 10;
		}
	}

	.table-header {
		background-color: #fafafa;
		border-bottom: 2px solid #e5e5e5;
		padding: 12px 16px;
		text-align: left;
		font-weight: 400;
		color: #141e12;
		white-space: nowrap;
		position: relative;
	}

	.table-row {
		border-bottom: 1px solid #e5e5e5;
		transition: all 0.2s ease;

		&.odd {
			background-color: #f8f9fa;
		}

		&:hover {
			background-color: #e8f5e8 !important; // Green hover color from the image
			cursor: pointer;
		}

		&:last-child {
			border-bottom: none;
		}
	}

	.table-cell {
		padding: 12px 16px;
		vertical-align: middle;
		color: #6b716a;

		&:first-child {
			font-weight: 500; // ID column slightly bolder
		}
	}

	.status-badge {
		display: inline-block;
		padding: 2px 8px;
		border-radius: 5px;
		font-size: 12px;
		font-weight: 500;

		&.active {
			background-color: #b4dfc4;
			color: #18794e;
		}

		&.inactive {
			background-color: #e6e9e6;
			color: #6b716a;
		}
	}

	.table-footer {
		height: 22px;
		background-color: #fafafa;
		border-top: 1px solid #e5e5e5;
		padding: 4px 24px;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.footer-text {
			font-size: 10px;
			font-weight: 600;
			color: #6b716a;
		}
	}

	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-top: 4px solid #10b981;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

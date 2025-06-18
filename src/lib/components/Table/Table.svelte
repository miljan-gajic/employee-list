<script lang="ts">
	import _ from 'lodash';
	// Data prop - make it reactive by exporting it
	export let data = [
		{
			id: 14924,
			firstName: 'Abigayle',
			lastName: 'Sawayn',
			status: 'inaktiv',
			created: 'February 26, 2012'
		},
		{
			id: 92478,
			firstName: 'Margarette',
			lastName: 'Mills',
			status: 'aktiv',
			created: 'August 7, 2017'
		},
		{
			id: 56440,
			firstName: 'Eda',
			lastName: 'Schimmel',
			status: 'inaktiv',
			created: 'August 2, 2013'
		},
		{
			id: 33173,
			firstName: 'Broderick',
			lastName: 'Bins',
			status: 'aktiv',
			created: 'February 9, 2015'
		},
		{
			id: 23875,
			firstName: 'Malcolm',
			lastName: 'Bartell',
			status: 'aktiv',
			created: 'August 2, 2013'
		},
		{
			id: 30625,
			firstName: 'Jamarcus',
			lastName: 'Lang',
			status: 'aktiv',
			created: 'August 2, 2013'
		},
		{
			id: 1837,
			firstName: 'Angus',
			lastName: 'Conn',
			status: 'aktiv',
			created: 'November 7, 2017'
		},
		{
			id: 47519,
			firstName: 'Lawson',
			lastName: 'Nader',
			status: 'aktiv',
			created: 'August 24, 2015'
		},
		{
			id: 1,
			firstName: 'Eliseo',
			lastName: 'Klocko',
			status: 'aktiv',
			created: 'February 9, 2015'
		},
		{
			id: 15164,
			firstName: 'Pascale',
			lastName: '',
			status: 'aktiv',
			created: 'February 11, 2014'
		},
		{
			id: 44882,
			firstName: 'Christine',
			lastName: 'Mayer',
			status: 'aktiv',
			created: 'May 20, 2015'
		},
		{
			id: 22524,
			firstName: 'Jamison',
			lastName: 'Schiller',
			status: 'aktiv',
			created: 'December 26, 2012'
		},
		{
			id: 86767,
			firstName: 'Darius',
			lastName: 'Haley',
			status: 'aktiv',
			created: 'April 26, 2016'
		},
		{ id: 26566, firstName: 'Cary', lastName: 'Rowe', status: 'aktiv', created: 'May 31, 2015' },
		{
			id: 37587,
			firstName: 'Lane',
			lastName: 'McClure',
			status: 'aktiv',
			created: 'September 6, 2013'
		},
		{
			id: 87228,
			firstName: 'Margaretta',
			lastName: 'McClure',
			status: 'aktiv',
			created: 'May 12, 2019'
		},
		{
			id: 13856,
			firstName: 'Caden',
			lastName: 'Kertzmann',
			status: 'aktiv',
			created: 'May 29, 2017'
		}
	];

	// Table configuration
	export let columns = [
		{ key: 'id', label: 'Personalnummer' },
		{ key: 'firstName', label: 'Vorname' },
		{ key: 'lastName', label: 'Nachname' },
		{ key: 'status', label: 'Aktiv' },
		{ key: 'created', label: 'Erstellt' }
	];

	export let itemsPerPage = 15;
	export let showFooter = true;

	$: totalItems = data?.length || 0;
	// $: totalPages = Math.ceil(totalItems / itemsPerPage);
	$: displayedItems = Math.min(itemsPerPage, totalItems);
	$: footerText = `${displayedItems} geladen von ${totalItems} Ergebnissen`;
</script>

<div class="data-table-container">
	<div class="table-wrapper">
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
				{#each data as row (row.id)}
					<tr class="table-row" class:odd={data.indexOf(row) % 2 === 1}>
						<td class="table-cell">{row.id}</td>
						<td class="table-cell">{row.firstName}</td>
						<td class="table-cell">{row.lastName}</td>
						<td class="table-cell">
							<span
								class="status-badge"
								class:active={row.status === 'aktiv'}
								class:inactive={row.status === 'inaktiv'}
							>
								{_.capitalize(row.status)}
							</span>
						</td>
						<td class="table-cell">{row.created}</td>
					</tr>
				{/each}
			</tbody>
		</table>
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
		min-width: 800px;
		font-family:
			'Inter',
			-apple-system,
			sans-serif;
	}

	.table-wrapper {
		overflow-x: auto;
		overflow-y: auto;
		max-height: 600px; // Enables vertical scrolling

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
		padding: 4px 12px;
		border-radius: 16px;
		font-size: 12px;
		font-weight: 500;

		&.active {
			background-color: #d4edda;
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

	@media (max-width: 768px) {
		.data-table {
			font-size: 12px;
		}

		.table-header,
		.table-cell {
			padding: 8px 12px;
		}

		.table-header {
			font-size: 13px;
		}
	}
</style>

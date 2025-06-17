<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let variant = 'primary';
	export let size = 'medium';
	export let disabled = false;
	export let loading = false;
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';

	const dispatch = createEventDispatcher();

	function handleClick(event: MouseEvent) {
		if (!disabled && !loading) {
			dispatch('click', event);
		}
	}
</script>

<button {type} class="btn btn-{variant} btn-{size}" {disabled} class:loading on:click={handleClick}>
	{#if loading}
		<span class="spinner"></span>
	{/if}
	<slot />
</button>

<style lang="scss">
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		font-family: inherit;
		font-weight: 500;
		text-align: center;
		text-decoration: none;
		border: 1px solid transparent;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.15s ease-in-out;
		white-space: nowrap;

		&:disabled,
		&.loading {
			opacity: 0.6;
			cursor: not-allowed;
		}

		&-small {
			padding: 6px 12px;
			font-size: 12px;
		}

		&-medium {
			padding: 10px 16px;
			font-size: 14px;
		}

		&-large {
			padding: 12px 20px;
			font-size: 16px;
		}

		&-primary {
			background-color: #10b981;
			border-color: #10b981;
			color: white;

			&:hover:not(:disabled):not(.loading) {
				background-color: #059669;
				border-color: #059669;
			}

			&:focus {
				outline: none;
				box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
			}
		}

		&-secondary {
			background-color: #6c757d;
			border-color: #6c757d;
			color: white;

			&:hover:not(:disabled):not(.loading) {
				background-color: #5a6268;
				border-color: #545b62;
			}
		}

		&-outline {
			background-color: transparent;
			border-color: #10b981;
			color: #10b981;

			&:hover:not(:disabled):not(.loading) {
				background-color: #10b981;
				color: white;
			}
		}
	}

	.spinner {
		width: 14px;
		height: 14px;
		border: 2px solid transparent;
		border-top: 2px solid currentColor;
		border-radius: 50%;
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

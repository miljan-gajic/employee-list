<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value = '';
	export let placeholder = '';
	export let label = '';
	export let disabled = false;
	export let min = undefined;
	export let max = undefined;
	export let step = 1;
	export let type = 'text';
	export let onInput: ((value?: string) => void) | null = null;
	export let autocomplete: AutoFill | null = null;
	export let testId: string = '';
	export let id: string = '';

	const dispatch = createEventDispatcher();

	function handleInput(
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		value = event.currentTarget.value;
		if (onInput) {
			onInput(value);
		}
	}

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		dispatch('change', { value: target.value });
	}
</script>

<div class="input-group">
	{#if label}
		<label class="input-label" for="number-input">{label}</label>
	{/if}
	<input
		bind:value
		{id}
		{placeholder}
		{disabled}
		{min}
		{max}
		{step}
		{type}
		{autocomplete}
		data-testid={testId}
		class="number-input"
		on:input={handleInput}
		on:change={handleChange}
	/>
</div>

<style lang="scss">
	.input-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
	}

	.input-label {
		font-size: 12px;
		font-weight: 600;
		font-family:
			'Inter',
			-apple-system,
			sans-serif;
		color: #6c757d;
		margin-bottom: 4px;
	}

	.number-input {
		padding: 10px 12px;
		border: 1px solid #c3c8c2;
		border-radius: 5px;
		font-size: 16px;
		font-family:
			'Inter',
			-apple-system,
			sans-serif;
		color: #c3c8c2;
		background: white;
		min-width: 260px;
		transition:
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;

		&:focus {
			outline: none;
			border-color: #10b981;
			box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
		}

		&:disabled {
			background-color: #e9ecef;
			opacity: 0.6;
			cursor: not-allowed;
		}

		&::placeholder {
			color: #adb5bd;
		}
	}
</style>

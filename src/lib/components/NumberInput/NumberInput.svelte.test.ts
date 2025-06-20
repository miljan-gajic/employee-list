import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import NumberInput from './NumberInput.svelte';

describe('NumberInput', () => {
	it('should render with default props', () => {
		const { getByRole } = render(NumberInput);

		const input = getByRole('textbox');
		expect(input).toBeTruthy();
		expect(input.className).toContain('number-input');
		expect(input.getAttribute('type')).toBe('text');
		expect(input.hasAttribute('disabled')).toBe(false);
	});

	it('should render with value prop', () => {
		const { getByRole } = render(NumberInput, {
			props: { value: '123' }
		});

		const input = getByRole('textbox') as HTMLInputElement;
		expect(input.value).toBe('123');
	});

	it('should render with placeholder', () => {
		const { getByRole } = render(NumberInput, {
			props: { placeholder: 'Enter number' }
		});

		const input = getByRole('textbox');
		expect(input.getAttribute('placeholder')).toBe('Enter number');
	});

	it('should render with label', () => {
		const { getByText } = render(NumberInput, {
			props: { label: 'Number Field' }
		});

		const label = getByText('Number Field');

		expect(label).toBeTruthy();
		expect(label.className).toContain('input-label');
		expect(label.tagName).toBe('LABEL');
	});

	it('should not render label when label prop is empty', () => {
		const { container } = render(NumberInput, {
			props: { label: '' }
		});

		const label = container.querySelector('.input-label');
		expect(label).toBeFalsy();
	});

	it('should be disabled when disabled prop is true', () => {
		const { getByRole } = render(NumberInput, {
			props: { disabled: true }
		});

		const input = getByRole('textbox');
		expect(input.hasAttribute('disabled')).toBe(true);
	});

	it('should render with step attribute', () => {
		const { getByRole } = render(NumberInput, {
			props: { step: 0.5 }
		});

		const input = getByRole('textbox');
		expect(input.getAttribute('step')).toBe('0.5');
	});

	it('should render with default step of 1', () => {
		const { getByRole } = render(NumberInput);

		const input = getByRole('textbox');
		expect(input.getAttribute('step')).toBe('1');
	});

	it('should render with number type', () => {
		const { getByRole } = render(NumberInput, {
			props: { type: 'number' }
		});

		const input = getByRole('spinbutton');
		expect(input.getAttribute('type')).toBe('number');
	});

	it('should render with text type', () => {
		const { getByRole } = render(NumberInput, {
			props: { type: 'text' }
		});

		const input = getByRole('textbox');
		expect(input.getAttribute('type')).toBe('text');
	});

	it('should render with autocomplete attribute', () => {
		const { getByRole } = render(NumberInput, {
			props: { autocomplete: 'off' }
		});

		const input = getByRole('textbox');
		expect(input.getAttribute('autocomplete')).toBe('off');
	});

	it('should render with testId attribute', () => {
		const { getByTestId } = render(NumberInput, {
			props: { testId: 'number-input-test' }
		});

		const input = getByTestId('number-input-test');
		expect(input).toBeTruthy();
	});

	it('should render with id attribute', () => {
		const { getByRole } = render(NumberInput, {
			props: { id: 'custom-id' }
		});

		const input = getByRole('textbox');
		expect(input.getAttribute('id')).toBe('custom-id');
	});

	it('should handle input events and update value', async () => {
		const { getByRole } = render(NumberInput, {
			props: { value: '' }
		});

		const input = getByRole('textbox') as HTMLInputElement;

		await fireEvent.input(input, { target: { value: '456' } });

		expect(input.value).toBe('456');
	});

	it('should call onInput callback when provided', async () => {
		const mockOnInput = vi.fn();
		const { getByRole } = render(NumberInput, {
			props: { onInput: mockOnInput }
		});

		const input = getByRole('textbox');

		await fireEvent.input(input, { target: { value: '789' } });

		expect(mockOnInput).toHaveBeenCalledTimes(1);
		expect(mockOnInput).toHaveBeenCalledWith('789');
	});

	it('should not call onInput when callback is null', async () => {
		const { getByRole } = render(NumberInput, {
			props: { onInput: null }
		});

		const input = getByRole('textbox');

		await fireEvent.input(input, { target: { value: '123' } });

		expect(input).toBeTruthy();
	});

	it('should handle change events', async () => {
		const { getByRole } = render(NumberInput);

		const input = getByRole('textbox');

		await fireEvent.change(input, { target: { value: '999' } });

		expect(input).toBeTruthy();
	});

	it('should have input-group wrapper', () => {
		const { container } = render(NumberInput);

		const inputGroup = container.querySelector('.input-group');
		expect(inputGroup).toBeTruthy();
	});

	it('should handle multiple props together', () => {
		const { getByRole, getByText } = render(NumberInput, {
			props: {
				value: '50',
				label: 'Age',
				placeholder: 'Enter your age',
				step: 1,
				type: 'number',
				disabled: false,
				id: 'age-input'
			}
		});

		const input = getByRole('spinbutton') as HTMLInputElement;
		const label = getByText('Age');

		expect(input.value).toBe('50');
		expect(input.getAttribute('placeholder')).toBe('Enter your age');
		expect(input.getAttribute('step')).toBe('1');
		expect(input.getAttribute('type')).toBe('number');
		expect(input.getAttribute('id')).toBe('age-input');
		expect(input.hasAttribute('disabled')).toBe(false);
		expect(label).toBeTruthy();
	});

	it('should handle undefined min and max', () => {
		const { getByRole } = render(NumberInput, {
			props: { min: undefined, max: undefined }
		});

		const input = getByRole('textbox');
		expect(input.hasAttribute('min')).toBe(false);
		expect(input.hasAttribute('max')).toBe(false);
	});

	it('should handle empty string value', () => {
		const { getByRole } = render(NumberInput, {
			props: { value: '' }
		});

		const input = getByRole('textbox') as HTMLInputElement;
		expect(input.value).toBe('');
	});

	it('should have correct CSS classes', () => {
		const { container } = render(NumberInput, {
			props: { label: 'Test Label' }
		});

		const inputGroup = container.querySelector('.input-group');
		const inputLabel = container.querySelector('.input-label');
		const numberInput = container.querySelector('.number-input');

		expect(inputGroup).toBeTruthy();
		expect(inputLabel).toBeTruthy();
		expect(numberInput).toBeTruthy();
	});

	it('should handle focus and blur events', async () => {
		const { getByRole } = render(NumberInput);

		const input = getByRole('textbox');

		// Just test that focus and blur events can be fired without errors
		await fireEvent.focus(input);
		await fireEvent.blur(input);

		// Input should still be present and functional
		expect(input).toBeTruthy();
	});

	it('should bind value correctly with two-way binding', async () => {
		const { getByRole } = render(NumberInput);

		const input = getByRole('textbox') as HTMLInputElement;

		// Simulate typing
		await fireEvent.input(input, { target: { value: 'new value' } });

		expect(input.value).toBe('new value');
	});

	it('should have proper input element type', () => {
		const { getByRole } = render(NumberInput);

		const input = getByRole('textbox');
		expect(input.tagName).toBe('INPUT');
	});
});

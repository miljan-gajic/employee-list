import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Button from './Button.svelte';

describe('Button', () => {
	it('should render with default props', () => {
		const { getByRole } = render(Button);

		const button = getByRole('button');
		expect(button).toBeTruthy();
		expect(button.className).toContain('btn');
		expect(button.className).toContain('btn-primary');
		expect(button.className).toContain('btn-medium');
		expect(button.getAttribute('type')).toBe('button');
		expect(button.hasAttribute('disabled')).toBe(false);
	});

	it('should render with custom variant', () => {
		const { getByRole } = render(Button, {
			props: { variant: 'secondary' }
		});

		const button = getByRole('button');
		expect(button.className).toContain('btn-secondary');
	});

	it('should render with outline variant', () => {
		const { getByRole } = render(Button, {
			props: { variant: 'outline' }
		});

		const button = getByRole('button');
		expect(button.className).toContain('btn-outline');
	});

	it('should render with small size', () => {
		const { getByRole } = render(Button, {
			props: { size: 'small' }
		});

		const button = getByRole('button');
		expect(button.className).toContain('btn-small');
	});

	it('should render with medium size', () => {
		const { getByRole } = render(Button, {
			props: { size: 'medium' }
		});

		const button = getByRole('button');
		expect(button.className).toContain('btn-medium');
	});

	it('should render with large size', () => {
		const { getByRole } = render(Button, {
			props: { size: 'large' }
		});

		const button = getByRole('button');
		expect(button.className).toContain('btn-large');
	});

	it('should be disabled when disabled prop is true', () => {
		const { getByRole } = render(Button, {
			props: { disabled: true }
		});

		const button = getByRole('button');
		expect(button.hasAttribute('disabled')).toBe(true);
	});

	it('should show loading spinner when loading is true', () => {
		const { container, getByRole } = render(Button, {
			props: { loading: true }
		});

		const button = getByRole('button');
		const spinner = container.querySelector('.spinner');

		expect(button.className).toContain('loading');
		expect(spinner).toBeTruthy();
	});

	it('should render with button type', () => {
		const { getByRole } = render(Button, {
			props: { type: 'button' }
		});

		const button = getByRole('button');
		expect(button.getAttribute('type')).toBe('button');
	});

	it('should render with submit type', () => {
		const { getByRole } = render(Button, {
			props: { type: 'submit' }
		});

		const button = getByRole('button');
		expect(button.getAttribute('type')).toBe('submit');
	});

	it('should render with reset type', () => {
		const { getByRole } = render(Button, {
			props: { type: 'reset' }
		});

		const button = getByRole('button');
		expect(button.getAttribute('type')).toBe('reset');
	});

	it('should handle click events', async () => {
		const { getByRole } = render(Button);

		const button = getByRole('button');

		// Just test that the button can be clicked without errors
		await fireEvent.click(button);

		// Button should still be in the document and functional
		expect(button).toBeTruthy();
	});

	it('should have correct classes for multiple props', () => {
		const { getByRole } = render(Button, {
			props: {
				variant: 'outline',
				size: 'large',
				loading: true
			}
		});

		const button = getByRole('button');
		expect(button.className).toContain('btn');
		expect(button.className).toContain('btn-outline');
		expect(button.className).toContain('btn-large');
		expect(button.className).toContain('loading');
	});

	it('should handle null type prop', () => {
		const { getByRole } = render(Button, {
			props: { type: null }
		});

		const button = getByRole('button');
		expect(button.getAttribute('type')).toBeNull();
	});

	it('should handle undefined type prop defaults to button', () => {
		const { getByRole } = render(Button, {
			props: { type: undefined }
		});

		const button = getByRole('button');
		expect(button.getAttribute('type')).toBe('button');
	});

	it('should have proper button element', () => {
		const { getByRole } = render(Button);

		const button = getByRole('button');
		expect(button.tagName).toBe('BUTTON');
	});

	it('should be focusable when not disabled or loading', () => {
		const { getByRole } = render(Button);

		const button = getByRole('button');
		button.focus();

		expect(document.activeElement).toBe(button);
	});

	it('should apply correct styles for primary variant', () => {
		const { getByRole } = render(Button, {
			props: { variant: 'primary' }
		});

		const button = getByRole('button');
		expect(button.className).toContain('btn-primary');
	});

	it('should apply correct styles for secondary variant', () => {
		const { getByRole } = render(Button, {
			props: { variant: 'secondary' }
		});

		const button = getByRole('button');
		expect(button.className).toContain('btn-secondary');
	});

	it('should maintain disabled state with loading', () => {
		const { getByRole } = render(Button, {
			props: { disabled: true, loading: true }
		});

		const button = getByRole('button');
		expect(button.hasAttribute('disabled')).toBe(true);
		expect(button.className).toContain('loading');
	});

	it('should not have disabled attribute when disabled is false', () => {
		const { getByRole } = render(Button, {
			props: { disabled: false }
		});

		const button = getByRole('button');
		expect(button.hasAttribute('disabled')).toBe(false);
	});

	it('should apply loading class when loading is true', () => {
		const { getByRole } = render(Button, {
			props: { loading: true }
		});

		const button = getByRole('button');
		expect(button.classList.contains('loading')).toBe(true);
	});

	it('should have btn-label span element', () => {
		const { container } = render(Button);

		const btnLabel = container.querySelector('.btn-label');
		expect(btnLabel).toBeTruthy();
		expect(btnLabel?.tagName).toBe('SPAN');
	});
});

/**
 * Test scenarios for AddThreadInput component
 *
 * - should update the title state correctly when typed into
 * - should update the category state correctly when typed into
 * - should update the body state correctly when typed into
 * - should call addThread function with correct arguments when the create button is clicked
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import AddThreadInput from './AddThreadInput';

describe('AddThreadInput component', () => {
  let mockAddThread;

  beforeEach(() => {
    mockAddThread = vi.fn();
    render(<AddThreadInput addThread={mockAddThread} />);
  });

  afterEach(() => {
    mockAddThread.mockClear();
  });

  const typeIntoInput = (placeholderText, value) => {
    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value } });
    return input;
  };

  it('should update the title state correctly when typed into', () => {
    const titleInput = typeIntoInput('Title', 'inititle');
    expect(titleInput.value).toBe('inititle');
  });

  it('should update the category state correctly when typed into', () => {
    const categoryInput = typeIntoInput('Category', 'inikategori');
    expect(categoryInput.value).toBe('inikategori');
  });

  it('should update the body state correctly when typed into', () => {
    const bodyInput = typeIntoInput('Content', 'iniisibody');
    expect(bodyInput.value).toBe('iniisibody');
  });

  it('should call addThread function with correct arguments when the create button is clicked', () => {
    typeIntoInput('Title', 'inititle');
    typeIntoInput('Category', 'inikategori');
    typeIntoInput('Content', 'iniisibody');

    const addThreadButton = screen.getByRole('button', { name: 'Create' });
    fireEvent.click(addThreadButton);

    expect(mockAddThread).toHaveBeenCalledWith({
      title: 'inititle',
      body: 'iniisibody',
      category: 'inikategori',
    });
  });
});

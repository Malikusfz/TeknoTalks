/**
 * Test scenarios for NotFound component
 *
 * - should redirect to the homepage when the link is clicked
 */

import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import NotFound from './NotFound';

describe('NotFound component', () => {
  it('should redirect to the homepage when the link is clicked', async () => {
    // arrange
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    // action
    fireEvent.click(screen.getByRole('link', { name: /home page/i }));

    // assert
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});

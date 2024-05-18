/**
 * Test scenarios for CommentInput component
 *
 * - should update the comment state correctly when typed into
 * - should call comment function with correct arguments when the send button is clicked
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import CommentInput from './CommentInput';

describe('CommentInput component', () => {
  let mockComment;

  beforeEach(() => {
    mockComment = vi.fn();
    render(<CommentInput comment={mockComment} />);
  });

  afterEach(() => {
    mockComment.mockClear();
  });

  const typeIntoTextarea = (value) => {
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value } });
    return textarea;
  };

  it('should update the comment state correctly when typed into', () => {
    const commentTextarea = typeIntoTextarea('inicomment');
    expect(commentTextarea.value).toBe('inicomment');
  });

  it('should call comment function with correct arguments when the send button is clicked', () => {
    typeIntoTextarea('inicomment');
    
    const sendButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(sendButton);

    expect(mockComment).toHaveBeenCalledWith({
      commentValue: 'inicomment',
    });
  });
});

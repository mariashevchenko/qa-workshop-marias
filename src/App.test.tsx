import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { userId: 1, id: 1, title: 'Test todo', completed: false },
          { userId: 1, id: 2, title: 'Done todo', completed: true },
        ]),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('shows loading state then renders todos', async () => {
  render(<App />);
  expect(screen.getByTestId('loading')).toHaveTextContent('Loading...');

  await waitFor(() => {
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });
  expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
  expect(screen.getByTestId('todo-checkbox-1')).not.toBeChecked();
  expect(screen.getByTestId('todo-checkbox-2')).toBeChecked();
});

test('each todo has a checkbox with a data-testid', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });

  const checkboxes = [
    screen.getByTestId('todo-checkbox-1'),
    screen.getByTestId('todo-checkbox-2'),
  ];

  checkboxes.forEach((checkbox) => {
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });
});

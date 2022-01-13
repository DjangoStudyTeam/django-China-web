import { render, screen } from '@testing-library/react';

import Home from '../pages/Home/index';

test('renders hello button in homepage', () => {
  render(<Home />);
  const linkElement = screen.getByText(/hello/i);
  expect(linkElement).toBeInTheDocument();
});

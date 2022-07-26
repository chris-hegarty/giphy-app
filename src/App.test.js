import { render, screen } from '@testing-library/react';

//import the component you want to test:
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Ask how things should be broken up into smaller chunks
// pattern: describe/describe/it
import { render, screen } from '@testing-library/react';
import RedixMonthlyReportApp from './RedixMonthlyReportApp';

test('renders learn react link', () => {
  render(<RedixMonthlyReportApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

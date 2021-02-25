import {fireEvent, render} from '@testing-library/react';
import App from './App';
import BracketedHistoryCalculator from "./components/BracketedTaxCalculator";

test('renders title', () => {
  const wrapper = render(<App/>);
  const title = wrapper.getByText(/Bracketed Tax Calculator/i);
  expect(title).toBeInTheDocument();
});

describe("test history count", () => {
  it("test default history count", () => {
    const wrapper = render(<BracketedHistoryCalculator/>);
    const historyInput = wrapper.getByLabelText('History to keep');
    expect(historyInput.value).toEqual('100');
  });

  it("test change history count", () => {
    const wrapper = render(<BracketedHistoryCalculator/>);
    const historyInput = wrapper.getByLabelText('History to keep');

    fireEvent.change(historyInput, {target: {value: 1}});
    expect(historyInput.value).toEqual('1');
  });
});


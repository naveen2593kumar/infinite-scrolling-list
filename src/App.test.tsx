import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import * as ContactService from "../src/services/ContactService"
import { IContact } from './model/contact.interface';

test('renders Application', async () => {
  const intersectionObserverMock = () => ({
    observe: () => null,
    disconnect: () => null,
  })

  window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

  const fetchContactsMock = jest.spyOn(ContactService, 'fetchContacts');
  fetchContactsMock.mockImplementation(() => {
    return new Promise<IContact[]>(resolve => {
      resolve([
        { name: 'AAA', country: 'MOCK_COUNTRY', picture: '1' },
        { name: 'BBB', country: 'MOCK_COUNTRY', picture: '2' },
        { name: 'CCC', country: 'MOCK_COUNTRY', picture: '3' },
      ]);
    });
  });

  render(
    <Router>
      <App />
    </Router>
  );
  // It should render the login page by default
  screen.getByText(/Login Page/i);

  // Lets try to login
  const usernameFld = screen.getByTestId('usernameFld');
  const passwordFld = screen.getByTestId('passwordFld');

  // First lets try invalid login
  userEvents.type(usernameFld, 'abc');
  userEvents.type(passwordFld, 'def');

  const submitBtn = screen.getByRole('button', { name: 'Submit' });
  const resetBtn = screen.getByRole('button', { name: 'Reset' });

  await waitFor(() => {
    userEvents.click(submitBtn);
  });
  // As it evidnt that we are getting the "Invalid credentials" error in this case
  screen.getByText(/Invalid credentials/i);

  // Second lets try correct login details
  // lets first reset the form to start from scratch
  await waitFor(() => {
    userEvents.click(resetBtn);
  });
  // passing correct credentials
  userEvents.type(usernameFld, 'foo');
  userEvents.type(passwordFld, 'bar');
  await waitFor(() => {
    userEvents.click(submitBtn);
  });

  // with this logout button appears
  screen.getByText(/Logout/i);

  // Proper list of contacts with expected text and labels
  const countryItems = screen.getAllByText(/MOCK_COUNTRY/);
  expect(countryItems.length).toBe(3);
  screen.getByText(/AAA/);
  screen.getByText(/BBB/);
  const lastItem = screen.getByText(/CCC/);

  await waitFor(() => {
    fireEvent.scroll(lastItem);
  });
});

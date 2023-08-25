import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import Sidebar from './Sidebar';
import { createTestStore } from '../../utils/testing';
import { mockData } from '../../__mocks__/mockData';

let mockedStore;

vitest.mock("react-redux", async () => {
  const actual = await vitest.importActual("react-redux");

  return {
    ...actual,
    useDispatch: vitest.fn(),
    useSelector: vitest.fn(),
  }
})

describe('Sidebar', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(vitest.fn());
    useSelector.mockReturnValue({
      activeTab: 'tab1',
      tabs: mockData.tabs,
      tabData:mockData.tabdata
    });

    mockedStore = createTestStore();
  });

  it('renders the sidebar tabs', () => {
    render(
      <BrowserRouter>
        <Provider store={mockedStore}>
          <Sidebar />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByTestId('Marketing')).toBeDefined();
    expect(screen.getByTestId('Finance')).toBeDefined();
  });

  it('changes the URL when clicking on a tab ', () => {
    render(
      <BrowserRouter>
        <Provider store={mockedStore}>
          <Sidebar />
        </Provider>
      </BrowserRouter>
    );
  
    const financeTab = screen.getByTestId('Finance');
    fireEvent.click(financeTab);
  
    expect(window.location.pathname).toContain('Finance');

    const marketingTab = screen.getByTestId('Marketing');
    fireEvent.click(marketingTab);
    expect(window.location.pathname).toContain('Marketing');
  });

  it('changes active tab on click', () => {
    render(
      <BrowserRouter>
        <Provider store={mockedStore}>
          <Sidebar />
        </Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('Finance'));
    expect(useDispatch).toHaveBeenCalled();
  });
});

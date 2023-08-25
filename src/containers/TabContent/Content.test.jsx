import { render, screen } from '@testing-library/react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import Content from './Content'; // Update the import path
import { createTestStore } from '../../utils/testing';
import { mockData } from '../../__mocks__/mockData';

const activeTab = mockData.tabs[0];
let mockedStore;

vitest.mock("react-redux", async () => {
  const actual = await vitest.importActual("react-redux");

  return {
    ...actual,
    useDispatch: vitest.fn(),
    useSelector: vitest.fn(),
  }
})

describe('Content', () => {
    beforeEach(() => {
        useDispatch.mockReturnValue(vitest.fn());
        useSelector.mockReturnValue({
            activeTab: activeTab,
            tabs: mockData.tabs,
            tabData: mockData.tabdata,
            plugins: mockData.plugins
        });

        mockedStore = createTestStore();
    });

  it('renders the title of the active tab', () => {
    render(
      <BrowserRouter>
        <Provider store={mockedStore}>
          <Content />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(mockData.tabdata[activeTab].title + ' plugins')).toBeDefined();
  });

  it('renders the plugins of the active tab', () => {
    render(
      <BrowserRouter>
        <Provider store={mockedStore}>
          <Content />
        </Provider>
      </BrowserRouter>
    );

    const activePlugin = mockData.tabdata[activeTab].active[0];

    expect(screen.getByText(mockData.plugins[activePlugin].title)).toBeDefined();
  });
});

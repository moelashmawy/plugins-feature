import { fireEvent, render, screen } from '@testing-library/react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { SwitchAll } from './SwitchAll';
import { createTestStore } from '../../utils/testing';
import { mockData } from '../../__mocks__/mockData';

let mockedStore;

vitest.mock('react-redux', async () => {
  const actual = await vitest.importActual('react-redux');

  return {
    ...actual,
    useDispatch: vitest.fn(),
    useSelector: vitest.fn(),
  };
});

describe('SwitchAll', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(vitest.fn());
    useSelector.mockReturnValue({
      activeTab: 'tab1',
      tabs: mockData.tabs,
      tabData: mockData.tabdata,
      plugins: mockData.plugins,
    });

    mockedStore = createTestStore();
  });

  it('renders the switch and handles switching', () => {
    render(
      <BrowserRouter>
        <Provider store={mockedStore}>
          <SwitchAll />
        </Provider>
      </BrowserRouter>
    );

    const switchAllButton = screen.getByTestId('Switch All Plugins');
    expect(switchAllButton).toBeDefined();

    fireEvent.click(switchAllButton);
    expect(useDispatch).toHaveBeenCalled();
  });
});

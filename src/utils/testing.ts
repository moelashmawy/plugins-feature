import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { expect } from 'vitest'
import { configureStore } from '@reduxjs/toolkit';
import pluginsSLice from '../state/slices/pluginsSLice';

export const createSnapshot = (ComponentToTest: ReactElement) => {
    const { asFragment } = render(ComponentToTest);
    expect(asFragment()).toMatchSnapshot();
}

export const createTestStore = () => {
  const store = configureStore(
    {
      reducer: {
        plugins: pluginsSLice
      }
    }
  );
  return store;
}
import { it } from 'vitest';
import { Switch } from '..';
import { createSnapshot } from '../../../utils/testing';

it('should render checked switch', () => {
  createSnapshot(<Switch isChecked={true} onChange={() => {}} />);
});

it('should render unchecked switch', () => {
  createSnapshot(<Switch isChecked={false} onChange={() => {}} />);
});

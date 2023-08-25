import { it } from 'vitest';
import { createSnapshot } from '../../../utils/testing';
import { Loading } from '../Loading';

it('should render with default width and height', () => {
  createSnapshot(<Loading />);
});

it('should render with width and height 25', () => {
  createSnapshot(<Loading width={25} height={25} />);
});

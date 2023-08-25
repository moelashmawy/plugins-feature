import { it } from 'vitest'
import { createSnapshot } from '../../../utils/testing';
import { Card } from '../Card';

it('should render plugin card correctly', () => {
  createSnapshot(
    <Card
        title='plugin 1'
        description='Awesome plugin'
        status={"Allowed"}
        isDisabled={false}
        isChecked={true}
        isLoading={false}
        switchDisabled={false}
        onSwitch={() => {}}
    />
  );
});
import classNames from 'classnames';

type Props = {
    isChecked: boolean;
    disabled?: boolean;
    testId?: string;
    onChange: () => void;
}

export const Switch = ({ isChecked, disabled = false, testId, onChange }: Props)=> {
  const handleSwitch = () => {
    if(disabled) return;
    onChange();
  }

  return (
    <label className={classNames('switch', { 'disabled-switch': disabled })}>
      <input type="checkbox" checked={ isChecked } onChange={handleSwitch} data-testid={testId} />
      <span className={classNames('slider round', { 'disabled-switch': disabled })} />
    </label>
  )
}
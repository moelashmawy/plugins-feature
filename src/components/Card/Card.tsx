import classNames from 'classnames';
import { Switch } from '../Switch';
import { Loading } from '../Loading/Loading';

type Props = {
  isDisabled: boolean;
  title: string;
  isChecked: boolean;
  switchDisabled: boolean;
  isLoading: boolean;
  status: string;
  description: string;
  onSwitch: () => void;
};

export const Card = ({
  isDisabled,
  title,
  isChecked,
  switchDisabled,
  isLoading,
  status,
  description,
  onSwitch,
}: Props) => {
  return (
    <div
      className={classNames('card-component', { 'disabled-card': isDisabled })}
    >
      <div className="header">
        <h3>{title}</h3>
        <Switch
          isChecked={isChecked}
          onChange={onSwitch}
          disabled={switchDisabled}
        />
      </div>

      <div className={classNames('card-status', { inactive: !isChecked })}>
        <span className="loading">{isLoading && <Loading />}</span>
        <span>{status}</span>
      </div>

      <div className="desc">
        <p>{description}</p>
      </div>
    </div>
  );
};

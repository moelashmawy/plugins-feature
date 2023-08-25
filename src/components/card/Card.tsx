import classNames from 'classnames';
import { Switch } from '../switch';
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
}

export const Card = ({
    isDisabled,
    title,
    isChecked,
    switchDisabled,
    isLoading,
    status,
    description,
    onSwitch }: Props) => {

    return (
        <div className={classNames('card', { 'disabled-card': isDisabled})}>
            <div className='header'>
                <h3>{title}</h3>
                <Switch
                    isChecked={isChecked}
                    onChange={onSwitch}
                    disabled={switchDisabled}
                />
            </div>

            <div
                className={classNames('card-status', {'inactive': !isChecked})}
            >
                <span className='loading'>{isLoading && <Loading />}</span>
                <span>{status}</span>
            </div>
            <p>{description}</p>
        </div>
    )
}
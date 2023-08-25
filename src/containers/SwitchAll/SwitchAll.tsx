import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '../../components/switch';
import { PluginsStateType, TabDataMap } from '../../types/data';
import { putData } from '../../service';
import { setTabData } from '../../state/slices/pluginsSLice';
import { useState } from 'react';
import { Loading } from '../../components/Loading/Loading';

export const SwitchAll = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const activeTab = useSelector((state: PluginsStateType) => state.plugins.activeTab);
  const { tabData } = useSelector((state: PluginsStateType) => state.plugins);

  const active = tabData[activeTab]?.active || [];
  const disabled = tabData[activeTab]?.disabled || [];
  const inactive = tabData[activeTab]?.inactive || [];

  const allPluginsDisabled = disabled.length >= active.length + inactive.length;

  const handleSwitchAll = () => {
    setLoading(true);
    const body: TabDataMap = {};

    for (const tabId in tabData) {
      const tab = tabData[tabId];
      const mergedDisabled = [...tab.disabled, ...tab.active, ...tab.inactive];

      body[tabId] = {
        ...tab,
        ...(!allPluginsDisabled && { disabled: mergedDisabled }),
        ...(allPluginsDisabled && {
          disabled: tab.disabled.filter(plug => !tab.active.includes(plug) && !tab.inactive.includes(plug))
        })
      };
    }

    putData('plugins', body)
    .then(data => {
        dispatch(setTabData(data));
        setLoading(false);
        setError(null);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  };

  return (
      <div className='switch-all'>
        {error && <div className='error'>{error}</div>}
        {loading &&  <Loading width={33} height={33}/> }
        {!loading && !error && <div>{allPluginsDisabled ? 'All plugins disabled' : 'All plugins enabled'}</div>}
        <Switch
          isChecked={!allPluginsDisabled}
          onChange={handleSwitchAll}
          disabled={loading}
          testId='Switch All Plugins'
        />
      </div>
  );
}
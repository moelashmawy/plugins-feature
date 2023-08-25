import { useDispatch, useSelector } from 'react-redux';
import { PluginsStateType } from '../../types/data';
import { useParams } from 'react-router-dom';
import {
  setActiveTab,
  setPlugins,
  setTabData,
} from '../../state/slices/pluginsSLice';
import { useCallback, useEffect, useState } from 'react';
import { getKeyByPropName } from '../../utils/objects';
import { fetchData, putData } from '../../service';
import { Loading } from '../../components/Loading/Loading';
import { Card } from '../../components/Card/Card';

const Content = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pluginLoading, setPluginLoading] = useState('');

  const { tabId } = useParams();
  const dispatch = useDispatch();

  const { activeTab, tabData, plugins } = useSelector(
    (state: PluginsStateType) => state.plugins
  );

  const active = tabData[activeTab]?.active || [];
  const disabled = tabData[activeTab]?.disabled || [];
  const inactive = tabData[activeTab]?.inactive || [];

  const tabPlugins = [...active, ...disabled, ...inactive].sort();
  const tabPluginsSet = [...new Set(tabPlugins)];

  const handleActivateTab = useCallback(
    (tabName: string) => {
      dispatch(setActiveTab(tabName));
    },
    [dispatch]
  );

  // activate latest opened tab on refresh
  useEffect(() => {
    handleActivateTab(getKeyByPropName(tabData, tabId!, 'title'));
  }, [handleActivateTab, tabId, tabData]);

  useEffect(() => {
    if (Object.keys(plugins).length > 0) return;
    setLoading(true);

    Promise.all([fetchData('plugins'), fetchData('tabdata')])
      .then(([pluginsData, tabData]) => {
        dispatch(setPlugins(pluginsData));
        dispatch(setTabData(tabData));
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [dispatch, plugins]);

  const handleSwitchPlugin = (plugin: string) => {
    const pluginIsActive = active.includes(plugin);
    const pluginIsDisabeled = disabled.includes(plugin);

    if (pluginIsDisabeled) return;
    setPluginLoading(plugin);

    const body = {
      ...tabData,
      [activeTab]: {
        ...tabData[activeTab],
        ...(pluginIsActive && {
          inactive: [...tabData[activeTab].inactive, plugin],
          active: tabData[activeTab].active.filter((plug) => plug !== plugin),
        }),
        ...(!pluginIsActive && {
          inactive: tabData[activeTab].inactive.filter(
            (plug) => plug !== plugin
          ),
          active: [...tabData[activeTab].active, plugin],
        }),
      },
    };

    putData('plugins', body)
      .then((data) => {
        dispatch(setTabData(data));
        setPluginLoading('');
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setPluginLoading('');
      });
  };

  return (
    <div className="content">
      <p className="title">{tabData[activeTab]?.title} plugins</p>

      {error && <div className="error"> {error} </div>}

      {loading ? (
        <Loading width={55} height={55} />
      ) : (
        <div className="plugins">
          {tabPluginsSet.map((plugin) => {
            return (
              <div className="card" key={plugin}>
                <Card
                  title={plugins![plugin]?.title}
                  description={plugins![plugin]?.description}
                  status={
                    active.includes(plugin) || !inactive.includes(plugin)
                      ? 'Allowed'
                      : 'Blocked'
                  }
                  isDisabled={disabled.includes(plugin)}
                  isChecked={
                    active.includes(plugin) || !inactive.includes(plugin)
                  }
                  isLoading={pluginLoading === plugin}
                  switchDisabled={
                    disabled.includes(plugin) || pluginLoading === plugin
                  }
                  onSwitch={() => handleSwitchPlugin(plugin)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Content;

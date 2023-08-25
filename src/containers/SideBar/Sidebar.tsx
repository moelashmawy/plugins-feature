import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PiCalendarCheckLight, PiCoinsBold, PiChartScatter } from "react-icons/pi";
import { setTabs, setActiveTab } from '../../state/slices/pluginsSLice';
import { PluginsStateType } from '../../types/data';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../service';
import { SwitchAll } from '../SwitchAll/SwitchAll';
import classNames from 'classnames';
import { Loading } from '../../components/Loading/Loading';

interface IconMap {
  [key: string]: React.ReactElement;
}

const tempIcons: IconMap = {
  'icon-marketing': <PiChartScatter />,
  'icon-finance': <PiCoinsBold />,
  'icon-people': <PiCalendarCheckLight />
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleActivateTab = (tabName: string) => {
    dispatch(setActiveTab(tabName))
  }

  const activeTab = useSelector((state: PluginsStateType) => state.plugins.activeTab);
  const { tabs, tabData } = useSelector((state: PluginsStateType) => state.plugins);

  useEffect(() => {
    if(tabs?.length) return;
    setLoading(true);
  
    fetchData('tabs')
      .then(data => {
        dispatch(setTabs(data));
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [dispatch, tabs]);

  return (
    <div className="sidebar">
      <div>
        <Link to='/'>
          <p className='title'>Data<b>Guard</b></p>
        </Link>

        { error && <div> { error } </div> }

        {loading ? <div style={{textAlign: "center"}}><Loading width={55} height={55}/></div>
          :
          <ul>
            {tabs.map((tab: string) => (
              <Link to={`/plugins/${tabData[tab]?.title}`} key={tab} >
                <li
                  key={tab}
                  onClick={()=>handleActivateTab(tab)}
                  className={classNames('tab', {active: activeTab === tab})}
                  data-testid={tabData[tab]?.title}
                >
                  <h2>{ tempIcons[tabData[tab]?.icon] }</h2>
                  <div>{tabData[tab]?.title}</div>
                </li>
              </Link>
            ))}
          </ul>
        }
      </div>
      
      {activeTab &&  <SwitchAll />}
    </div>
  );
};

export default Sidebar;
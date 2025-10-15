'use client';
import React, { useState } from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  OverflowMenu,
  OverflowMenuItem,
} from '@carbon/react';
import {
  Notification,
  UserAvatar,
  Switcher,
} from '@carbon/icons-react';
import CloudSideNav from './CloudSideNav';
import './cloudHeader.scss';
import { ThemeToggle } from '../ThemeToggleButton';
import { useRouter } from 'next/navigation';
import { useMeQuery } from '@/store/api/authApi';
import { useLogoutMutation } from '@/store/api/baseApi';
import { appName } from '@/util/constants';

const CloudHeader = () => {
  const router = useRouter();
  const [isSideNavExpanded, setIsSideNavExpanded] = useState<boolean>(false);
  const [logout] = useLogoutMutation();
  const { data } = useMeQuery();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <Header className='cloud-header'
        aria-label={`${appName} Cloud Portal`}
      >
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
          isActive={isSideNavExpanded}
        />

        <HeaderName href="#" prefix="New">
          {appName}
        </HeaderName>

        <HeaderNavigation aria-label="Main Navigation" className="hidden-md">
          <HeaderMenuItem href="/">Dashboard</HeaderMenuItem>
          <HeaderMenuItem href="/instances">Instances</HeaderMenuItem>
          <HeaderMenuItem href="/resources">Resources</HeaderMenuItem>
          <HeaderMenuItem href="/billings">Billings</HeaderMenuItem>
        </HeaderNavigation>

        <HeaderGlobalBar className='items-center'>
          <ThemeToggle />
          <HeaderGlobalAction
            aria-label="Notifications"
            tooltipAlignment="center"
            onClick={() => console.log('Notifications clicked')}
          >
            <Notification size={20} />
          </HeaderGlobalAction>

          <HeaderGlobalAction
            aria-label="App Switcher"
            tooltipAlignment="center"
            onClick={() => console.log('App Switcher clicked')}
          >
            <Switcher size={20} />
          </HeaderGlobalAction>
          {/* <HeaderGlobalAction
            aria-label="User menu"
            tooltipAlignment="end"
          > */}

          <OverflowMenu
            renderIcon={UserAvatar}
            aria-label="User menu"
            flipped
            size='lg'
          >
            <OverflowMenuItem
              hasDivider
              itemText={data?.username}
            >
            </OverflowMenuItem>
            {data?.username && <OverflowMenuItem
              onClick={() => handleLogout()}
              itemText="Logout">
            </OverflowMenuItem>}
          </OverflowMenu>
          {/* </HeaderGlobalAction> */}

        </HeaderGlobalBar>
      </Header>

      <CloudSideNav isSideNavExpanded={isSideNavExpanded} />
    </>
  );
};

export default CloudHeader;
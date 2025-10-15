import React from 'react'
import {
  SideNav,
  SideNavItems,
  SideNavMenuItem,
} from '@carbon/react';

const CloudSideNav = ({isSideNavExpanded}:{isSideNavExpanded:boolean}) => {
  return (
    <SideNav
      isPersistent={false}
      expanded={isSideNavExpanded}
      aria-label="Side navigation"
    >
      <SideNavItems>
        <SideNavMenuItem href="/">Dashboard</SideNavMenuItem>
        <SideNavMenuItem href="/instances">Instances</SideNavMenuItem>
        <SideNavMenuItem href="/resources">Resources</SideNavMenuItem>
        <SideNavMenuItem href="/billings">Billing</SideNavMenuItem>
      </SideNavItems>
    </SideNav>
  )
}

export default CloudSideNav
'use client'

import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import React from 'react'

const TopBreadcrumb = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        {/* <a href="/#"> */}
          Breadcrumb 1
        {/* </a> */}
      </BreadcrumbItem>
      <BreadcrumbItem href="#">
        Breadcrumb 2
      </BreadcrumbItem>
      <BreadcrumbItem href="#">
        Breadcrumb 3
      </BreadcrumbItem>
      <BreadcrumbItem href="#">
        Breadcrumb 4
      </BreadcrumbItem>
    </Breadcrumb>

  )
}

export default TopBreadcrumb
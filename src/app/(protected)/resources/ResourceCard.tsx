'use client';

import React from 'react';
import { Tile } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { ResourceType } from '@/types/commonTypes';
import Link from 'next/link';

type Props = {
  resource: ResourceType;
};

const ResourceCard: React.FC<Props> = ({ resource }) => (
  <Tile className="resource-card">
    <h4>{resource.title}</h4>
    <p>{resource.description}</p>
    <Link href={resource.link} target="_blank" rel="noopener noreferrer">
      <ArrowRight />
    </Link>
  </Tile>
);

export default ResourceCard;

'use client';
import React from 'react';
import { Grid, Column } from '@carbon/react';
import ResourceCard from './ResourceCard';
import { resourcesData } from '@/util/constants';


const ResourcesPage = () => {
  return (
    <Grid fullWidth>
      <Column sm={4} md={8} lg={16}>
        <h2 style={{ marginBottom: '1rem' }}>Resources</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {resourcesData.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      </Column>
    </Grid>
  );
};

export default ResourcesPage;

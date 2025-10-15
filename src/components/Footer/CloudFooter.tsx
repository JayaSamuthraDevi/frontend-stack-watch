'use client'
import { Theme, Grid, Column } from '@carbon/react'
import Link from 'next/link'
import React from 'react'
import './cloudFooter.scss';

const CloudFooter = () => {
  return (
    <Theme theme="g100">
      <footer className="footer">
        <Grid condensed>
          <Column sm={4} md={8} lg={4}>
            <h4 className={"heading"}>Cloud Manager</h4>
            <p className={"description"}>
              Simplify, monitor, and scale your cloud infrastructure.
            </p>
          </Column>

          <Column sm={4} md={4} lg={4}>
            <h5 className={"subheading"}>Resources</h5>
            <ul className={"linkList"}>
              <li><Link href="/docs">Documentation</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/support">Support</Link></li>
            </ul>
          </Column>

          <Column sm={4} md={4} lg={4}>
            <h5 className={"subheading"}>Company</h5>
            <ul className={"linkList"}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </Column>
        </Grid>
        <div className={"bottomBar"}>
          <p>© {new Date().getFullYear()} Cloud Manager, Inc.</p>
        </div>
      </footer>
    </Theme>
  );
};
export default CloudFooter
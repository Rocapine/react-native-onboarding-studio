import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function QuickStart() {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <Heading as="h2" className="text--center margin-bottom--lg">
              🚀 Quick Start
            </Heading>
            <div className={styles.codeBlock}>
              <pre>
                <code>{`npm install @rocapine/react-native-onboarding`}</code>
              </pre>
            </div>
            <div className="text--center margin-top--lg" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                className="button button--primary button--lg"
                to="/docs/getting-started">
                View Full Documentation →
              </Link>
              <Link
                className="button button--secondary button--lg"
                href="https://onboarding-studio.rocapine.io/"
                target="_blank"
                rel="noopener noreferrer">
                Open Onboarding Studio →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/intro"
            style={{ marginLeft: '1rem' }}>
            Documentation
          </Link>
          <Link
            className="button button--primary button--lg"
            href="https://onboarding-studio.rocapine.io/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: '1rem' }}>
            Open Onboarding Studio →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Build beautiful, customizable onboarding flows that update instantly without app releases. CMS-driven onboarding system for React Native mobile apps.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QuickStart />
      </main>
    </Layout>
  );
}

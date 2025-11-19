import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Pre-built Components',
    emoji: '🎨',
    description: (
      <>
        Ready-to-use screens including ratings, pickers, carousels, media content, and more.
        Get started quickly with beautiful, production-ready components.
      </>
    ),
  },
  {
    title: 'CMS-Driven',
    emoji: '🔄',
    description: (
      <>
        Update onboarding flows remotely without app releases. Make changes in your CMS
        and see them instantly in your app.
      </>
    ),
  },
  {
    title: 'React Native',
    emoji: '📱',
    description: (
      <>
        Works seamlessly with Expo and bare React Native projects. Built specifically
        for mobile app development.
      </>
    ),
  },
  {
    title: 'Type-Safe',
    emoji: '🎯',
    description: (
      <>
        Full TypeScript support with runtime validation. Catch errors at compile time
        and ensure type safety throughout your onboarding flows.
      </>
    ),
  },
  {
    title: 'Offline Support',
    emoji: '💾',
    description: (
      <>
        Built-in caching with AsyncStorage. Your onboarding flows work offline,
        providing a seamless experience even without connectivity.
      </>
    ),
  },
  {
    title: 'Themeable',
    emoji: '🎭',
    description: (
      <>
        Customizable colors, typography, and styling. Three levels of customization
        from theme tokens to complete renderer overrides.
      </>
    ),
  },
];

function Feature({title, emoji, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureEmoji}>{emoji}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

import type { DemoConfig } from '../types';
import { site } from '../../content/site';
import { PreviewContact } from './forms';
import { Cta, Section, SectionHead } from './primitives';
import styles from '../Demo.module.css';

/**
 * The last section on every template.
 *
 * On a preview it is a way for the owner to reply without hunting for an email
 * address. On a gallery sample it is the only place the page sells anything,
 * and what it sells is the build rather than the fictional business.
 */
export default function DemoOutro({ config }: { config: DemoConfig }) {
  if (config.showcase) {
    return (
      <Section tone="dark" narrow>
        <SectionHead
          eyebrow="Built by Joshua Kac"
          title="Your business, on a site like this one."
          sub="Every page here is real code, not a picture of a website. Yours would be built the same way, with your photos, your colors and your hours, and it would load just as fast on a phone."
          centered
        />
        <div
          className={styles.heroActions}
          style={{ justifyContent: 'center', marginTop: 0 }}
        >
          <Cta href={`${site.url}/services`} variant="onDark">
            See what it costs
          </Cta>
          <Cta href={`${site.url}/templates`} variant="ghost">
            Other templates
          </Cta>
        </div>
      </Section>
    );
  }

  return (
    <Section id="preview" tone="alt" narrow>
      <PreviewContact config={config} />
    </Section>
  );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { getDemo, isExpired } from '../demos';
import { TEMPLATES } from '../demos/templates';
import NotFound from './NotFound';
import PreviewExpired from './PreviewExpired';

/**
 * Renders one demo, at `/demo/<slug>` and at `<slug>.ironcoffee.com`.
 *
 * Expiry is checked while rendering rather than on a timer. Both the build and
 * the browser agree on whether a preview has lapsed for as long as it stays on
 * one side of the date, and the effect below covers the one case they cannot
 * agree on: a tab left open across the boundary.
 */
export default function Demo() {
  const { slug = '' } = useParams<{ slug: string }>();
  const demo = getDemo(slug);

  const [lapsed, setLapsed] = useState(false);

  useEffect(() => {
    if (demo && isExpired(demo)) setLapsed(true);
  }, [demo]);

  if (!demo) return <NotFound />;

  if (lapsed || isExpired(demo)) {
    return <PreviewExpired business={demo.business.name} />;
  }

  const Template = TEMPLATES[demo.template];

  return (
    <>
      <Seo
        title={`${demo.business.name} website preview`}
        description={`A working website preview for ${demo.business.name} in ${demo.business.city}, ${demo.business.state}, built by Joshua Kac.`}
        path={`/demo/${demo.slug}`}
        noindex
        nofollow
      />
      <Template config={demo} />
    </>
  );
}

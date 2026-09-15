import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { getDemo, isExpired } from '../demos';
import { TEMPLATES } from '../demos/templates';
import DemoSubPage from '../demos/components/DemoSubPage';
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
  const { slug = '', page: pageSlug } = useParams<{
    slug: string;
    page?: string;
  }>();
  const demo = getDemo(slug);
  const page = demo?.pages?.find((p) => p.slug === pageSlug);

  const [lapsed, setLapsed] = useState(false);

  useEffect(() => {
    if (demo && isExpired(demo)) setLapsed(true);
  }, [demo]);

  if (!demo) return <NotFound />;
  // A page segment that is not one of this demo's pages is a 404, not a
  // silent fall back to the home page.
  if (pageSlug && !page) return <NotFound />;

  if (lapsed || isExpired(demo)) {
    return <PreviewExpired business={demo.business.name} />;
  }

  const Template = TEMPLATES[demo.template];

  return (
    <>
      <Seo
        title={
          page
            ? `${page.label} | ${demo.business.name} preview`
            : `${demo.business.name} website preview`
        }
        description={`A working website preview for ${demo.business.name} in ${demo.business.city}, ${demo.business.state}, built by Joshua Kac.`}
        path={page ? `/demo/${demo.slug}/${page.slug}` : `/demo/${demo.slug}`}
        noindex
        nofollow
      />
      {page ? (
        <DemoSubPage config={demo} page={page} />
      ) : (
        <Template config={demo} />
      )}
    </>
  );
}

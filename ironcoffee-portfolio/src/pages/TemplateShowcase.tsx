import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { getDemo } from '../demos';
import { TEMPLATES } from '../demos/templates';
import DemoSubPage from '../demos/components/DemoSubPage';
import NotFound from './NotFound';

/**
 * A gallery sample at `/templates/<slug>`.
 *
 * Same config, same template component as a real preview. The only differences
 * live in the config: `showcase` flips the banner and the footer, and this page
 * lets crawlers in where `/demo/<slug>` keeps them out.
 *
 * No structured data is emitted here on purpose. These businesses do not exist,
 * and telling a search engine otherwise in machine-readable form is a different
 * thing from labelling a page as a sample in plain English.
 */
export default function TemplateShowcase() {
  const { slug = '', page: pageSlug } = useParams<{
    slug: string;
    page?: string;
  }>();
  const demo = getDemo(slug);
  const page = demo?.pages?.find((p) => p.slug === pageSlug);

  if (!demo?.showcase) return <NotFound />;
  if (pageSlug && !page) return <NotFound />;

  const Template = TEMPLATES[demo.template];

  return (
    <>
      <Seo
        title={
          page
            ? `${page.label} | ${demo.business.name} sample`
            : `${demo.business.name} sample site`
        }
        description={`A complete sample website for a ${demo.template} business, built by Joshua Kac. ${demo.business.tagline}`}
        path={
          page
            ? `/templates/${demo.slug}/${page.slug}`
            : `/templates/${demo.slug}`
        }
      />
      {page ? (
        <DemoSubPage config={demo} page={page} />
      ) : (
        <Template config={demo} />
      )}
    </>
  );
}

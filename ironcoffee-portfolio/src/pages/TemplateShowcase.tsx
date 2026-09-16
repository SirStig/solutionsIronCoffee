import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { getDemo } from '../demos';
import { site } from '../content/site';
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
 * No structured data describes the *business* here, on purpose. These
 * businesses do not exist, and telling a search engine otherwise in
 * machine-readable form is a different thing from labelling a page as a sample
 * in plain English. Every local type wants an address, a phone number and
 * opening hours, all of which would have to be asserted as fact.
 *
 * The breadcrumb is the exception, and it is a real one: it describes where
 * this page sits in *my* site, not what the business is. Home, then the
 * gallery, then the sample. Nothing in it is a claim about anybody.
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

  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Samples',
        item: `${site.url}/templates`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${demo.business.name} sample`,
        item: `${site.url}/templates/${demo.slug}`,
      },
      ...(page
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: page.label,
              item: `${site.url}/templates/${demo.slug}/${page.slug}`,
            },
          ]
        : []),
    ],
  };

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
        jsonLd={breadcrumbs}
      />
      {page ? (
        <DemoSubPage config={demo} page={page} />
      ) : (
        <Template config={demo} />
      )}
    </>
  );
}

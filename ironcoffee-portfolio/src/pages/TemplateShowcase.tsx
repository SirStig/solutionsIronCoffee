import { useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { getDemo } from '../demos';
import { TEMPLATES } from '../demos/templates';
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
  const { slug = '' } = useParams<{ slug: string }>();
  const demo = getDemo(slug);

  if (!demo?.showcase) return <NotFound />;

  const Template = TEMPLATES[demo.template];

  return (
    <>
      <Seo
        title={`${demo.business.name} sample site`}
        description={`A complete sample website for a ${demo.template} business, built by Joshua Kac. ${demo.business.tagline}`}
        path={`/templates/${demo.slug}`}
      />
      <Template config={demo} />
    </>
  );
}

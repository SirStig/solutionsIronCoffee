import { Suspense, useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import {
  About,
  Apps,
  Blog,
  BlogPost,
  Contact,
  Demo,
  Games,
  NotFound,
  OpenSource,
  PreviewExpired,
  ProjectPage,
  Services,
  TemplateShowcase,
  Templates,
  Work,
} from './routes';
import { logPageView } from './services/analytics';
import './styles/tokens.css';
import './styles/base.css';

/** `/portfolio/:slug` moved to `/work/:slug`; carry the slug across. */
function LegacyProjectRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/work/${slug}`} replace />;
}

/**
 * Pages that replace the whole page rather than sit inside it.
 *
 * A demo stands in for a business's own website, so the portfolio header and
 * footer would be wrong on it in the most literal sense: they belong to a
 * different company. These routes bring their own chrome.
 */
const standalone = [/^\/demo\/[^/]+/, /^\/templates\/[^/]+/, /^\/preview-expired/];

/** Reset scroll position and record a page view on every navigation. */
function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    logPageView(pathname);
  }, [pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const bare = standalone.some((pattern) => pattern.test(pathname));

  // No spinner. The client entry resolves the current route's chunk before
  // hydrating, so this fallback is only reached during in-app navigation, where
  // a flash of loading UI would be worse than a beat of nothing.
  const routes = (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/open-source" element={<OpenSource />} />
        <Route path="/games" element={<Games />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

        <Route path="/templates" element={<Templates />} />
        <Route path="/templates/:slug" element={<TemplateShowcase />} />
        <Route path="/demo/:slug" element={<Demo />} />
        <Route path="/preview-expired" element={<PreviewExpired />} />

        {/* Old URLs from the previous site. .htaccess serves the real 301s;
            these catch client-side navigation only, and redirect rather than
            render so the same content never lives at two URLs. */}
        <Route path="/portfolio" element={<Navigate to="/work" replace />} />
        <Route path="/portfolio/:slug" element={<LegacyProjectRedirect />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );

  return (
    <ThemeProvider>
      {!bare && (
        <>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
        </>
      )}

      <RouteEffects />

      {bare ? routes : <main id="main">{routes}</main>}

      {!bare && <Footer />}
    </ThemeProvider>
  );
}

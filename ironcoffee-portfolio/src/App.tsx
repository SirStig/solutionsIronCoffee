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
  Games,
  NotFound,
  OpenSource,
  ProjectPage,
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
  return (
    <ThemeProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />
      <RouteEffects />

      <main id="main">
        {/* No spinner. The client entry resolves the current route's chunk
            before hydrating, so this fallback is only reached during in-app
            navigation — where a flash of loading UI would be worse than a
            beat of nothing. */}
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

            {/* Old URLs from the previous site. .htaccess serves the real 301s;
                these catch client-side navigation only, and redirect rather
                than render so the same content never lives at two URLs. */}
            <Route path="/portfolio" element={<Navigate to="/work" replace />} />
            <Route
              path="/portfolio/:slug"
              element={<LegacyProjectRedirect />}
            />
            <Route path="/services" element={<Navigate to="/about" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </ThemeProvider>
  );
}

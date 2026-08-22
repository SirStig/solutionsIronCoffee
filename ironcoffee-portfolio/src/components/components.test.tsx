import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Img from './Img';
import ProjectCard from './ProjectCard';
import SocialLinks from './SocialLinks';
import { getProject } from '../content/projects';

const withRouter = (ui: React.ReactNode) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe('<Img>', () => {
  it('emits an AVIF and a WebP source plus a fallback img', () => {
    const { container } = render(<Img name="profile" alt="Joshua Kac" />);

    const types = [...container.querySelectorAll('source')].map((s) =>
      s.getAttribute('type')
    );
    expect(types).toEqual(['image/avif', 'image/webp']);
    expect(screen.getByAltText('Joshua Kac')).toBeInTheDocument();
  });

  it('sets intrinsic width and height so nothing shifts while loading', () => {
    render(<Img name="profile" alt="Joshua Kac" />);
    const img = screen.getByAltText('Joshua Kac');

    expect(img).toHaveAttribute('width');
    expect(img).toHaveAttribute('height');
  });

  it('lazy-loads by default and eager-loads when marked priority', () => {
    const { unmount } = render(<Img name="profile" alt="lazy" />);
    expect(screen.getByAltText('lazy')).toHaveAttribute('loading', 'lazy');
    unmount();

    render(<Img name="profile" alt="eager" priority />);
    expect(screen.getByAltText('eager')).toHaveAttribute('loading', 'eager');
  });

  it('renders nothing for a key that is not in the manifest', () => {
    const { container } = render(<Img name="does/not/exist" alt="missing" />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('<ProjectCard>', () => {
  const project = getProject('beyond25')!;

  it('links to the project page and shows its status', () => {
    withRouter(<ProjectCard project={project} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/work/beyond25');
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText(project.tagline)).toBeInTheDocument();
  });

  it('shows the year instead of an image in compact form', () => {
    const { container } = withRouter(
      <ProjectCard project={project} variant="compact" />
    );

    expect(container.querySelector('picture')).toBeNull();
    expect(screen.getByText(project.year)).toBeInTheDocument();
  });
});

describe('<SocialLinks>', () => {
  it('labels every link and opens external ones safely', () => {
    render(<SocialLinks />);

    const github = screen.getByLabelText('GitHub');
    expect(github).toHaveAttribute('target', '_blank');
    expect(github.getAttribute('rel')).toContain('noopener');

    // mailto: is same-document; a target would break it in some clients.
    expect(screen.getByLabelText('Email')).not.toHaveAttribute('target');
  });
});

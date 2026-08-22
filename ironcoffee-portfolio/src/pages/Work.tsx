import CollectionPage from '../components/CollectionPage';
import { allProjects } from '../content/projects';

export default function Work() {
  return (
    <CollectionPage
      title="Work"
      intro="Everything worth showing — apps, libraries, games and client work. Newest and most active first."
      description="Projects by Joshua Kac — apps, open-source libraries, games and client work."
      path="/work"
      projects={allProjects}
      archiveAfter={8}
    />
  );
}

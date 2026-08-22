import CollectionPage from '../components/CollectionPage';
import { projectsIn } from '../content/projects';

export default function Games() {
  return (
    <CollectionPage
      title="Games"
      intro="Where I started, and where I keep going back. Currently rebuilding a 2002 space sim from scratch in Swift."
      description="Game projects by Joshua Kac, including NovaSwift — a from-scratch Swift rebuild of EV Nova."
      path="/games"
      projects={projectsIn('games')}
      archiveAfter={1}
    />
  );
}

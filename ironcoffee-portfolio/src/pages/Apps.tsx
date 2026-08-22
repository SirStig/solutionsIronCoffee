import CollectionPage from '../components/CollectionPage';
import { projectsIn } from '../content/projects';

export default function Apps() {
  return (
    <CollectionPage
      title="Apps"
      intro="Consumer products I've designed, built and shipped — backend, mobile, web and the infrastructure under them."
      description="Consumer apps built by Joshua Kac, including Beyond25 and Ourlee."
      path="/apps"
      projects={projectsIn('apps')}
    />
  );
}

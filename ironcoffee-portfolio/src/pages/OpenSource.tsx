import CollectionPage from '../components/CollectionPage';
import { projectsIn } from '../content/projects';

export default function OpenSource() {
  return (
    <CollectionPage
      title="Open source"
      intro="Libraries and tools I've published because I needed them first. All MIT unless noted."
      description="Open-source libraries and tools by Joshua Kac — YokedCache, EncodeForge, Expo Media Engine."
      path="/open-source"
      projects={projectsIn('open-source')}
    />
  );
}

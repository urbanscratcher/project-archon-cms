import MainHead from '../ui/Head';
import { MainLayout } from '../ui/MainLayout';
import { MainBody } from '../ui/MainBody';
import TopicsContent from '../features/topics/TopicsContent';

function Topics() {
  return (
    <>
      <MainLayout>
        <MainHead>
          <MainHead.Title>Topics</MainHead.Title>
          <MainHead.Description>A list of topics to be managed (only for admins, editors)</MainHead.Description>
        </MainHead>
        <MainBody>
          <TopicsContent />
        </MainBody>
      </MainLayout>
    </>
  );
}

export default Topics;

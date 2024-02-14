import CreateTopicForm from '../features/topics/CreateTopicForm';
import TopicList from '../features/topics/TopicList';
import MainHead from '../ui/Head';
import { MainBody } from '../ui/MainBody';
import { MainLayout } from '../ui/MainLayout';

function Topics() {
  return (
    <MainLayout>
      <MainHead>
        <MainHead.Title>Topics</MainHead.Title>
        <MainHead.Description>A list of topics to be managed (only for admins, editors)</MainHead.Description>
      </MainHead>
      <MainBody>
        <CreateTopicForm />
        <TopicList.Box>
          <TopicList />
        </TopicList.Box>
      </MainBody>
    </MainLayout>
  );
}

export default Topics;

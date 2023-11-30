import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import topicApi from '../../services/apiTopic';
import Spinner from '../../ui/Spinner';
import TopicsControl from './TopicsControl';
import { Topic } from './topicsStore';

function TopicList() {
  const { data, error, isLoading } = useQuery({ queryKey: ['topics'], queryFn: () => topicApi.getAllList() });
  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <TopicList.Box>
      {data.data.map((t: Topic) => (
        <TopicList.Item key={t.name}>
          <h4 className="capitalize">{t.name}</h4>
          <TopicsControl topic={t} />
        </TopicList.Item>
      ))}
    </TopicList.Box>
  );
}

export default TopicList;

TopicList.Box = function Box({ children }: PropsWithChildren) {
  return <ul className="flex max-w-sm flex-col gap-2 ">{children}</ul>;
};

TopicList.Item = function Item({ children }: PropsWithChildren) {
  return <li className="flex justify-between gap-2">{children}</li>;
};

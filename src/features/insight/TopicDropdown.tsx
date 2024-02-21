import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Topic } from '../../models/Topic';
import topicApi from '../../services/apiTopic';
import Spinner from '../../ui/Spinner';
import DropdownAction from '../../ui/dropdown/DropdownAction';

type TopicDropdownProps = {
  onSelect: Function;
  selected?: Topic;
};

function TopicDropdown({ onSelect, selected }: TopicDropdownProps) {
  const { data: topics, error, isLoading } = useQuery({ queryKey: ['topics'], queryFn: () => topicApi.getAllList() });

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    if (topics?.data && selected) {
      setSelectedTopic(topics.data.filter((el: Topic) => el.idx === selected.idx)[0]);
    }
  }, [topics]);

  if (error) return <p>error</p>;
  if (isLoading) return <Spinner withText={false} />;

  return (
    <DropdownAction<Topic>
      buttonText={selectedTopic ? selectedTopic.name : 'Select a Topic'}
      options={topics?.data}
      selectedOptions={selectedTopic ? [selectedTopic] : []}
      onSelect={(t: Topic) => {
        setSelectedTopic(t);
        onSelect(t);
      }}
      onUnselect={() => {
        setSelectedTopic(null);
        onSelect(null);
      }}
      closedAfterSelect={true}
    />
  );
}

export default TopicDropdown;

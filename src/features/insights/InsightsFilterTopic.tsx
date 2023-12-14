import { useInsightsFilterStore } from './insightsStore';
import DropdownAction from '../../ui/dropdown/DropdownAction';
import { Topic } from '../../models/Topic';
import { useQuery } from '@tanstack/react-query';
import topicApi from '../../services/apiTopic';

export function InsightsFilterTopic() {
  // TODO: change api - get topics only used by a specific user if user is not admin
  const { data: topics, error, isLoading } = useQuery({ queryKey: ['topics'], queryFn: () => topicApi.getAllList() });

  const { selectedTopic, selectTopic, unselectTopic, topicOptions } = useInsightsFilterStore();

  if (error) return <p>error</p>;
  if (isLoading) return <p>loading...</p>;

  return (
    <DropdownAction<Topic>
      buttonText={selectedTopic ? selectedTopic.name : 'Filter by Topic'}
      options={topics ? [...topicOptions, ...topics.data] : [...topicOptions]}
      selectedOptions={selectedTopic ? [selectedTopic] : []}
      onSelect={selectTopic}
      onUnselect={unselectTopic}
      closedAfterSelect={true}
    />
  );
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, type DragEvent, type PropsWithChildren } from 'react';
import { Topic } from '../../models/Topic';
import topicApi from '../../services/apiTopic';
import Spinner from '../../ui/Spinner';
import TopicsControl from './TopicsControl';
import { useTopicsStore } from './topicsStore';

function TopicList() {
  const { data: topics, error, isLoading } = useQuery({ queryKey: ['topics'], queryFn: () => topicApi.getAllList() });
  const [displayedList, setDisplayedList] = useState<Topic[]>([]);

  useEffect(() => {
    if (topics?.data) setDisplayedList(topics.data);
  }, [topics]);

  if (isLoading) return <Spinner />;
  if (error) return <>{error.message}</>;

  const changeList = (newList: Topic[]) => {
    setDisplayedList(newList);
  };

  return (
    <>
      {displayedList.length > 0 &&
        displayedList.map((t: Topic, i: number) => (
          <TopicList.Item
            dataList={topics.data}
            onChangeList={changeList}
            key={t.name}
            idx={i}
          >
            <div className="flex items-center gap-2">
              <h4 className="capitalize">{t.name}</h4>
              <p className="text-sm">({t.total_insights})</p>
            </div>
            <TopicsControl topic={t} />
          </TopicList.Item>
        ))}
    </>
  );
}

export default TopicList;

TopicList.Box = function Box({ children }: PropsWithChildren) {
  return <ul className="flex max-w-md flex-col ">{children}</ul>;
};

TopicList.Item = function Item({
  children,
  idx,
  dataList,
  onChangeList,
}: PropsWithChildren & { idx: number; dataList: Topic[]; onChangeList: (newList: Topic[]) => void }) {
  const [draggable, setDraggable] = useState(false);
  const { setDragged, dragged } = useTopicsStore();
  const [newTopics, setNewTopics] = useState<Topic[]>(dataList);
  const accessToken = localStorage.getItem('access_token') ?? '';
  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    mutationFn: (newList: Topic[]) =>
      topicApi.updateSequence({ idx_sequence: JSON.stringify(newList.map((t) => t.idx)) }, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
  });

  const dragStartHandler = (e: DragEvent) => {
    setDragged(idx);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  };

  const dragEnterHandler = (e: DragEvent) => {
    e.preventDefault();

    const draggedOverIdx = idx;
    if (dragged >= 0) {
      const topics = [...dataList];
      const temp = topics[dragged];
      topics[dragged] = topics[draggedOverIdx];
      topics[draggedOverIdx] = temp;
      setNewTopics(topics);
      onChangeList(topics);
    }
  };

  const dropHandler = (e: DragEvent) => {
    e.preventDefault();
    mutate(newTopics);
    setDraggable(false);
    setDragged(-1);
  };

  const dragEndHandler = (e: DragEvent) => {
    e.preventDefault();
    onChangeList(dataList);
    setDraggable(false);
    setDragged(-1);
  };

  if (error) return <>{error.message}</>;
  if (isPending)
    return (
      <li className="h-12 rounded-md">
        <Spinner withText={false} />
      </li>
    );

  return (
    <li
      className={`grid grid-cols-[max-content_auto] rounded-md p-2 ${draggable && 'bg-zinc-100 dark:bg-zinc-800'}`}
      draggable={draggable}
      data-idx={idx}
      onDragStart={(e: DragEvent) => dragStartHandler(e)}
      onDragEnter={(e: DragEvent) => dragEnterHandler(e)}
      onDragOver={(e: DragEvent) => e.preventDefault()}
      onDrag={(e: DragEvent) => e.preventDefault()}
      onDrop={(e: DragEvent) => dropHandler(e)}
      onDragEnd={(e: DragEvent) => dragEndHandler(e)}
    >
      <button
        className="flex cursor-grab items-center px-2"
        onMouseDown={() => setDraggable(true)}
        onMouseUp={() => setDraggable(false)}
      >
        <span className="icon-[lucide--grip-vertical]"></span>
      </button>
      <div
        role="presentation"
        onMouseDown={() => setDraggable(false)}
        className="flex justify-between"
      >
        {children}
      </div>
    </li>
  );
};

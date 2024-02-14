import { useState, type DragEvent } from 'react';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';

function CareerList({ careers }: { careers: string[] }) {
  const [draggable, setDraggable] = useState(-1);
  const [dragged, setDragged] = useState(-1);
  const [displayedCareers, setDisplayedCareers] = useState(careers);

  const clickDeleteHandler = (e: MouseEvent, clickedIdx: number) => {
    e.preventDefault();
    const tempArr = displayedCareers.filter((_, idx) => idx !== clickedIdx);
    setDisplayedCareers(tempArr);
  };

  const dragStartHandler = (e: DragEvent) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';

    const idxAttribute = e.currentTarget?.getAttribute('data-idx');
    const idx = idxAttribute !== null ? parseInt(idxAttribute, 10) : -1;
    setDragged(idx);
  };

  const dragEnterHandler = (e: DragEvent) => {
    e.preventDefault();
  };

  const dropHandler = (e: DragEvent) => {
    e.preventDefault();

    const droppedIdxAttribute = e.currentTarget?.getAttribute('data-idx');
    const droppedIdx = droppedIdxAttribute !== null ? parseInt(droppedIdxAttribute, 10) : -1;

    if (droppedIdx >= 0 && droppedIdx < displayedCareers.length) {
      const tempArr = [...displayedCareers];
      tempArr[droppedIdx] = displayedCareers[dragged];
      tempArr[dragged] = displayedCareers[droppedIdx];
      setDisplayedCareers(tempArr);
    }

    setDraggable(-1);
    setDragged(-1);
  };

  const dragEndHandler = (e: DragEvent) => {
    e.preventDefault();
    setDraggable(-1);
    setDragged(-1);
  };

  return (
    <ul className="flex flex-col gap-1">
      {displayedCareers.map((career: string, idx: number) => (
        <li
          key={career}
          className={`grid grid-cols-[max-content_auto] rounded-md ${draggable === idx ? 'bg-zinc-100' : ''}`}
          draggable={draggable === idx}
          data-idx={idx}
          onDragStart={(e: DragEvent) => dragStartHandler(e)}
          onDragEnter={(e: DragEvent) => dragEnterHandler(e)}
          onDragOver={(e: DragEvent) => e.preventDefault()}
          onDrag={(e: DragEvent) => e.preventDefault()}
          onDrop={(e: DragEvent) => dropHandler(e)}
          onDragEnd={(e: DragEvent) => dragEndHandler(e)}
        >
          <button
            className="cursor-grab self-center px-2"
            onClick={(e) => e.preventDefault()}
            onMouseDown={() => setDraggable(idx)}
            onMouseUp={() => setDraggable(-1)}
          >
            <span className="icon-[lucide--grip-vertical]"></span>
          </button>
          <div
            role="presentation"
            onMouseDown={() => setDraggable(-1)}
            className="flex gap-1"
          >
            <Input
              value={career}
              onChange={() => console.log('input changed')}
            />
            <Button
              buttonType="borderless"
              size="icon"
              onClick={(e) => clickDeleteHandler(e, idx)}
            >
              <span className="icon-[lucide--trash-2]"></span>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CareerList;

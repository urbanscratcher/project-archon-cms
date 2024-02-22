import { MouseEvent, useState, type DragEvent, ChangeEvent } from 'react';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';

type CareerList = {
  register: any;
  setValue: any;
  careers: string[];
  isPending: boolean;
};

function CareerList({ register, setValue, careers, isPending }: CareerList) {
  const [dispCareers, setDispCareers] = useState(careers);
  const [draggable, setDraggable] = useState(-1);
  const [dragged, setDragged] = useState(-1);

  const clickDeleteHandler = (e: MouseEvent, clickedIdx: number) => {
    e.preventDefault();
    const tempArr = dispCareers.filter((_, idx) => idx !== clickedIdx);
    setDispCareers(tempArr);
    setValue('careers', tempArr);
  };

  const addDisplayedCareers = (e: MouseEvent) => {
    e.preventDefault();
    const tempArr = [...dispCareers];
    tempArr.push('');
    setDispCareers(tempArr);
    setValue('careers', tempArr);
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

    // if el comes in
    if (droppedIdx >= 0 && droppedIdx < dispCareers.length) {
      const tempArr = [...dispCareers];
      tempArr[droppedIdx] = dispCareers[dragged];
      tempArr[dragged] = dispCareers[droppedIdx];
      setDispCareers(tempArr);
      setValue('careers', tempArr);
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
    <>
      <ul className="flex flex-col gap-1">
        {dispCareers.map((career: string, idx: number) => (
          <li
            key={`${career}_${idx}`}
            className={`grid grid-cols-[max-content_auto] rounded-md ${
              draggable === idx && 'bg-zinc-100 dark:bg-zinc-800'
            }`}
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
              className={`self-center px-2 disabled:pointer-events-none disabled:opacity-50`}
              onClick={(e) => e.preventDefault()}
              onMouseDown={() => setDraggable(idx)}
              onMouseUp={() => setDraggable(-1)}
              disabled={isPending}
            >
              <span className="icon-[lucide--grip-vertical]"></span>
            </button>
            <div
              role="presentation"
              onMouseDown={() => setDraggable(-1)}
              className="flex gap-1"
            >
              <Input
                disabled={isPending}
                {...register(`careers.${idx}`, {
                  validate: (text: string) => (text.length > 0 && text.length <= 200) || 'Min 1 and Max 200',
                  onBlur: (e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    const tempArr = [...dispCareers];
                    tempArr[idx] = value;
                    setDispCareers(tempArr);
                  },
                })}
              />
              <Button
                disabled={isPending}
                buttonType="borderless"
                size="icon"
                onClick={(e: MouseEvent) => clickDeleteHandler(e, idx)}
              >
                <span className="icon-[lucide--x]"></span>
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <button
        disabled={isPending}
        className={`mt-1 flex items-center justify-center rounded-md bg-zinc-100 py-3 text-sm font-normal text-zinc-400 hover:bg-zinc-200/50 hover:text-zinc-500 active:bg-zinc-200 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:active:bg-zinc-600/50`}
        onClick={addDisplayedCareers}
      >
        <span className="icon-[lucide--plus] "></span>&nbsp;Add Careers
      </button>
    </>
  );
}

export default CareerList;

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../ui/button/Button';

type AlertDialogProps = {
  title: string;
  description: string;
  onContinue: () => void;
  onCancel: () => void;
};

function AlertDialog({ title, description, onContinue, onCancel }: AlertDialogProps) {
  console.log('Rendering...');

  const [show, setShow] = useState(true);

  if (!show) return null;

  const onClickCancel = () => {
    onCancel();
    setShow(false);
  };

  const onClickContinue = () => {
    onContinue();
    setShow(false);
  };

  return (
    <>
      <div
        role="alertdialog"
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border  border-zinc-300 bg-white p-6 shadow-lg duration-200"
      >
        <div
          role="alert"
          className="flex flex-col gap-2 text-center sm:text-left"
        >
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            size="sm"
            buttonType="muted"
            onClick={onClickCancel}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            buttonType="primary"
            onClick={onClickContinue}
          >
            Continue
          </Button>
        </div>
      </div>
      {createPortal(
        <div className="min-w-screen absolute z-40 min-h-screen w-full bg-zinc-50/30 backdrop-blur-md"></div>,
        document.getElementById('portal') as HTMLElement,
      )}
    </>
  );
}

export default AlertDialog;

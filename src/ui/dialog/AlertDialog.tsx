import { type PropsWithChildren, type ReactNode, useCallback, useState } from 'react';
import Button from '../button/Button';
import Dialog from './Dialog';
import Spinner from '../Spinner';

type AlertDialogProps = {
  title: string;
  description: string;
  continueLabel?: ReactNode;
  cancelLabel?: ReactNode;
  onContinue: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

AlertDialog.Footer = function Footer({ children }: PropsWithChildren) {
  return <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{children}</div>;
};

AlertDialog.Cancel = function Cancel({ children, onClickCancel }: PropsWithChildren & { onClickCancel: () => void }) {
  return (
    <div className="sm:w-fit">
      <Button
        size="sm"
        buttonType="muted"
        onClick={onClickCancel}
      >
        {children}
      </Button>
    </div>
  );
};

AlertDialog.Action = function Action({
  children,
  onClickAction,
  isLoading,
}: PropsWithChildren & { onClickAction: () => void; isLoading?: boolean }) {
  return (
    <div className="sm:w-fit">
      <Button
        size="sm"
        buttonType="primary"
        onClick={onClickAction}
        disabled={isLoading ? true : false}
      >
        {children}
      </Button>
    </div>
  );
};

function AlertDialog({
  title,
  description,
  onContinue,
  continueLabel,
  onCancel,
  cancelLabel,
  children,
  isLoading,
}: AlertDialogProps & PropsWithChildren) {
  // @ts-ignore
  const [show, setShow] = useState(true);

  // used useCallback since it is passed down to a child component
  const onClickCancel = useCallback(() => {
    onCancel();
    setShow(false);
  }, [onCancel]);

  // used useCallback since it is passed down to a child component
  const onClickAction = useCallback(() => {
    onContinue();
    setShow(false);
  }, [onContinue]);

  return (
    <>
      {!closed && (
        <Dialog.Portal>
          <Dialog.Background />
          <Dialog.Box>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description>{description}</Dialog.Description>
            </Dialog.Header>
            {children}
            <AlertDialog.Footer>
              <AlertDialog.Cancel onClickCancel={onClickCancel}>{cancelLabel ?? 'Cancel'}</AlertDialog.Cancel>
              <AlertDialog.Action
                isLoading={isLoading}
                onClickAction={onClickAction}
              >
                {isLoading ? (
                  <Spinner
                    light
                    withText={false}
                  />
                ) : (
                  continueLabel ?? 'Continue'
                )}
              </AlertDialog.Action>
            </AlertDialog.Footer>
          </Dialog.Box>
        </Dialog.Portal>
      )}
    </>
  );
}

export default AlertDialog;

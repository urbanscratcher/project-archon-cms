import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import topicApi from '../services/apiTopic';
import Error from './Error';
import MainHeader from '../ui/MainHeader';
import Button from '../ui/button/Button';
import AlertDialog from '../ui/dialog/AlertDialog';
import Dialog from '../ui/dialog/Dialog';
import Input from '../ui/input/Input';
import { MainLayout } from './Users';
import CreateTopic from '../features/topics/CreateTopic';

type Topic = {
  idx: number;
  name: string;
  seq: number;
  total_insights: number;
};

function Topics() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editIdx, setEditIdx] = useState(0);
  const [editName, setEditName] = useState('');

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(0);

  const queryClient = useQueryClient();
  const inputRef = useRef(null);
  const createInputRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem('access_token') ?? '';

  // update
  const {
    mutate,
    isPending,
    error: updateError,
  } = useMutation({
    mutationFn: ({ name }: { name: string }) => topicApi.updateName(editIdx, { name }, token),
    onSuccess: () => {
      console.log('success');
      queryClient.refetchQueries({ queryKey: ['topics'] });
    },
    onError: (error) => {
      console.log('error...', error);
    },
  });

  // delete
  const {
    mutate: deleteMutate,
    isPending: isDeletePending,
    error: deleteError,
  } = useMutation({
    mutationFn: ({ idx }: { idx: number }) => topicApi.delete(idx, token),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['topics'] });
    },
    onError: (error) => {
      console.log('error...', error);
    },
  });

  // loading data
  const { data, error, isLoading } = useQuery({ queryKey: ['topics'], queryFn: () => topicApi.getAllList() });
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  const onEditHandler = () => {
    //db update
    mutate({ name: editName });

    //close
    setShowEditDialog(false);
  };

  const onDeleteHandler = () => {
    // db update
    deleteMutate({ idx: deleteIdx });

    // close
    setShowDeleteDialog(false);
  };

  const clickEditHandler = (e, t) => {
    setShowEditDialog(true);
    setEditIdx(t.idx);
    setEditName(t.name);
  };

  const clickDeleteHandler = (e, t) => {
    setShowDeleteDialog(true);
    setDeleteIdx(t.idx);
  };

  return (
    <>
      {showEditDialog && (
        <Dialog
          title="Edit Topic Name"
          description="Make changes to topic name here. Click save when you're done"
          actionName="Save changes"
          onAction={onEditHandler}
        >
          {isPending && <div>loading...</div>}
          {updateError && <Error>{updateError.message}</Error>}
          {!isPending && !updateError && (
            <Input
              placeholder={editName}
              ref={inputRef}
              onChange={(e) => setEditName(e.target.value)}
            />
          )}
        </Dialog>
      )}
      {showDeleteDialog && (
        <AlertDialog
          title="Are you sure?"
          description="Your action to delete can't be restored again"
          onContinue={onDeleteHandler}
          onCancel={() => {}}
        >
          {isDeletePending && <div>loading...</div>}
          {deleteError && <Error>{deleteError.message}</Error>}
        </AlertDialog>
      )}
      <MainLayout>
        <MainHeader
          title="Topics"
          desc="A list of topics to be managed (only for admins, editors)"
        />
        <CreateTopic
          token={token}
          queryClient={queryClient}
        />
        <ul className="flex max-w-sm flex-col gap-2 ">
          {data.data.map((t: Topic) => (
            <li
              key={t.name}
              className="flex justify-between gap-2"
            >
              <h4 className="capitalize">{t.name}</h4>
              <div className="flex">
                <Button
                  buttonType="borderless"
                  size="icon"
                  onClick={(e) => clickEditHandler(e, t)}
                >
                  <span className="icon-[lucide--edit]"></span>
                </Button>
                <Button
                  buttonType="borderless"
                  size="icon"
                  onClick={(e) => clickDeleteHandler(e, t)}
                >
                  <span className="icon-[lucide--trash-2]"></span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </MainLayout>
    </>
  );
}

export default Topics;

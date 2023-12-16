import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Cover, CoversSchema } from '../../models/Cover';
import { Insight } from '../../models/Insights';
import ToggleBtn from '../../ui/button/ToggleBtn';
import coverApi from '../../services/apiCover';
import Spinner from '../../ui/Spinner';

function InsightsCoverCell({ insight }: { insight: Insight }) {
  const queryClient = useQueryClient();

  const {
    data: coversQueryData,
    isPending: isCoversPending,
    error: coversError,
  } = useQuery({ queryKey: ['covers'], queryFn: () => coverApi.getAllList() });

  const accessToken = localStorage.getItem('access_token') ?? '';
  const [covers, setCovers] = useState<Cover[]>([]);
  const [isCover, setIsCover] = useState(false);
  const [isMain, setIsMain] = useState(false);
  const [checked, setChecked] = useState(false);

  // create cover
  const {
    mutate: create,
    isPending: isCreatePending,
    error: createError,
  } = useMutation({
    mutationFn: (params: { body: any; accessToken: string }) => coverApi.create(params.body, params.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['covers'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // remove cover
  const {
    mutate: remove,
    isPending: isRemovePending,
    error: removeError,
  } = useMutation({
    mutationFn: (idx: number) => coverApi.remove(idx, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['covers'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (coversQueryData) {
      const coversData = CoversSchema.safeParse(coversQueryData);
      coversData.success && setCovers(coversData.data.data);
    }
  }, [coversQueryData]);

  useEffect(() => {
    if (covers.length > 0) {
      const checkedInitial = covers.some((c: Cover) => c.insight.idx === insight.idx);
      setChecked(checkedInitial);
    }

    setIsCover(covers.some((c: Cover) => c.insight.idx === insight.idx));
    setIsMain(covers.some((c: Cover) => c.insight.idx === insight.idx && c.isMain === true));
  }, [covers]);

  const onSetChecked = () => {
    if (checked === false) {
      const params = { body: { insight_idx: insight.idx }, accessToken };
      create(params);
    } else {
      const idx = covers.filter((c) => c.insight.idx === insight.idx)[0].idx;
      remove(idx);
    }
    setChecked(!checked);
  };

  const TOTAL_LIMIT = 5;

  if (coversError) return <>{coversError.message}</>;
  if (isCoversPending) return <Spinner withText={false} />;
  if (removeError) return <>{removeError.message}</>;
  if (isRemovePending) return <Spinner withText={false} />;
  if (createError) return <>{createError.message}</>;
  if (isCreatePending) return <Spinner withText={false} />;

  return (
    <>
      {covers.length >= TOTAL_LIMIT && !isCover ? null : (
        <ToggleBtn
          checked={checked}
          onSetChecked={onSetChecked}
          disabled={isMain}
        />
      )}
    </>
  );
}

export default InsightsCoverCell;

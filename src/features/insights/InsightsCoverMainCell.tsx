import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Cover, CoversSchema } from '../../models/Cover';
import { Insight } from '../../models/Insights';
import coverApi from '../../services/apiCover';
import Spinner from '../../ui/Spinner';
import ToggleBtn from '../../ui/button/ToggleBtn';

function InsightsCoverMainCell({ insight }: { insight: Insight }) {
  const queryClient = useQueryClient();

  const {
    data: coversQueryData,
    isPending: isCoversPending,
    error: coversError,
  } = useQuery({ queryKey: ['covers'], queryFn: () => coverApi.getAllList() });

  const accessToken = localStorage.getItem('access_token') ?? '';
  const [covers, setCovers] = useState<Cover[]>([]);
  const [isCover, setIsCover] = useState(false);
  const [checked, setChecked] = useState(false);

  // update main cover
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => coverApi.updateMain(covers.filter((c) => c.insight.idx === insight.idx)[0].idx, accessToken),
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
      const checkedInitial = covers.some((c: Cover) => c.insight.idx === insight.idx && c.isMain === true);
      setChecked(checkedInitial);
    }

    setIsCover(covers.some((c: Cover) => c.insight.idx === insight.idx));
  }, [covers]);

  const onSetChecked = () => {
    mutate();
    setChecked(!checked);
  };

  if (coversError) return <>{coversError.message}</>;
  if (isCoversPending) return <Spinner withText={false} />;
  if (error) return <>{error.message}</>;
  if (isPending) return <Spinner withText={false} />;

  return (
    <>
      {isCover && (
        <div className="flex items-center gap-1">
          <ToggleBtn
            checked={checked}
            onSetChecked={onSetChecked}
            disabled={checked}
          />
          {checked && <span className="icon-[lucide--lock] text-zinc-500"></span>}
        </div>
      )}
    </>
  );
}

export default InsightsCoverMainCell;

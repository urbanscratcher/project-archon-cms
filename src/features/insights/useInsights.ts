import { useQuery } from '@tanstack/react-query';
import { QueryParam } from '../../models/QueryParam';
import insightApi from '../../services/apiInsight';

function useInsights(params?: QueryParam) {
  const {
    isLoading,
    data: insights,
    error,
  } = useQuery({ queryKey: ['insights'], queryFn: () => insightApi.getAllList() });

  return { isLoading, insights, error };
}

export default useInsights;

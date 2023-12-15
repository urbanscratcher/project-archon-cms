import { useQuery } from '@tanstack/react-query';
import coverApi from '../../services/apiCover';

function useGetAllCovers() {
  const { isLoading, data: covers, error } = useQuery({ queryKey: ['covers'], queryFn: () => coverApi.getAllList() });
  return { isLoading, covers, error };
}

export default useGetAllCovers;

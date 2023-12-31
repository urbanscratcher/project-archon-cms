import { useNavigate } from 'react-router-dom';

export function useMoveBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}

export function useRefresh() {
  const navigate = useNavigate();
  return () => navigate(0);
}

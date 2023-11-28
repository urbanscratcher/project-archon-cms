import { useNavigate } from 'react-router-dom';

export function useRefresh() {
  const navigate = useNavigate();
  return () => navigate(0);
}

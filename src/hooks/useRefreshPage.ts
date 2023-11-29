import { useNavigate } from 'react-router-dom';

export function useRefreshPage() {
  const navigate = useNavigate();
  return () => navigate(0);
}

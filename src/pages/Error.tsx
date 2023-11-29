import { useRefreshPage } from '../hooks/useRefreshPage';
import Button from '../ui/button/Button';

function Error({ error }: { error: Error }) {
  const refresh = useRefreshPage();

  return (
    <div className="flex flex-col items-center text-center">
      <h2>Something went Wrong</h2>
      <p className="mb-8">{error?.message}</p>
      <Button
        buttonType="primary"
        size="md"
        onClick={() => refresh()}
      >
        Retry <span className="icon-[lucide--rotate-ccw]"></span>
      </Button>
    </div>
  );
}

export default Error;

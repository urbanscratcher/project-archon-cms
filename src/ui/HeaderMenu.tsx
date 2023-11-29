import { ReactNode } from 'react';
import useSignOut from '../features/authentication/useSignOut';
import Button from './button/Button';

function HeaderMenu(): ReactNode {
  const onSignOut = useSignOut();
  return (
    <ul className="flex scale-125">
      <li>
        <Button
          buttonType="borderless"
          size="icon"
          onClick={() => {}}
        >
          <span className="icon-[lucide--moon]" />
        </Button>
      </li>
      <li>
        <Button
          buttonType="borderless"
          size="icon"
          onClick={onSignOut}
        >
          <span className="icon-[lucide--log-out]" />
        </Button>
      </li>
    </ul>
  );
}

export default HeaderMenu;

import { ReactNode } from 'react';
import IconBtn from './button/IconBtn';

function HeaderMenu(): ReactNode {
  return (
    <ul className="flex gap-1">
      <li>
        <IconBtn
          icon="icon-[lucide--moon]"
          onClick={() => {
            console.log('click');
          }}
        />
      </li>
      <li>
        <IconBtn
          icon="icon-[lucide--log-out]"
          onClick={() => {
            console.log('click');
          }}
        />
      </li>
    </ul>
  );
}

export default HeaderMenu;

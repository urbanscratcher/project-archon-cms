import { ReactNode } from 'react';

function HeaderMenu(): ReactNode {
  return (
    <ul className="flex gap-2">
      <li>account btn</li>
      <li>dark mode btn</li>
      <li>logout btn</li>
    </ul>
  );
}

export default HeaderMenu;

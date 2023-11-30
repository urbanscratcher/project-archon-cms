import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

type NavMenuItemProps = {
  icon: string;
  text: string;
};

export default function NavMenu({ children }: PropsWithChildren) {
  return <ul className="flex flex-col gap-2">{children}</ul>;
}

NavMenu.Item = function Item({ icon, text }: NavMenuItemProps) {
  return (
    <li className="cursor-pointer">
      <NavLink
        to={`/${text}`}
        className={({ isActive, isPending }) => {
          const style = isPending ? 'link-pending' : isActive ? 'link-active' : '';
          return `${style}
            inline-flex
            w-full 
            items-center justify-start
            gap-3            
            whitespace-nowrap
            rounded-md 
            px-4 py-2
            transition-colors
            hover:bg-zinc-100
            active:bg-zinc-200/50
          `;
        }}
      >
        <span className={`${icon} h-6 w-6`}></span>
        <p className="text-lg font-medium capitalize">{text}</p>
      </NavLink>
    </li>
  );
};

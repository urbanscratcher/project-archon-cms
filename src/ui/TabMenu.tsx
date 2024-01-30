import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

type TabMenuItemProps = {
  text: string;
  icon?: string;
  linkTo?: string;
};

export default function TabMenu({ children }: PropsWithChildren) {
  return <ul className="flex gap-2">{children}</ul>;
}

TabMenu.Item = function Item({ icon, text, linkTo }: TabMenuItemProps) {
  return (
    <li className="cursor-pointer">
      <NavLink
        to={linkTo ? `/${linkTo}` : `/${text}`}
        className={({ isActive, isPending }) => {
          const style = isPending ? 'link-pending' : isActive ? 'link-active' : '';
          return `${style}
            inline-flex
            w-full 
            items-center justify-start
            gap-3            
            whitespace-nowrap
            rounded-full 
            px-4 py-2
            text-sm
            transition-colors
            hover:bg-zinc-100
            active:bg-zinc-200/50
          `;
        }}
      >
        {icon && <span className={`${icon} h-6 w-6`}></span>}
        <p className="text-lg font-medium capitalize">{text}</p>
      </NavLink>
    </li>
  );
};

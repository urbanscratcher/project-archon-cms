import { NavLink } from 'react-router-dom';
import Icon from './Icon';

type SidebarMenuItemProps = {
  icon: string;
  text: string;
};

function SidebarMenuItem({ icon, text }: SidebarMenuItemProps) {
  return (
    <li className="cursor-pointer">
      <NavLink
        to={`/${text}`}
        className={({ isActive, isPending }) => {
          const style = isPending ? 'link-pending' : isActive ? 'link-active' : '';
          return `${style} flex items-center gap-3 rounded-lg px-6 py-3 hover:bg-zinc-100 active:bg-zinc-200/50`;
        }}
      >
        <Icon icon={icon} />
        <p className="text-lg font-medium capitalize">{text}</p>
      </NavLink>
    </li>
  );
}

function SidebarMenu() {
  return (
    <ul className="flex flex-col gap-2">
      <SidebarMenuItem
        icon="icon-[lucide--user-2]"
        text="users"
      />
      <SidebarMenuItem
        icon="icon-[lucide--tag]"
        text="topics"
      />
      <SidebarMenuItem
        icon="icon-[lucide--pen-square]"
        text="insights"
      />
      <SidebarMenuItem
        icon="icon-[lucide--book-marked]"
        text="covers"
      />
      <SidebarMenuItem
        icon="icon-[lucide--settings]"
        text="setting"
      />
      <SidebarMenuItem
        icon="icon-[lucide--user-circle-2]"
        text="account"
      />
    </ul>
  );
}

export default SidebarMenu;

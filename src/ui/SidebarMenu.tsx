import { NavLink } from 'react-router-dom';

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
        icon="icon-[lucide--user-circle-2]"
        text="Profile"
      />
    </ul>
  );
}

export default SidebarMenu;

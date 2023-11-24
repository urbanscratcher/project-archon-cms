type IconBtnProps = {
  icon: string;
  onClick: () => void;
};
function IconBtn({ icon, onClick }: IconBtnProps) {
  return (
    <button
      className="h-10 w-10 rounded-lg pt-1 hover:bg-zinc-100 active:bg-zinc-200/50"
      onClick={onClick}
    >
      <span className={`${icon} h-6 w-6 scale-[90%]`} />
    </button>
  );
}

export default IconBtn;

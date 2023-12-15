type ToggleBtnProps = {
  checked: boolean;
  onSetChecked: (value: boolean) => void;
  disabled: boolean;
  onSetDisabled?: (value: boolean) => void;
};
function ToggleBtn({ checked, onSetChecked, disabled, onSetDisabled }: ToggleBtnProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onSetChecked(!checked);
      }}
      role="switch"
      aria-checked={checked}
      data-state={checked ? 'checked' : 'unchecked'}
      value="on"
      disabled={disabled}
      className="flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zinc-700 data-[state=unchecked]:bg-zinc-300"
    >
      <span
        data-state={checked ? 'checked' : 'unchecked'}
        className="pointer-events-none block h-4 w-4 rounded-full bg-zinc-50 shadow-lg transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      />
    </button>
  );
}

export default ToggleBtn;

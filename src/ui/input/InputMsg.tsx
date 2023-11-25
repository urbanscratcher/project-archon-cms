type InputMsg = {
  msg?: string;
};

function InputMsg({ msg }: InputMsg) {
  if (!msg) return;

  return (
    <div
      className={`pointer-events-none absolute right-1 top-1/2 translate-y-[-50%] bg-white px-3 text-sm leading-6 text-zinc-400`}
    >
      {`${msg}`}
    </div>
  );
}

export default InputMsg;

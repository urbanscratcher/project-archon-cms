type SignFormHeader = {
  title: string;
  description: string;
};

function SignFormHeader({ title, description }: SignFormHeader) {
  return (
    <div className="mb-4 flex flex-col">
      <h2 className="text-navy-700">{title}</h2>
      <p className="text-zinc-500">{description}</p>
    </div>
  );
}

export default SignFormHeader;

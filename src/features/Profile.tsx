function Avatar() {
  return <div className="h-8 w-8 rounded-full bg-zinc-400"></div>;
}

function Profile() {
  return (
    <div className="flex items-center gap-4">
      <Avatar />
      <p>Stacy Black</p>
    </div>
  );
}

export default Profile;

import { MouseEvent, useRef, useState } from 'react';
import { User } from '../../models/Users';
import { Avatar } from '../../ui/Avatar';
import Form from '../../ui/Form';
import MainHead from '../../ui/Head';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import CareerList from './CareerList';

function ProfileSeting({ user }: { user: User }) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>(user?.avatar);
  const uploadInputEl = useRef<HTMLInputElement>(null);

  // set careers data
  let careers;
  if (user?.careers) {
    try {
      careers = JSON.parse(user.careers.slice(1, -1).replace(/'/g, '"'));
    } catch (e) {
      careers = undefined;
    }
  }

  // avatar preview
  function uploadClickHandler(e: MouseEvent) {
    e.preventDefault();
    uploadInputEl.current && uploadInputEl.current.click();
  }

  function uploadChangeHandler(e: any) {
    // check if a file exists
    if (e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const fr = new FileReader();
    fr.onload = (e) => {
      const buffer = e.target && (e.target.result as string);
      setAvatar(buffer);
    };
    fr.readAsDataURL(file);
    setAvatarFile(file);
  }

  return (
    <Form
      onSubmit={() => console.log('submit')}
      borderless
    >
      <MainHead>
        <MainHead.Title>Profile</MainHead.Title>
        <MainHead.Description>This is how others will see you on the site.</MainHead.Description>
      </MainHead>
      <Form.RowVertical className="flex-1 py-3 lg:max-w-2xl">
        <Form.RowVertical
          label={'Avatar'}
          // error={errors?.first_name?.message as string}
        >
          <Form.RowHorizontal className="flex-wrap gap-4">
            <div className="relative flex h-28 w-28 items-center justify-center">
              {avatar === user.avatar && (
                <Avatar
                  src={user.avatar}
                  isLarge
                ></Avatar>
              )}
              {avatar !== user.avatar && avatar !== null && (
                <>
                  <Avatar
                    isLarge
                    src={avatar}
                  />
                  <button
                    className="absolute right-0 top-0 flex h-6 w-6 translate-x-[50%] translate-y-[-50%] items-center justify-center rounded-full bg-white hover:bg-zinc-100"
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      setAvatar(user.avatar);
                    }}
                  >
                    <span className="icon-[lucide--undo-2] h-5 w-5 bg-zinc-800"></span>
                  </button>
                </>
              )}
            </div>
            <Form.RowVertical className="w-[500px] place-self-center">
              <Form.RowHorizontal>
                <Button
                  buttonType="muted"
                  size="sm"
                  onClick={uploadClickHandler}
                >
                  Upload
                </Button>
                <input
                  hidden
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={uploadChangeHandler}
                  ref={uploadInputEl}
                />
                <Button
                  buttonType="muted"
                  size="sm"
                  onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    setAvatar('');
                  }}
                >
                  Remove
                </Button>
              </Form.RowHorizontal>

              <p className="inline-flex text-sm text-zinc-500">
                Recommended: Square JPG or PNG at most 150 pixels per side
              </p>
            </Form.RowVertical>
          </Form.RowHorizontal>
        </Form.RowVertical>
        <Form.RowVertical>
          <Form.RowVertical
            label={'First Name'}
            // error={errors?.first_name?.message as string}
          >
            <Input
              name="firstName"
              type="text"
              value={user.firstName}
              disabled={false}
              onChange={() => console.log('input changed')}
            />
          </Form.RowVertical>
          <Form.RowVertical
            label={'Last Name'}
            // error={errors?.first_name?.message as string}
          >
            <Input
              name="lastName"
              type="text"
              value={user.lastName}
              disabled={false}
              onChange={() => console.log('input changed')}
            />
          </Form.RowVertical>
        </Form.RowVertical>

        {/* only for writers */}
        <Form.RowVertical
          label={'Job Title'}
          // error={errors?.first_name?.message as string}
        >
          <Input
            name="jobTitle"
            type="text"
            value={user.jobTitle}
            disabled={false}
            onChange={() => console.log('input changed')}
          />
        </Form.RowVertical>
        <Form.RowVertical
          label={'Bio'}
          // error={errors?.first_name?.message as string}
        >
          <Input
            name="biography"
            type="text"
            value={user.biography}
            disabled={false}
            onChange={() => console.log('input changed')}
          />
        </Form.RowVertical>

        {careers && (
          <Form.RowVertical
            label={'Careers'}
            // error={errors?.first_name?.message as string}
          >
            <CareerList careers={careers} />
          </Form.RowVertical>
        )}
        <Form.RowVertical>
          <Button
            type="submit"
            size="md"
            buttonType="primary"
            onClick={(e) => {
              e.preventDefault();
              console.log(avatarFile);
            }}
          >
            Update
          </Button>
        </Form.RowVertical>
      </Form.RowVertical>
    </Form>
  );
}

export default ProfileSeting;

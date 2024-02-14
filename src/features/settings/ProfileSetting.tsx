import { MouseEvent } from 'react';
import { User } from '../../models/Users';
import { Avatar } from '../../ui/Avatar';
import Form from '../../ui/Form';
import MainHead from '../../ui/Head';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import CareerList from './CareerList';

function ProfileSeting({ user }: { user: User }) {
  let careers;
  if (user?.careers) {
    try {
      careers = JSON.parse(user.careers.slice(1, -1).replace(/'/g, '"'));
    } catch (e) {
      careers = undefined;
    }
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
            <Avatar
              url={user.avatar}
              isLarge
            />
            <Form.RowVertical className="w-[500px] place-self-center">
              <Form.RowHorizontal>
                <Button
                  buttonType="muted"
                  size="sm"
                  onClick={(e: MouseEvent) => e.preventDefault()}
                >
                  Upload
                </Button>

                <Button
                  buttonType="muted"
                  size="sm"
                  onClick={(e: MouseEvent) => e.preventDefault()}
                >
                  Set Default
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
          >
            Update
          </Button>
        </Form.RowVertical>
      </Form.RowVertical>
    </Form>
  );
}

export default ProfileSeting;

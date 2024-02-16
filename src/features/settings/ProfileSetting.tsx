import { MouseEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../../models/Users';
import Error from '../../pages/Error';
import { Avatar } from '../../ui/Avatar';
import Form from '../../ui/Form';
import MainHead from '../../ui/Head';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import CareerList from './CareerList';
import useUpdateProfile from './useUpdateProfile';
import CheckBox from '../../ui/CheckBox';
import { Topic } from '../../models/Topic';
import { useQuery } from '@tanstack/react-query';
import topicApi from '../../services/apiTopic';

function ProfileSeting({ user }: { user: User }) {
  const [avatar, setAvatar] = useState<string | null>(user?.avatar);
  const uploadInputEl = useRef<HTMLInputElement>(null);
  const { updateProfile, isPending, error } = useUpdateProfile();
  const [submitted, setSubmitted] = useState(false);

  // get all topics
  const {
    data: topics,
    error: topicsError,
    isLoading: topicsIsLoading,
  } = useQuery({ queryKey: ['topics'], queryFn: () => topicApi.getAllList() });

  // parse careers data to array
  let careers;
  if (user?.careers) {
    try {
      careers = JSON.parse('[' + user.careers.slice(1, -1).replace(/'/g, '"') + ']');
    } catch (e) {
      careers = undefined;
    }
  }

  // submit form
  const { register, getValues, handleSubmit, formState, setValue } = useForm({
    defaultValues: {
      idx: user.idx,
      avatar_file: null,
      avatar: user.avatar,
      first_name: user.firstName,
      last_name: user.lastName,
      job_title: user.jobTitle,
      biography: user.biography,
      shouldRemove: false,
      careers: careers,
      topics: user.topics,
    },
  });

  // preview avatar
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
    setValue('avatar_file', file);
    setSubmitted(false);
    setValue('shouldRemove', false);
  }

  const submitHandler = async (data: any): Promise<void> => {
    // update profile
    await updateProfile(data);

    // change state to submitted
    setSubmitted(true);
  };

  return (
    <>
      {!error ? (
        <Form
          onSubmit={handleSubmit(submitHandler)}
          className="lg:max-w-3xl"
        >
          <MainHead>
            <MainHead.Title>Profile</MainHead.Title>
            <MainHead.Description>This is how others will see you on the site.</MainHead.Description>
          </MainHead>
          <hr />
          <Form.RowVertical className="flex-1 py-3">
            <Form.RowVertical label={'Avatar'}>
              <Form.RowHorizontal className="flex-wrap items-center gap-4">
                <div className="relative flex h-28 w-28 items-center justify-center">
                  {isPending ? (
                    <Spinner withText={false} />
                  ) : (
                    <>
                      {((avatar === user.avatar && !submitted) || submitted) && (
                        <Avatar
                          src={avatar ?? ''}
                          isLarge
                        ></Avatar>
                      )}
                      {avatar !== user.avatar && avatar !== null && !submitted && (
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
                              setValue('avatar_file', null);
                              setValue('shouldRemove', false);
                            }}
                          >
                            <span className="icon-[lucide--undo-2] h-5 w-5 bg-zinc-800"></span>
                          </button>
                        </>
                      )}
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
                        setValue('avatar_file', null);
                        setSubmitted(false);
                        setValue('shouldRemove', true);
                      }}
                    >
                      Default
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
                error={formState.errors?.first_name?.message as string}
              >
                <Input
                  {...register('first_name', { required: 'Required', validate: (v) => v.length <= 50 || 'Maximum 50' })}
                  type="text"
                  disabled={false}
                />
              </Form.RowVertical>
              <Form.RowVertical
                label={'Last Name'}
                error={formState.errors?.last_name?.message as string}
              >
                <Input
                  {...register('last_name', { required: 'Required', validate: (v) => v.length <= 50 || 'Maximum 50' })}
                  type="text"
                  disabled={false}
                />
              </Form.RowVertical>
            </Form.RowVertical>

            {/* only for writers */}
            <Form.RowVertical
              label={'Job Title'}
              error={formState.errors?.job_title?.message as string}
            >
              <Input
                {...register('job_title', { validate: (v) => v.length <= 150 || 'Maximum 150' })}
                type="text"
                disabled={false}
              />
            </Form.RowVertical>
            <Form.RowVertical
              label={'Bio'}
              error={formState.errors?.biography?.message as string}
            >
              <Input
                {...register('biography')}
                type="text"
                disabled={false}
              />
            </Form.RowVertical>
            {careers && (
              <Form.RowVertical label={'Careers'}>
                <CareerList
                  register={register}
                  careers={getValues('careers')}
                  setValue={setValue}
                />
              </Form.RowVertical>
            )}
            <Form.RowVertical label={'Topics'}>
              <ul className="mt-1 flex flex-wrap gap-8">
                {!topicsIsLoading &&
                  !topicsError &&
                  topics.data.map((topic: Topic) => (
                    <li key={topic.name}>
                      <CheckBox
                        id={topic.name}
                        labelText={topic.name}
                        onClicked={(e: MouseEvent) => {
                          const tempArr =
                            getValues('topics') && getValues('topics').length > 0 ? [...getValues('topics')] : [];

                          const checked: boolean = e.currentTarget.getAttribute('data-state') === 'unchecked';

                          if (checked) {
                            tempArr.push(topic);
                          } else {
                            const excludeIdx = tempArr.findIndex((userTopic) => userTopic.idx === topic.idx);
                            if (excludeIdx !== -1) {
                              tempArr.splice(excludeIdx, 1);
                            }
                          }

                          setValue('topics', tempArr);
                        }}
                        clicked={
                          getValues('topics')
                            ? getValues('topics').some((userTopic: Topic) => userTopic.idx === topic.idx)
                            : false
                        }
                      />
                    </li>
                  ))}
              </ul>
            </Form.RowVertical>
            <Form.RowVertical className="items-end">
              <Button
                size="md"
                buttonType="primary"
                className="w-fit"
                disabled={isPending}
              >
                {isPending ? (
                  <Spinner
                    withText={false}
                    light
                  />
                ) : (
                  'Update'
                )}
              </Button>
            </Form.RowVertical>
          </Form.RowVertical>
        </Form>
      ) : (
        // display error -> refresh page
        <Error />
      )}
    </>
  );
}

export default ProfileSeting;

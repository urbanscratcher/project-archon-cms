import { User } from '../../models/Users';
import Form from '../../ui/Form';
import MainHead from '../../ui/Head';
import Button from '../../ui/button/Button';

function DisplaySetting() {
  // get localstorage
  return (
    <Form
      onSubmit={() => console.log('submit')}
      borderless
    >
      <MainHead>
        <MainHead.Title>Display</MainHead.Title>
        <MainHead.Description>
          Customize the appearance of the app. Automatically switch between day and night themes.
        </MainHead.Description>
      </MainHead>
      <Form.RowVertical className="flex-1 py-3 lg:max-w-2xl">
        <Form.RowVertical
          label={'Theme'}
          // error={errors?.first_name?.message as string}
        >
          <p>Light vs. Black</p>
        </Form.RowVertical>
        <Form.RowVertical
          label={'Font'}
          // error={errors?.first_name?.message as string}
        >
          <input
            type="select"
            value={'Inter'}
          />
        </Form.RowVertical>
        <Button
          type="submit"
          size="md"
          buttonType="primary"
        >
          Update
        </Button>
      </Form.RowVertical>
    </Form>
  );
}

export default DisplaySetting;

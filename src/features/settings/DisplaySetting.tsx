import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import MainHead from '../../ui/Head';
import RadioGroup from '../../ui/RadioGroup';
import SlideBar from '../../ui/SlideBar';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';

function DisplaySetting() {
  const savedTextSize = localStorage.getItem('text_size');
  const [selectedFont, setSelectedFont] = useState('Inter');
  const labelTexts = ['Inter', 'PT Serif', 'Inconsolata'];
  const [textSize, setTextSize] = useState(savedTextSize ? +savedTextSize : 100);
  const isPending = false;
  const [previewSize, setPreviewSize] = useState({
    big: 30,
    bigLeading: 36,
    default: 16,
    defaultLeading: 24,
    small: 14,
    smallLeading: 20,
  });

  useEffect(() => {
    setPreviewSize({
      big: 30 * textSize * 0.01,
      bigLeading: 36 * textSize * 0.01,
      default: 16 * textSize * 0.01,
      defaultLeading: 24 * textSize * 0.01,
      small: 14 * textSize * 0.01,
      smallLeading: 20,
    });
  }, [textSize]);

  const { handleSubmit } = useForm();

  const submitHandler = () => {
    localStorage.setItem('font', selectedFont);
    localStorage.setItem('text_size', textSize + '');

    const root = document.documentElement;
    const curTextSize = 16;
    root.style.setProperty('font-size', curTextSize * 0.01 * textSize + 'px');
    root.style.fontFamily = selectedFont;
  };

  return (
    <Form
      onSubmit={handleSubmit(submitHandler)}
      className="lg:max-w-3xl"
      borderless
    >
      <MainHead>
        <MainHead.Title>Display</MainHead.Title>
        <MainHead.Description>
          Customize the appearance of the app. Select a font and proper text size at your convenience.
        </MainHead.Description>
      </MainHead>
      <hr />
      <Form.RowVertical className="flex-1 py-3 lg:max-w-2xl">
        <Form.RowHorizontal className="items-center gap-9">
          <Form.RowVertical label={'Font'}>
            <RadioGroup
              labelTexts={labelTexts}
              defaultText={'Inter'}
              selected={selectedFont}
              setSelected={setSelectedFont}
            />
            <div className="mt-5">
              <SlideBar
                labelText="Text Size"
                value={textSize}
                setValue={setTextSize}
                min={80}
                max={120}
                step={2}
                unit={'%'}
              />
            </div>
          </Form.RowVertical>
          <Form.RowVertical
            className="h-full"
            style={{ fontFamily: `${selectedFont}` }}
          >
            <p
              className={`leading-[36px]`}
              style={{ fontSize: `${previewSize.big}px`, lineHeight: `${previewSize.bigLeading}px` }}
            >
              Big Text
            </p>
            <p
              className="text-base"
              style={{ fontSize: `${previewSize.default}px`, lineHeight: `${previewSize.defaultLeading}px` }}
            >
              Default Text
            </p>
            <p
              className="text-sm"
              style={{ fontSize: `${previewSize.small}px`, lineHeight: `${previewSize.smallLeading}px` }}
            >
              Small Text
            </p>
          </Form.RowVertical>
        </Form.RowHorizontal>
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
  );
}

export default DisplaySetting;

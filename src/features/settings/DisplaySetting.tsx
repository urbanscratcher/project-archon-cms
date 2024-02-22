import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DisplayContext } from '../../DisplayContext';
import Form from '../../ui/Form';
import MainHead from '../../ui/Head';
import RadioGroup from '../../ui/RadioGroup';
import SlideBar from '../../ui/SlideBar';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';

function DisplaySetting() {
  const ctx = useContext(DisplayContext);
  const savedTextScale = ctx.textScale;
  const savedFont = ctx.font;
  const [selectedFont, setSelectedFont] = useState(savedFont);
  const [textScale, setTextScale] = useState(+savedTextScale);

  const labelTexts = ['Inter', 'PT Serif', 'Inconsolata'];
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
      big: 30 * textScale * 0.01,
      bigLeading: 36 * textScale * 0.01,
      default: 16 * textScale * 0.01,
      defaultLeading: 24 * textScale * 0.01,
      small: 14 * textScale * 0.01,
      smallLeading: 20,
    });
  }, [textScale]);

  const { handleSubmit } = useForm();

  const submitHandler = () => {
    localStorage.setItem('font', selectedFont);
    localStorage.setItem('text_scale', `${textScale}`);

    const root = document.documentElement;
    const curTextSize = 16;
    root.style.setProperty('font-size', curTextSize * 0.01 * textScale + 'px');
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
              selected={selectedFont}
              setSelected={setSelectedFont}
            />
            <div className="mt-5">
              <SlideBar
                labelText="Text Size"
                value={textScale}
                setValue={setTextScale}
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

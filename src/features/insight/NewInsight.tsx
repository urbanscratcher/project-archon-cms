import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { MouseEvent, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Topic } from '../../models/Topic';
import insightImgsApi from '../../services/apiInsightImgs';
import { MainBody } from '../../ui/MainBody';
import { MainLayout } from '../../ui/MainLayout';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import { isExceedCharLimit, isExceedWordLimit } from '../../utils/helpers';
import TopicDropdown from './TopicDropdown';
import useCreateInsight from './useCreateInsight';
import useUploadImg from './useUploadImg';

function NewInsight() {
  const token = localStorage.getItem('access_token') ?? '';
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [titleActive, setTitleActive] = useState(false);
  const [summary, setSummary] = useState('');
  const [summaryActive, setSummaryActive] = useState(false);
  const [summaryErrorMessage, setSummaryErrorMessage] = useState('');
  const [content, setContent] = useState('');
  const [contentActive, setContentActive] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const titleEl = useRef<HTMLInputElement>(null);
  const summaryEl = useRef<HTMLTextAreaElement>(null);
  const uploadEl = useRef<HTMLInputElement>(null);
  const thumbnailUploadEl = useRef<HTMLButtonElement>(null);

  const [imgLoading, setImgLoading] = useState(false);
  const [editor, setEditor] = useState<any>();

  const {
    uploadImg: uploadThumbnail,
    isPending: thumbnailIsPending,
    error: thumbnailError,
    data: thumbnailData,
  } = useUploadImg('thumbnail');

  const {
    mutate: createInsight,
    data: createInsightData,
    isPending: createInsightIsPending,
    error: createInsightError,
  } = useCreateInsight();

  //////////////////////////////////////////////////
  // when uploading a thumbnail -----------------------
  function uploadClickHandler(e: MouseEvent) {
    e.preventDefault();
    uploadEl.current && uploadEl.current.click();
  }

  function uploadChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e?.target?.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const data = new FormData();
    data.append('img', file);
    uploadThumbnail(data);
  }

  // when uploading an image in editor ------------------
  const uploadHandler = (resolve: any, reject: any, loader: any) => {
    setImgLoading(true);
    loader.file.then((file: File) => {
      const data = new FormData();
      data.append('img', file);

      insightImgsApi
        .imgUpsert(token, data)
        .then((r) => {
          setImgLoading(false);
          return resolve({
            default: r.url,
          });
        })
        .catch((e) => {
          console.error(e);
          reject(e);
        });
    });
  };

  function promisifyUploadHandler(loader: any) {
    return new Promise((resolve, reject) => uploadHandler(resolve, reject, loader));
  }

  function uploadAdapter(loader: any) {
    return {
      upload: () => promisifyUploadHandler(loader),
    };
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader);
    };
  }

  /////////////////////////////////////////////
  useEffect(() => {
    if (createInsightData?.idx > 0) {
      navigate(`/insights/${createInsightData.idx}`);
    }
  }, [createInsightData]);

  useEffect(() => {
    if (thumbnailData?.url) {
      setThumbnailUrl(thumbnailData.url);
    }
  }, [thumbnailData]);

  useEffect(() => {
    titleEl.current?.focus();
  }, [titleEl]);

  //////////////////////////////////////////////
  if (createInsightError) {
    console.error('cr insight err...', createInsightError);
  }

  const editorConfiguration = {
    extraPlugins: [uploadPlugin],
  };

  return (
    <MainLayout>
      <MainBody>
        {createInsightIsPending ? (
          <Spinner />
        ) : (
          <>
            <div className="flex justify-end gap-2">
              <TopicDropdown onSelect={setSelectedTopic} />
              <Button
                className="h-fit w-fit self-end"
                size="sm"
                buttonType="primary"
                disabled={thumbnailIsPending || imgLoading || !editor}
                onClick={(e) => {
                  e.preventDefault();

                  // validation
                  if (!title || title === '') {
                    titleEl.current?.focus();
                    return;
                  }
                  if (!summary || summary === '') {
                    summaryEl.current?.focus();
                    return;
                  }

                  if (!content || content === '') {
                    editor && editor?.editing?.view?.focus();
                    return;
                  }

                  if (!thumbnailUrl || thumbnailUrl === '') {
                    thumbnailUploadEl.current?.focus();
                    return;
                  }

                  if (!selectedTopic) {
                    return;
                  }

                  const body = {
                    title: title.trim(),
                    thumbnail: thumbnailUrl.trim(),
                    content: content.trim(),
                    summary: summary.trim(),
                    topic_idx: selectedTopic.idx,
                  };

                  createInsight(body);
                }}
              >
                Publish
              </Button>
            </div>
            <div className="grid grid-cols-[70px_1fr] items-center gap-6">
              <p className={`text-sm text-zinc-400 ${titleActive ? 'opacity-100' : 'opacity-0'}`}>
                Title{title === '' && <span className="text-navy-600">*</span>}
              </p>
              <Input
                borderless={true}
                roundless={true}
                placeholder="Title"
                className={`self-center border-b py-2 text-4xl font-semibold focus:outline-none dark:border-zinc-700`}
                ref={titleEl}
                onFocus={() => setTitleActive(true)}
                onBlur={(e) => {
                  setTitle(e.currentTarget.value);
                  setTitleActive(false);
                }}
                onChange={(e) => {
                  setTitle(e.currentTarget.value);
                }}
              />
              <p className={`text-sm text-zinc-400 ${summaryActive ? 'opacity-100' : 'opacity-0'}`}>
                Summary{summary === '' && <span className="text-navy-600">*</span>}
              </p>
              <div>
                <textarea
                  ref={summaryEl}
                  placeholder="Type a summary (< 100 words and 500 characters)"
                  className={`h-[200px] w-full resize-none self-center px-4 py-2 text-xl  focus:outline-none dark:bg-zinc-900 dark:text-zinc-400 dark:placeholder:text-zinc-700`}
                  onFocus={() => setSummaryActive(true)}
                  onBlur={(e) => {
                    const summary = e.currentTarget.value;

                    const isExceedWord = isExceedWordLimit(summary, 100);
                    const isExceedChar = isExceedCharLimit(summary, 500);

                    if (isExceedWord) {
                      setSummaryErrorMessage('Summary exceeds 100 words. Please shorten your text.');
                    }

                    if (isExceedChar) {
                      setSummaryErrorMessage('Summary exceeds 500 characters. Please shorten your text.');
                    }

                    if (!isExceedWord && !isExceedChar) {
                      setSummary(summary);
                      setSummaryActive(false);
                    }
                  }}
                  onChange={(e) => {
                    if (!isExceedWordLimit(summary, 100) && !isExceedCharLimit(summary, 500)) {
                      setSummaryErrorMessage('');
                    }
                    setSummary(e.currentTarget.value);
                  }}
                />
                {summaryErrorMessage !== '' && <p className="text-xs text-red-600">{summaryErrorMessage}</p>}
              </div>
              <p className={`text-sm text-zinc-400 ${contentActive ? 'opacity-100' : 'opacity-0'}`}>
                Content{content === '' && <span className="text-navy-600">*</span>}
              </p>
              <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data={content}
                onReady={(editor: any) => {
                  setEditor(editor);
                }}
                onChange={(_event: any, editor: any) => {
                  setContent(editor.getData());
                }}
                onBlur={(_event: any, editor: any) => {
                  setContent(editor.getData());
                  setContentActive(false);
                }}
                onFocus={(_event: any, _editor: any) => {
                  setContentActive(true);
                }}
              />
              <div className="flex flex-col items-end gap-1">
                <Button
                  buttonType="muted"
                  size="icon"
                  onClick={uploadClickHandler}
                  ref={thumbnailUploadEl}
                  className={`w-fit text-zinc-400 hover:text-zinc-600 focus:ring-2`}
                >
                  <span className="icon-[lucide--plus]"></span>
                </Button>
                {thumbnailUrl !== '' && (
                  <Button
                    buttonType="muted"
                    size="icon"
                    onClick={() => setThumbnailUrl('')}
                    className={`w-fit text-zinc-400 hover:text-zinc-600`}
                  >
                    <span className="icon-[lucide--minus]"></span>
                  </Button>
                )}
              </div>
              <div className="flex flex-col items-start">
                {thumbnailIsPending ? (
                  <Spinner withText={false} />
                ) : thumbnailError ? (
                  <p>Try again</p>
                ) : thumbnailUrl !== '' ? (
                  <img
                    src={thumbnailUrl}
                    alt="thumbnail"
                    className="w-1/4"
                  />
                ) : (
                  <p className="text-sm text-zinc-400">
                    Upload a thumbnail<span className="text-navy-600">*</span>
                  </p>
                )}
                {/* for uploading function */}
                <input
                  hidden
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpg, image/jpeg, image/webp"
                  onChange={uploadChangeHandler}
                  ref={uploadEl}
                />
              </div>
            </div>
          </>
        )}
      </MainBody>
    </MainLayout>
  );
}

export default NewInsight;

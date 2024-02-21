import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Topic } from '../../models/Topic';
import insightImgsApi from '../../services/apiInsightImgs';
import { MainBody } from '../../ui/MainBody';
import { MainLayout } from '../../ui/MainLayout';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
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
  const [content, setContent] = useState('');
  const [contentActive, setContentActive] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const titleEl = useRef<HTMLInputElement>(null);
  const summaryEl = useRef<HTMLTextAreaElement>(null);
  const uploadEl = useRef<HTMLInputElement>(null);
  const thumbnailUploadEl = useRef<HTMLButtonElement>(null);
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
  const [imgLoading, setImgLoading] = useState(false);
  const [editor, setEditor] = useState();

  // upload thumbnail
  function uploadClickHandler(e: MouseEvent) {
    e.preventDefault();
    uploadEl.current && uploadEl.current.click();
  }
  function uploadChangeHandler(e: any) {
    if (e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const data = new FormData();
    data.append('img', file);
    uploadThumbnail(data);
  }

  // upload an image in editor
  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
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
        });
      },
    };
  }
  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader);
    };
  }

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

  if (createInsightError) {
    console.error('cr insight err...', createInsightError);
  }

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
                    editor.editing.view.focus();
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
                    title: title,
                    thumbnail: thumbnailUrl,
                    content: content,
                    summary: summary,
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
              <input
                placeholder="Title"
                className={`w-full self-center border-b  py-2 text-4xl font-semibold focus:outline-none`}
                ref={titleEl}
                onFocus={(e) => setTitleActive(true)}
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
              <textarea
                ref={summaryEl}
                placeholder="Type a summary (< 200 words)"
                className={`w-full self-center py-2  text-xl focus:outline-none`}
                onFocus={(e) => setSummaryActive(true)}
                onBlur={(e) => {
                  setSummary(e.currentTarget.value);
                  setSummaryActive(false);
                }}
                onChange={(e) => {
                  setSummary(e.currentTarget.value);
                }}
              />
              <p className={`text-sm text-zinc-400 ${contentActive ? 'opacity-100' : 'opacity-0'}`}>
                Content{content === '' && <span className="text-navy-600">*</span>}
              </p>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  extraPlugins: [uploadPlugin],
                }}
                data={content}
                onReady={(editor: any) => {
                  setEditor(editor);
                }}
                onChange={(event, editor) => {
                  setContent(editor.getData());
                }}
                onBlur={(event, editor) => {
                  setContent(editor.getData());
                  setContentActive(false);
                }}
                onFocus={(event, editor) => {
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
                    onClick={(e) => setThumbnailUrl('')}
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
                <input
                  hidden
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpg, image/jpeg"
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

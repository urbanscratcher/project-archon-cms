import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Insight } from '../../models/Insights';
import { Topic } from '../../models/Topic';
import insightApi from '../../services/apiInsight';
import insightImgsApi from '../../services/apiInsightImgs';
import { MainBody } from '../../ui/MainBody';
import { MainLayout } from '../../ui/MainLayout';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
import TopicDropdown from './TopicDropdown';
import useUploadImg from './useUploadImg';
import useUpdateInsight from './useUpdateInsight';
import Input from '../../ui/input/Input';

function EditInsight() {
  const { insightIdx } = useParams();
  const queryClient = useQueryClient();
  const insight: Insight = queryClient.getQueryData(['insight', insightIdx]);
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token') ?? '';
  const [title, setTitle] = useState<string>(insight.title);
  const [titleActive, setTitleActive] = useState(false);
  const [summary, setSummary] = useState(insight.summary);
  const [summaryActive, setSummaryActive] = useState(false);
  const [content, setContent] = useState(insight.content);
  const [contentActive, setContentActive] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(insight.topic);
  const [thumbnailUrl, setThumbnailUrl] = useState(insight.thumbnail);
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
  const { mutate: updateInsight, isPending: updateInsightIsPending, error: updateInsightError } = useUpdateInsight();
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

  if (updateInsightError) {
    console.error('insight err...', updateInsightError);
  }

  useEffect(() => {
    if (thumbnailData?.url) {
      setThumbnailUrl(thumbnailData.url);
    }
  }, [thumbnailData]);

  return (
    <MainLayout>
      <MainBody>
        {updateInsightIsPending ? (
          <Spinner />
        ) : (
          <>
            <div className="flex justify-end gap-2">
              <TopicDropdown
                selected={selectedTopic ? selectedTopic : undefined}
                onSelect={setSelectedTopic}
              />
              <Button
                className="h-fit w-fit self-end"
                size="sm"
                buttonType="primary"
                disabled={thumbnailIsPending || imgLoading || !editor}
                onClick={() => {
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

                  const params = {
                    idx: insight.idx,
                    body: body,
                  };

                  updateInsight(params);
                }}
              >
                Update
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
                value={title}
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
                value={summary}
                ref={summaryEl}
                placeholder="Type a summary (< 200 words)"
                className={`w-full self-center px-4 py-2 text-xl focus:outline-none  dark:bg-zinc-900 dark:text-zinc-400 dark:placeholder:text-zinc-700`}
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

export default EditInsight;

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import insightApi from '../../services/apiInsight';
import insightImgsApi from '../../services/apiInsightImgs';
import { MainBody } from '../../ui/MainBody';
import { MainLayout } from '../../ui/MainLayout';
import Button from '../../ui/button/Button';
import { useNavigate } from 'react-router-dom';

function NewInsight() {
  const [title, setTitle] = useState<string>('');
  const [titleActive, setTitleActive] = useState(false);
  const [summary, setSummary] = useState('');
  const [summaryActive, setSummaryActive] = useState(false);
  const [content, setContent] = useState('');
  const [contentActive, setContentActive] = useState(false);
  const titleEl = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem('access_token') ?? '';
  const uploadEl = useRef<HTMLInputElement>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const navigate = useNavigate();

  // thumbnail
  function uploadClickHandler(e: MouseEvent) {
    e.preventDefault();
    uploadEl.current && uploadEl.current.click();
  }
  async function uploadChangeHandler(e: any) {
    if (e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const data = new FormData();
    data.append('img', file);
    const uploadedImg = await insightImgsApi.thumbnailUpsert(token, data);

    if (uploadedImg?.url) {
      setThumbnailUrl(uploadedImg.url);
    }
  }

  // upload an image in editor
  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file: File) => {
            const data = new FormData();
            data.append('img', file);

            insightImgsApi
              .imgUpsert(token, data)
              .then((r) =>
                resolve({
                  default: r.url,
                }),
              )
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
    titleEl.current?.focus();
  }, [titleEl]);

  return (
    <MainLayout>
      <MainBody>
        <Button
          className="h-fit w-fit self-end"
          size="sm"
          buttonType="primary"
          onClick={() => {
            const body = {
              title: title,
              thumbnail: thumbnailUrl,
              content: content,
              summary: summary,
              topic_idx: 4,
            };

            insightApi.create(body, token).then((r) => {
              navigate(`/insights/${r.idx}`);
            });
          }}
        >
          Publish
        </Button>
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
            onReady={(editor) => {
              //
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
              console.log('Focus.', editor.getData());
            }}
          />
          <div className="flex flex-col items-end gap-1">
            <Button
              buttonType="muted"
              size="icon"
              onClick={uploadClickHandler}
              className="w-fit text-zinc-400 hover:text-zinc-600"
            >
              <span className="icon-[lucide--plus]"></span>
            </Button>
          </div>
          <div className="flex flex-col">
            {thumbnailUrl ? (
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
      </MainBody>
    </MainLayout>
  );
}

export default NewInsight;

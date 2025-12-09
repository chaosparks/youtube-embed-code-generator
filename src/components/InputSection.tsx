import React from 'react';
import { Youtube, Link, Monitor, Smartphone } from 'lucide-react';

interface InputSectionProps {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  hostedImageUrl: string;
  setHostedImageUrl: (url: string) => void;
  aspectRatio: '16:9' | '9:16';
  setAspectRatio: (ratio: '16:9' | '9:16') => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  videoUrl,
  setVideoUrl,
  hostedImageUrl,
  setHostedImageUrl,
  aspectRatio,
  setAspectRatio
}) => {
  return (
    <div className="space-y-6">
      {/* Video URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          1. YouTube Video URL
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Youtube className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 py-3 border text-sm"
            placeholder="https://www.youtube.com/watch?v=... or /shorts/..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Paste the full link to the YouTube video or Short you want to embed.
        </p>
      </div>

      {/* Aspect Ratio Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          2. Video Aspect Ratio
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAspectRatio('16:9')}
            className={`flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
              aspectRatio === '16:9'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Monitor className={`w-5 h-5 mr-2 ${aspectRatio === '16:9' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Landscape (16:9)
          </button>
          
          <button
            type="button"
            onClick={() => setAspectRatio('9:16')}
            className={`flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
              aspectRatio === '9:16'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Smartphone className={`w-5 h-5 mr-2 ${aspectRatio === '9:16' ? 'text-indigo-600' : 'text-gray-400'}`} />
            Shorts (9:16)
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Automatically detected from URL, but you can change it manually.
        </p>
      </div>

      {/* Hosted Image URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          3. Hosted Poster URL (Optional)
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 py-3 border text-sm"
            placeholder="https://your-blog.com/images/my-thumbnail.jpg"
            value={hostedImageUrl}
            onChange={(e) => setHostedImageUrl(e.target.value)}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Paste the URL of the image you downloaded and hosted. This will be used in the generated HTML code.
          If left blank, the code will use a generic placeholder.
        </p>
      </div>
    </div>
  );
};

export default InputSection;

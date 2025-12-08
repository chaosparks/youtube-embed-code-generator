import React from 'react';
import { Youtube, Link} from 'lucide-react';

interface InputSectionProps {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  hostedImageUrl: string;
  setHostedImageUrl: (url: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  videoUrl,
  setVideoUrl,
  hostedImageUrl,
  setHostedImageUrl
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
            placeholder="https://www.youtube.com/watch?v=..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Paste the full link to the YouTube video you want to embed.
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
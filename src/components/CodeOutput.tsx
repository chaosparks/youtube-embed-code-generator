import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeOutputProps {
  videoId: string | null;
  hostedImageUrl: string;
  aspectRatio?: '16:9' | '9:16';
}

const CodeOutput: React.FC<CodeOutputProps> = ({ videoId, hostedImageUrl, aspectRatio = '16:9' }) => {
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!videoId) {
      setCode('');
      return;
    }

    const imageUrl = hostedImageUrl.trim() || 'YOUR_IMAGE_URL_HERE';
    
    // Determine CSS values based on aspect ratio
    // 16:9 = 56.25% padding
    // 9:16 = 177.78% padding
    const paddingBottom = aspectRatio === '9:16' ? '177.78%' : '56.25%';
    
    // For Shorts (vertical), we add a max-width to prevent it from being huge on desktop
    // For Standard (horizontal), we usually let it take full width of container
    const layoutStyles = aspectRatio === '9:16' 
      ? 'max-width: 480px; margin: 20px auto;' 
      : 'margin: 20px 0;';

    const ratioComment = aspectRatio === '9:16' ? '9:16 Aspect Ratio (Shorts)' : '16:9 Aspect Ratio';

    // Generating the HTML string based on the user's requirements
    const htmlString = `<!-- YouTube Embed Start -->
<style>
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: ${paddingBottom}; /* ${ratioComment} */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  ${layoutStyles}
  background-color: #000;
  background-image: url('${imageUrl}');
  background-size: cover;
  background-position: center;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>

<div class="video-container">
  <iframe 
    src="https://www.youtube.com/embed/${videoId}" 
    title="YouTube video player" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen
    loading="lazy">
  </iframe>
</div>
<!-- YouTube Embed End -->`;

    setCode(htmlString);
  }, [videoId, hostedImageUrl, aspectRatio]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!videoId) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          4. Generated HTML Code
        </label>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
            copied 
              ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
          }`}
        >
          {copied ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <div className="relative">
        <pre className="block w-full rounded-lg border border-gray-300 bg-gray-900 text-gray-100 p-4 text-sm font-mono overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Copy this code and paste it into your blog's HTML editor. 
        {aspectRatio === '9:16' && ' Since this is a Short, the code includes styles to center it and limit the width.'}
      </p>
    </div>
  );
};

export default CodeOutput;

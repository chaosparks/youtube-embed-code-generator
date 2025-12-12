import React, { useState, useEffect } from 'react';
import { getYouTubeID, getYouTubeThumbnail, isShortsUrl } from './utils/youtubeUtils';
import InputSection from './components/InputSection';
import ThumbnailGenerator from './components/ThumbnailGenerator';
import CodeOutput from './components/CodeOutput';
import { Youtube, Layout, RotateCcw } from 'lucide-react';

const App: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [hostedImageUrl, setHostedImageUrl] = useState('');
  const [thumbnailSource, setThumbnailSource] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  useEffect(() => {
    const id = getYouTubeID(videoUrl);
    setVideoId(id);
    if (id) {
      setThumbnailSource(getYouTubeThumbnail(id));
      // Auto-detect Shorts and switch aspect ratio
      if (isShortsUrl(videoUrl)) {
        setAspectRatio('9:16');
      } else {
        setAspectRatio('16:9');
      }
    } else {
      setThumbnailSource(null);
    }
  }, [videoUrl]);

  const handleReset = () => {
    setVideoUrl('');
    setHostedImageUrl('');
    setAspectRatio('16:9');
    // videoId and thumbnailSource will be reset by the useEffect when videoUrl becomes empty
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full shadow-lg">
              <Youtube className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            YouTube Embed Generator
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Create fast-loading, beautiful video embeds for your blog with custom poster images.
          </p>
        </div>

        <div className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x divide-gray-200">
            {/* Left Column: Inputs */}
            <div className="p-6 lg:p-8 space-y-8 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Layout className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Configuration</h2>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-red-600 hover:border-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                  title="Reset all fields"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  Reset
                </button>
              </div>
              
              <InputSection 
                videoUrl={videoUrl}
                setVideoUrl={setVideoUrl}
                hostedImageUrl={hostedImageUrl}
                setHostedImageUrl={setHostedImageUrl}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
              />
              
              {/* Instructions Panel */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">How to use:</h3>
                <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                  <li>Paste your YouTube Video URL.</li>
                  <li>Download the generated preview image with the play button.</li>
                  <li>Upload that image to your own server/blog media library.</li>
                  <li>Paste the new URL into the "Hosted Poster URL" box.</li>
                  <li>Copy the generated HTML code.</li>
                </ol>
              </div>
            </div>

            {/* Right Column: Preview & Output */}
            <div className="p-6 lg:p-8 bg-gray-50">
              <ThumbnailGenerator 
                thumbnailUrl={thumbnailSource} 
                onDownloadReady={() => {}} 
              />
              
              <CodeOutput 
                videoId={videoId} 
                hostedImageUrl={hostedImageUrl} 
                defaultThumbnailUrl={thumbnailSource}
                aspectRatio={aspectRatio}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Privacy Note: This tool runs entirely in your browser. No data is sent to any external server.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
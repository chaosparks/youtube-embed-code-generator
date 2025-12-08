import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Download, RefreshCw, AlertCircle } from 'lucide-react';

interface ThumbnailGeneratorProps {
  thumbnailUrl: string | null;
  onDownloadReady: (isReady: boolean) => void;
}

const ThumbnailGenerator: React.FC<ThumbnailGeneratorProps> = ({ thumbnailUrl, onDownloadReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);

  const drawCanvas = useCallback(() => {
    if (!thumbnailUrl || !canvasRef.current) return;

    setLoading(true);
    setError(null);
    setIsGenerated(false);
    onDownloadReady(false);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    // Important: Allow cross-origin for YouTube images to export canvas
    img.crossOrigin = "anonymous"; 
    img.src = thumbnailUrl;

    img.onload = () => {
      // Set canvas dimensions to match the loaded image (usually 1280x720 for maxres)
      canvas.width = img.width;
      canvas.height = img.height;

      // 1. Draw the background image
      ctx.drawImage(img, 0, 0);

      // 2. Draw a subtle dark overlay to make the button pop
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Draw the Play Button (YouTube-style Rounded Rectangle)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Calculate dimensions based on canvas width
      // YouTube button is roughly rectangular with 1.4:1 ratio
      const buttonWidth = canvas.width * 0.12; 
      const buttonHeight = buttonWidth * 0.7;
      const cornerRadius = buttonHeight * 0.25;

      const rectX = centerX - buttonWidth / 2;
      const rectY = centerY - buttonHeight / 2;

      // Setup Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = buttonWidth * 0.2;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = buttonWidth * 0.05;

      ctx.beginPath();
      // Draw rounded rectangle manually for max compatibility
      ctx.moveTo(rectX + cornerRadius, rectY);
      ctx.lineTo(rectX + buttonWidth - cornerRadius, rectY);
      ctx.quadraticCurveTo(rectX + buttonWidth, rectY, rectX + buttonWidth, rectY + cornerRadius);
      ctx.lineTo(rectX + buttonWidth, rectY + buttonHeight - cornerRadius);
      ctx.quadraticCurveTo(rectX + buttonWidth, rectY + buttonHeight, rectX + buttonWidth - cornerRadius, rectY + buttonHeight);
      ctx.lineTo(rectX + cornerRadius, rectY + buttonHeight);
      ctx.quadraticCurveTo(rectX, rectY + buttonHeight, rectX, rectY + buttonHeight - cornerRadius);
      ctx.lineTo(rectX, rectY + cornerRadius);
      ctx.quadraticCurveTo(rectX, rectY, rectX + cornerRadius, rectY);
      ctx.closePath();

      // Increased transparency to 50% (0.5) to let background show through
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; 
      ctx.fill();
      
      // Optional: Add a thin white border to the rectangle
      // ctx.lineWidth = buttonWidth * 0.02;
      // ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      // ctx.stroke();

      // Reset Shadow for inner elements
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // 4. Draw the Play Triangle
      const triangleHeight = buttonHeight * 0.4;
      // Optical adjustment: triangles look better slightly offset to the right
      const triangleX = centerX + (triangleHeight * 0.1); 
      const triangleY = centerY;

      ctx.beginPath();
      // Point 1 (Tip - Right)
      ctx.moveTo(triangleX + triangleHeight * 0.7, triangleY);
      // Point 2 (Bottom Left)
      ctx.lineTo(triangleX - triangleHeight * 0.5, triangleY + triangleHeight * 0.7);
      // Point 3 (Top Left)
      ctx.lineTo(triangleX - triangleHeight * 0.5, triangleY - triangleHeight * 0.7);
      ctx.closePath();

      // Slightly transparent triangle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();

      setLoading(false);
      setIsGenerated(true);
      onDownloadReady(true);
    };

    img.onerror = () => {
      setLoading(false);
      setError("Failed to load thumbnail. YouTube might be blocking cross-origin access for this specific video, or the ID is invalid.");
      onDownloadReady(false);
    };
  }, [thumbnailUrl, onDownloadReady]);

  useEffect(() => {
    if (thumbnailUrl) {
      drawCanvas();
    }
  }, [thumbnailUrl, drawCanvas]);

  const handleDownload = () => {
    if (!canvasRef.current || !isGenerated) return;
    try {
      const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.9);
      
      // Generate filename with timestamp
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timestamp = `${year}${month}${day}-${hours}${minutes}${seconds}`;
      
      const link = document.createElement('a');
      link.download = `youtube-poster-with-play-${timestamp}.jpg`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      setError("Could not download image (Tainted Canvas). Please take a screenshot of the preview.");
    }
  };

  if (!thumbnailUrl) {
    return (
      <div className="h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
        Enter a video URL to generate preview
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          2. Generated Thumbnail (Preview)
        </label>
        {isGenerated && (
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="w-4 h-4 mr-1.5" />
            Download Image
          </button>
        )}
      </div>

      <div className="relative rounded-lg overflow-hidden shadow-lg bg-black group">
        <canvas
          ref={canvasRef}
          className="w-full h-auto block"
          style={{ maxHeight: '400px', objectFit: 'contain' }}
        />
        
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <RefreshCw className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-90 z-20 p-4 text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
            <p className="text-white text-sm">{error}</p>
            <button 
              onClick={drawCanvas}
              className="mt-4 px-4 py-2 bg-white text-gray-900 rounded text-xs font-bold hover:bg-gray-200"
            >
              Retry
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500">
        Right-click and "Save Image As..." if the download button fails.
      </p>
    </div>
  );
};

export default ThumbnailGenerator;
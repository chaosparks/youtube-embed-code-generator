# YouTube Embed Code Generator

A React-based utility tool designed to create high-performance, responsive YouTube video embeds for blogs and websites. 

This tool solves a common problem: embedding a standard YouTube iframe can significantly slow down page load times. This generator creates a static "poster" image with a custom play button overlay. The heavy YouTube player only loads when the user actually clicks the image.

## 🚀 Features

*   **Automatic Thumbnail Extraction**: instantly fetches the highest resolution thumbnail from any YouTube URL.
*   **Custom Play Button Generation**: 
    *   Uses HTML5 Canvas to overlay a YouTube-style rounded rectangular play button.
    *   Includes aesthetic touches like drop shadows, transparency, and correct aspect ratios.
    *   **Privacy Focused**: All image processing happens in your browser. No images are sent to a server.
*   **Downloadable Assets**: Generates a `.jpg` file with a timestamped filename for easy organization.
*   **Responsive Embed Code**: Outputs clean HTML/CSS that maintains a 16:9 aspect ratio and handles the background image fallback gracefully.
*   **Offline Capable**: Works entirely client-side after initial load.

## 🛠️ Tech Stack

*   **Core**: React 19, TypeScript
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Graphics**: Native Canvas API (2D Context)

## 📦 Installation & Setup

To run this project locally, follow these steps:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### 2. Installation

```bash
# Clone the repository (or download source)
git clone <your-repo-url>
cd youtube-embed-generator

# Install dependencies
npm install
```

### 3. Running Development Server

```bash
npm run dev
```

Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

## 📖 How to Use

1.  **Input Video URL**: Paste the full URL of the YouTube video you want to embed (e.g., `https://www.youtube.com/watch?v=...`) into the first input field.
2.  **Generate Image**: The tool will automatically fetch the thumbnail and render the play button overlay in the preview section.
3.  **Download Image**: Click the **Download Image** button. Save the file (e.g., `youtube-poster-with-play-20231027-120000.jpg`) to your computer.
4.  **Host the Image**: Upload this image to your blog's media library, an S3 bucket, or any image hosting service.
5.  **Input Hosted URL**: Paste the direct URL of your uploaded image into the **Hosted Poster URL** field.
6.  **Copy Code**: The tool generates the final HTML snippet. Click **Copy Code** and paste it into your website's HTML editor.

## 🎨 Customization

The generated HTML uses a CSS class `.video-container`. You can further customize the border radius or margins in the generated code block:

```css
.video-container {
  /* ... */
  border-radius: 12px; /* Change this value for different corner roundness */
  margin: 20px 0;      /* Change spacing */
}
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

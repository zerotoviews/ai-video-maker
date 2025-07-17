const generateBtn = document.getElementById('generateBtn');
const scriptInput = document.getElementById('scriptInput');
const ttsToggle = document.getElementById('ttsToggle');
const videoContainer = document.getElementById('videoContainer');

generateBtn.addEventListener('click', () => {
  const text = scriptInput.value.trim();
  if (!text) {
    alert('Please paste a script to generate the video.');
    return;
  }

  // Clear previous video if any
  videoContainer.innerHTML = '';

  // Create video element with sample video source
  const video = document.createElement('video');
  video.src = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Sample video
  video.controls = true;
  video.autoplay = true;
  video.style.width = '100%';
  videoContainer.appendChild(video);

  // Create subtitle div
  const subtitle = document.createElement('div');
  subtitle.style.position = 'absolute';
  subtitle.style.bottom = '50px';
  subtitle.style.width = '100%';
  subtitle.style.textAlign = 'center';
  subtitle.style.color = '#0ff';
  subtitle.style.fontSize = '1.5rem';
  subtitle.style.textShadow = '2px 2px 4px #000';
  videoContainer.style.position = 'relative';
  videoContainer.appendChild(subtitle);

  // Show subtitles word by word timed with TTS (approximate)
  const words = text.split(' ');
  let index = 0;
  subtitle.textContent = '';

  // Text-to-Speech
  if (ttsToggle.checked && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);

    // Show words one by one approx every 400ms while speaking
    const interval = setInterval(() => {
      if (index < words.length) {
        subtitle.textContent += words[index] + ' ';
        index++;
      } else {
        clearInterval(interval);
      }
    }, 400);
  } else {
    // If TTS is off, just show full text subtitle
    subtitle.textContent = text;
  }
});

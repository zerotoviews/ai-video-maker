const ttsVoice = speechSynthesis.getVoices().find(v => v.name.includes('Google') || v.default);

document.getElementById('generate').addEventListener('click', async () => {
  const text = document.getElementById('text').value;
  const voiceType = document.getElementById('voice').value;

  if (!text.trim()) {
    alert("Please enter a hook or script.");
    return;
  }

  // Play TTS
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = speechSynthesis.getVoices().find(v => v.name.includes(voiceType)) || ttsVoice;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);

  // Set up fake video background with subtitles
  const video = document.getElementById('video');
  const subtitle = document.getElementById('subtitle');

  subtitle.textContent = '';
  video.src = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Placeholder video
  video.play();

  // Display words as subtitles
  const words = text.split(' ');
  let index = 0;
  const interval = setInterval(() => {
    if (index < words.length) {
      subtitle.textContent += words[index] + ' ';
      index++;
    } else {
      clearInterval(interval);
    }
  }, 400);
});

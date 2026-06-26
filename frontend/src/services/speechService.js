/**
 * speechService.js
 * Client-side Speech Synthesis wrapper using the Web Speech API.
 */

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
  }

  /**
   * Check if speech synthesis is supported by the browser.
   * @returns {boolean}
   */
  isSupported() {
    return !!(this.synth && typeof window.SpeechSynthesisUtterance !== 'undefined');
  }

  /**
   * Get list of available system voices.
   * @returns {Promise<SpeechSynthesisVoice[]>}
   */
  getVoices() {
    return new Promise((resolve) => {
      if (!this.isSupported()) {
        resolve([]);
        return;
      }

      let voices = this.synth.getVoices();
      if (voices.length > 0) {
        resolve(voices);
        return;
      }

      // Chrome/Edge load voices asynchronously
      this.synth.onvoiceschanged = () => {
        voices = this.synth.getVoices();
        resolve(voices);
      };

      // Fallback timeout in case voiceschanged event doesn't fire
      setTimeout(() => {
        resolve(this.synth.getVoices());
      }, 500);
    });
  }

  /**
   * Speak a text string with specified options.
   * @param {string} text - The text to speak.
   * @param {Object} options - Speech configuration options.
   * @param {string} [options.voiceName] - Name of the voice to use.
   * @param {number} [options.rate=1] - Rate of speech (0.5 to 2).
   * @param {number} [options.pitch=1] - Pitch of speech (0 to 2).
   * @param {Function} [options.onStart] - Callback when speech starts.
   * @param {Function} [options.onEnd] - Callback when speech ends.
   * @param {Function} [options.onPause] - Callback when speech is paused.
   * @param {Function} [options.onResume] - Callback when speech is resumed.
   * @param {Function} [options.onError] - Callback on error.
   */
  speak(text, options = {}) {
    if (!this.isSupported()) {
      if (options.onError) options.onError(new Error('Speech synthesis not supported in this browser.'));
      return;
    }

    this.stop(); // Stop any active speech first

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Apply speed and pitch options
    utterance.rate = options.rate !== undefined ? options.rate : 1.0;
    utterance.pitch = options.pitch !== undefined ? options.pitch : 1.0;

    // Set voice if voiceName is provided
    if (options.voiceName) {
      const voices = this.synth.getVoices();
      const selectedVoice = voices.find(v => v.name === options.voiceName);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    // Set callbacks
    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) {
      utterance.onend = () => {
        this.currentUtterance = null;
        options.onEnd();
      };
    }
    if (options.onPause) utterance.onpause = options.onPause;
    if (options.onResume) utterance.onresume = options.onResume;
    
    utterance.onerror = (event) => {
      this.currentUtterance = null;
      if (options.onError) {
        options.onError(event);
      } else {
        console.error('Speech Synthesis Error:', event);
      }
    };

    this.synth.speak(utterance);

    // Chrome bug: SpeechSynthesis sometimes pauses randomly on long text.
    // Triggering a resume call every 14 seconds keeps it going if active.
    if (this._resumeInterval) clearInterval(this._resumeInterval);
    this._resumeInterval = setInterval(() => {
      if (this.synth.speaking && !this.synth.paused) {
        this.synth.pause();
        this.synth.resume();
      }
    }, 14000);
  }

  /**
   * Pause the active speech.
   */
  pause() {
    if (this.isSupported() && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  /**
   * Resume the active speech if paused.
   */
  resume() {
    if (this.isSupported() && this.synth.paused) {
      this.synth.resume();
    }
  }

  /**
   * Stop all active and queued speech.
   */
  stop() {
    if (this._resumeInterval) {
      clearInterval(this._resumeInterval);
      this._resumeInterval = null;
    }
    
    if (this.isSupported()) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }
}

const speechService = new SpeechService();
export default speechService;

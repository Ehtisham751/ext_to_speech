// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Element
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// Init the Voices Array
let voices = [];

const getlol = () => {
  voices = synth.getVoices();

  // Loop Through
  voices.forEach((voice) => {
    // Create option Element
    const option = document.createElement("option");
    // Fill The Option With Voice
    option.textContent = voice.name + `('${voice.lang}')`;

    // Set needed option attribute
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};
getlol();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getlol;
}
// Speak
function speak() {
  if (synth.speaking) {
    console.error("Already Speaking...");
    return;
  }

  if (textInput.value !== "") {
    // Add background Animation
    body.style.background = "#141414 url(./img/wave.jpg)";
    body.style.backgroundRepeat = "repeat-x";
    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = (e) => {
      // Add background Animation
      body.style.background = "#141414";
      console.log("Done speaking");
    };

    // Speak err
    speakText.onerror = (e) => {
      console.error("Something went wrong");
    };
    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );
    console.log(`Voice name: "${selectedVoice}"`);

    // Loop through voices
    voices.forEach((voice) => {
      console.log(voice.name);
      if (voice.name === selectedVoice) {
        console.log("works");
        console.log(voice.name);
        speakText.voice = voice;
      }
    });

    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
}

// Event
textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

rate.addEventListener("change", (e) => {
  rateValue.textContent = rate.value;
});
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener("change", (e) => speak());

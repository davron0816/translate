const apiUrl = "https://api.mymemory.translated.net/get";
const languages = {
    "en": "English",
    "uz": "Uzbek",
    "ru": "Russian",
    "fr": "French",
    "de": "German",
    "es": "Spanish",
    "zh": "Chinese",
    "ar": "Arabic",
};

document.addEventListener("DOMContentLoaded", () => {
  const inputLang = document.getElementById("inputLang");
  const outputLang = document.getElementById("outputLang");
  for (const code in languages) {
    const option1 = new Option(languages[code], code);
    const option2 = new Option(languages[code], code);
    inputLang.appendChild(option1);
    outputLang.appendChild(option2);
  }
  inputLang.value = "uz";
  outputLang.value = "en";
});

document.getElementById("translateBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value.trim();
  const fromLang = document.getElementById("inputLang").value;
  const toLang = document.getElementById("outputLang").value;
  const loader = document.getElementById("loader");
  const output = document.getElementById("outputText");

  if (!text) return alert("Matn kiriting!");

  loader.style.display = "block";
  output.value = "";

  try {
    const res = await fetch(`${apiUrl}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`);
    const data = await res.json();
    output.value = data.responseData.translatedText;
  } catch (error) {
    output.value = "Xatolik yuz berdi!";
  } finally {
    loader.style.display = "none";
  }
});

// Ovoz chiqarish
document.querySelectorAll(".speak-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const text = document.getElementById(targetId).value;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  });
});

// Nusxa olish
document.getElementById("copyBtn").addEventListener("click", () => {
  const output = document.getElementById("outputText");
  output.select();
  document.execCommand("copy");
  alert("Tarjima nusxalandi!");
});
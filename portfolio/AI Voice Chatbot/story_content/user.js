window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  (async function () {

  // =============================
  // Storyline Setup
  // =============================
  const player = GetPlayer();
  const openAIKey = player.GetVar("OpenAI_API_Key");
  const elevenLabsKey = player.GetVar("ElevenLabs_API_Key");

  const aiResponseVar = "AIResponse";
  const userSpeechVar = "UserSpeech";

  const openaiURL = "https://api.openai.com/v1";

  if (!openAIKey) { console.warn("⚠ No OpenAI API Key"); return; }
  if (!elevenLabsKey) { console.warn("⚠ No ElevenLabs API Key"); return; }

  // =============================
  // STATE / GLOBAL FLAGS
  // =============================
  let mediaRecorder = null;
  let chunks = [];
  let isRecording = false;
  let isAIResponding = false;

  window.__AI_MEDIA_RECORDER__ = window.__AI_MEDIA_RECORDER__ || null;
  window.__AI_MIC_STREAM__ = window.__AI_MIC_STREAM__ || null;
  window.__AI_AUDIO_CONTEXT__ = window.__AI_AUDIO_CONTEXT__ || null;
  window.__AI_AUDIO_PLAYER__ = window.__AI_AUDIO_PLAYER__ || null;
  window.__AI_FETCH_CONTROLLER__ = window.__AI_FETCH_CONTROLLER__ || null;

  window.__AI_SPEAKING__ = false;         
  window.__VOICE_LOOP_RUNNING__ = window.__VOICE_LOOP_RUNNING__ || false;
  window.__AI_FORCE_STOP__ = false;       

  let audioStream = window.__AI_MIC_STREAM__ || null;
  let audioContext = window.__AI_AUDIO_CONTEXT__ || null;
  let audioPlayer = null;                 

  const conversationHistory = [
    { role: "system", content: "You are a helpful AI assistant. Give short, clear responses in English only." }
  ];

  function safeSetVar(name, value) {
    try { player.SetVar(name, value); }
    catch (e) { console.warn("SetVar failed:", name); }
  }

  // =============================
  // Helper: Update AI_Speaking & AI_Listening
  // =============================
  function updateSpeakingListeningVars() {
    safeSetVar("AI_Speaking", window.__AI_SPEAKING__);
    const listening = !window.__AI_SPEAKING__ && isRecording;
    safeSetVar("AI_Listening", listening);
  }

  // =============================
  // FORCE STOP (Option A) - exposed globally
  // =============================
  window.forceStopAI = function forceStopAI() {
    console.log("🛑 forceStopAI invoked — full shutdown starting.");
    try { window.__AI_FORCE_STOP__ = true; } catch (e) {}

    window.__VOICE_LOOP_RUNNING__ = false;
    window.__AI_SPEAKING__ = false;
    isRecording = false;
    isAIResponding = false;
    updateSpeakingListeningVars();  // <-- update vars on force stop

    // Stop MediaRecorder
    try {
      if (window.__AI_MEDIA_RECORDER__) {
        try { window.__AI_MEDIA_RECORDER__.onstop = null; } catch (e) {}
        if (window.__AI_MEDIA_RECORDER__.state !== "inactive") window.__AI_MEDIA_RECORDER__.stop();
        window.__AI_MEDIA_RECORDER__ = null;
        mediaRecorder = null;
        chunks = [];
      }
    } catch (e) {}

    // Stop ElevenLabs Audio Player
    try {
      const ap = window.__AI_AUDIO_PLAYER__;
      if (ap) {
        try { ap.onended = ap.oncanplaythrough = ap.onerror = null; } catch (e) {}
        try { ap.pause(); ap.currentTime = 0; } catch (e) {}
        try { if (ap.src && ap.src.startsWith && ap.src.startsWith("blob:")) URL.revokeObjectURL(ap.src); } catch(e){}
        try { ap.removeAttribute && ap.removeAttribute("src"); } catch(e){}
        try { ap.load && ap.load(); } catch(e){}
        try { ap.remove && ap.remove(); } catch(e){}
        window.__AI_AUDIO_PLAYER__ = null;
        audioPlayer = null;
      }

      const fallback = document.getElementById("aiVoice");
      if (fallback) {
        try { fallback.pause(); fallback.currentTime = 0; } catch(e){}
        try { if (fallback.src && fallback.src.startsWith && fallback.src.startsWith("blob:")) URL.revokeObjectURL(fallback.src); } catch(e){}
        try { fallback.removeAttribute && fallback.removeAttribute("src"); } catch(e){}
        try { fallback.load && fallback.load(); } catch(e){}
        try { fallback.remove && fallback.remove(); } catch(e){}
      }
    } catch(e){}

    // Stop mic streams
    try {
      if (window.__AI_MIC_STREAM__) {
        try { window.__AI_MIC_STREAM__.getTracks().forEach(t => t.stop()); } catch(e){}
        window.__AI_MIC_STREAM__ = null;
        audioStream = null;
      }
      if (window.__activeStreams__ && Array.isArray(window.__activeStreams__)) {
        try { window.__activeStreams__.forEach(s => { try { s.getTracks().forEach(t=>t.stop()) } catch(e){} }); } catch(e){}
        window.__activeStreams__ = [];
      }
    } catch(e){}

    // Close AudioContext
    try {
      if (window.__AI_AUDIO_CONTEXT__) {
        try { window.__AI_AUDIO_CONTEXT__.close(); } catch(e){}
        window.__AI_AUDIO_CONTEXT__ = null;
        audioContext = null;
      }
    } catch(e){}

    // Abort any fetch/TTS requests
    try {
      if (window.__AI_FETCH_CONTROLLER__) {
        try { window.__AI_FETCH_CONTROLLER__.abort(); } catch(e){}
        window.__AI_FETCH_CONTROLLER__ = null;
      }
    } catch(e){}

    // Cancel speechSynthesis fallback
    try { if (window.speechSynthesis && (window.speechSynthesis.speaking || window.speechSynthesis.pending)) window.speechSynthesis.cancel(); } catch(e){}

    console.log("✅ FORCE STOP COMPLETE — Everything terminated.");
  };

  // =============================
  // MIC INITIALIZATION
  // =============================
  async function initMic() {
    if (window.__AI_FORCE_STOP__) throw new Error("Force-stopped");
    try {
      if (!audioStream || !audioStream.getTracks().some(t => t.readyState === 'live' && t.kind === 'audio')) {
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        window.__AI_MIC_STREAM__ = audioStream;
        if (!window.__activeStreams__) window.__activeStreams__ = [];
        if (!window.__activeStreams__.includes(audioStream)) window.__activeStreams__.push(audioStream);
      }
      console.log("🎤 Mic ready");
    } catch (e) {
      console.error("Mic error:", e);
      safeSetVar(aiResponseVar, "🎤 Mic permission denied.");
      throw e;
    }
  }

  // =============================
  // RECORDING LOGIC (SILENCE-BASED STOP)
  // =============================
  let silenceStart = null;
  const SILENCE_THRESHOLD = 0.015;
  const SILENCE_DURATION = 2000;

  async function startRecording() {
    if (window.__AI_FORCE_STOP__) return;
    if (!audioStream || isRecording || isAIResponding || window.__AI_SPEAKING__) return;

    console.log("🎙 Recording started...");
    isRecording = true;
    chunks = [];
    silenceStart = null;
    updateSpeakingListeningVars();  // <-- update vars

    try { mediaRecorder = new MediaRecorder(audioStream); window.__AI_MEDIA_RECORDER__ = mediaRecorder; } catch(err){ isRecording=false; return; }

    mediaRecorder.ondataavailable = e => { try{ chunks.push(e.data); } catch(e){} };

    mediaRecorder.onstop = async () => {
      if (window.__AI_FORCE_STOP__) { isRecording=false; chunks=[]; return; }

      isRecording = false;
      updateSpeakingListeningVars(); // <-- update vars when recording stops

      const blob = new Blob(chunks, { type: "audio/webm" });
      chunks = [];

      if (await isAudioLoudEnough(blob)) await processAudio(blob);
      else console.log("🔇 Audio too quiet, ignoring.");
    };

    mediaRecorder.start();
    monitorSilence();
  }

  function monitorSilence() {
    if (!isRecording || !audioContext) return;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    const data = new Float32Array(analyser.fftSize);

    try { const src = audioContext.createMediaStreamSource(audioStream); src.connect(analyser); } catch(e){ return; }

    function check() {
      if (window.__AI_FORCE_STOP__) { try { if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop(); } catch(e){}; return; }
      if (!isRecording) return;

      analyser.getFloatTimeDomainData(data);

      let sum=0; for(let i=0;i<data.length;i++) sum+=data[i]*data[i];
      const rms=Math.sqrt(sum/data.length);
      const now=performance.now();

      if (rms<SILENCE_THRESHOLD) { if(!silenceStart) silenceStart=now; else if(now-silenceStart>=SILENCE_DURATION){ try{ if(mediaRecorder && mediaRecorder.state==="recording") mediaRecorder.stop(); } catch(e){} return; } }
      else silenceStart=null;

      requestAnimationFrame(check);
    }
    requestAnimationFrame(check);
  }

  function isAudioLoudEnough(blob) {
    return new Promise(res => {
      const reader=new FileReader();
      reader.onload=e=>{
        try{
          const ctx=new (window.AudioContext||window.webkitAudioContext)();
          ctx.decodeAudioData(e.target.result, buffer=>{
            const data=buffer.getChannelData(0);
            let sum=0; for(let i=0;i<data.length;i++) sum+=data[i]*data[i];
            const rms=Math.sqrt(sum/data.length);
            try{ctx.close();}catch(e){}
            res(rms>0.002);
          },()=>{try{ctx.close();}catch(e){} res(false);});
        }catch(err){ console.error("Audio loud check error:",err); res(false); }
      };
      reader.readAsArrayBuffer(blob);
    });
  }

  // =============================
  // PROCESS AUDIO → WHISPER → GPT
  // =============================
  async function processAudio(blob) {
    if (window.__AI_FORCE_STOP__) return;
    try {
      window.__AI_FETCH_CONTROLLER__ = new AbortController();
      const fd=new FormData();
      fd.append("file",blob,"audio.webm");
      fd.append("model","whisper-1");

      const resp=await fetch(`${openaiURL}/audio/transcriptions`,{
        method:"POST",
        headers:{Authorization:`Bearer ${openAIKey}`},
        body:fd,
        signal:window.__AI_FETCH_CONTROLLER__.signal
      });

      const data=await resp.json();
      const text=data?.text?.trim();
      if(!text) return;

      safeSetVar(userSpeechVar,text);
      await getAIResponse(text);
    } catch(e){ 
      if(e && e.name==="AbortError") console.warn("Whisper fetch aborted");
      else console.error("Whisper error:",e);
      safeSetVar(aiResponseVar,"Transcription error.");
    } finally{ window.__AI_FETCH_CONTROLLER__=null; }
  }

  // =============================
  // GET GPT RESPONSE
  // =============================
  async function getAIResponse(prompt){
    if(window.__AI_FORCE_STOP__) return;
    isAIResponding=true;
    conversationHistory.push({role:"user",content:prompt});

    try{
      window.__AI_FETCH_CONTROLLER__=new AbortController();

      const resp=await fetch(`${openaiURL}/chat/completions`,{
        method:"POST",
        headers:{"Content-Type":"application/json",Authorization:`Bearer ${openAIKey}`},
        body:JSON.stringify({model:"gpt-4o-mini",messages:conversationHistory}),
        signal:window.__AI_FETCH_CONTROLLER__.signal
      });

      const data=await resp.json();
      const aiText=data?.choices?.[0]?.message?.content || "No reply.";
      conversationHistory.push({role:"assistant",content:aiText});

      safeSetVar(aiResponseVar,aiText);

      await speakElevenLabs(aiText);
    } catch(e){
      if(e && e.name==="AbortError") console.warn("GPT fetch aborted");
      else console.error("GPT error:",e);
      safeSetVar(aiResponseVar,"AI response error.");
    } finally{ window.__AI_FETCH_CONTROLLER__=null; isAIResponding=false; }
  }

  // =============================
  // ELEVENLABS TTS
  // =============================
  async function speakElevenLabs(text){
  if (window.__AI_FORCE_STOP__) return;

  try {
    if (audioPlayer) {
      try { 
        audioPlayer.pause(); 
        if (audioPlayer.src && audioPlayer.src.startsWith("blob:")) URL.revokeObjectURL(audioPlayer.src); 
        audioPlayer.remove && audioPlayer.remove(); 
      } catch(e){}
      audioPlayer = null;
      window.__AI_AUDIO_PLAYER__ = null;
    }

    const body = {
      text: text,
      model_id: "eleven_flash_v2_5",
      voice_settings: { stability: 0.5, similarity_boost: 0.8 }
    };

    window.__AI_FETCH_CONTROLLER__ = new AbortController();

    const resp = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/kC1WIuSSgwH2T8iOV4iJ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": elevenLabsKey
        },
        body: JSON.stringify(body),
        signal: window.__AI_FETCH_CONTROLLER__.signal
      }
    );

    const arrayBuffer = await resp.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);

    audioPlayer = new Audio(url);
    window.__AI_AUDIO_PLAYER__ = audioPlayer;

    // ------------------------------
    // FIX: Set AI_SPEAKING only when audio actually starts
    // ------------------------------
    audioPlayer.onplay = () => {
      window.__AI_SPEAKING__ = true;
      updateSpeakingListeningVars();
    };

    audioPlayer.onended = () => {
  window.__AI_SPEAKING__ = false;
  updateSpeakingListeningVars();
  try { URL.revokeObjectURL(url); } catch(e){}
  audioPlayer = null;
  window.__AI_AUDIO_PLAYER__ = null;
  // ❌ Removed startRecording() to fix AI_Listening flash
};


    audioPlayer.onerror = () => {
      window.__AI_SPEAKING__ = false;
      updateSpeakingListeningVars();
    };

    await audioPlayer.play();   // Start playback

  }
  catch (e) {
    console.error("🎵 ElevenLabs TTS error:", e);
    window.__AI_SPEAKING__ = false;
    updateSpeakingListeningVars();
  }
}


  // =============================
  // CONTINUOUS VOICE DETECTION
  // =============================
  async function setupVoiceDetection(){
    if(window.__VOICE_LOOP_RUNNING__) return;
    if(window.__AI_FORCE_STOP__) return;
    window.__VOICE_LOOP_RUNNING__=true;

    if(!audioContext || audioContext.state==='closed'){ audioContext=new (window.AudioContext||window.webkitAudioContext)(); window.__AI_AUDIO_CONTEXT__=audioContext; }

    let src;
    try{ src=audioContext.createMediaStreamSource(audioStream); } catch(e){ console.warn("Could not create media stream source for detection:",e); return; }

    const analyser=audioContext.createAnalyser();
    analyser.fftSize=2048;
    const data=new Float32Array(analyser.fftSize);
    src.connect(analyser);

    const RMS_THRESHOLD=0.02;
    let lastSpeechTime=0;
    const SPEECH_DEBOUNCE_MS=300;

    function loop(){
      if(window.__AI_FORCE_STOP__){ window.__VOICE_LOOP_RUNNING__=false; return; }

      try{
        analyser.getFloatTimeDomainData(data);
        let sum=0; for(let v of data) sum+=v*v;
        const rms=Math.sqrt(sum/data.length);
        const now=performance.now();

        if(window.__AI_SPEAKING__===true){ requestAnimationFrame(loop); return; }

        if(rms>RMS_THRESHOLD && !isRecording && !isAIResponding && now-lastSpeechTime>SPEECH_DEBOUNCE_MS && document.visibilityState==="visible"){
          lastSpeechTime=now;
          if(!window.__AI_SPEAKING__) startRecording();
        }

      } catch(e){ console.warn("Analyser loop error:",e); }

      requestAnimationFrame(loop);
    }

    loop();
  }

  // =============================
  // START
  // =============================
  try{
    await initMic();
    await setupVoiceDetection();
    console.log("✅ Voice assistant initialized");
  } catch(e){ console.warn("Initialization aborted:",e); }

  window.stopAndKillAI = window.forceStopAI;

})();

}

window.Script2 = function()
{
  if (window.forceStopAI) window.forceStopAI();

}

};

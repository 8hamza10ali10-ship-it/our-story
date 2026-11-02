// عدّل التاريخ هنا بصيغة YYYY-MM-DD بعد ما تحددوا تاريخ بداية العدّاد.
const relationshipStartDate = "2025-12-13T23:30:00+02:00";

const intro = document.getElementById("intro");
const openStoryButton = document.getElementById("openStory");

openStoryButton.addEventListener("click", () => {
  intro.classList.add("is-hidden");
  document.body.classList.add("story-open");
  window.setTimeout(() => {
    intro.setAttribute("aria-hidden", "true");
    document.getElementById("message").scrollIntoView({ behavior: "smooth" });
  }, 250);
});

const counterCaption = document.getElementById("counterCaption");

function updateCounter() {
  if (!relationshipStartDate) {
    counterCaption.textContent = "هنحدد تاريخ البداية مع بعض ❤️";
    return;
  }

  const start = new Date(relationshipStartDate);
  if (Number.isNaN(start.getTime())) {
    counterCaption.textContent = "راجعوا تاريخ البداية المكتوب في ملف js/main.js";
    return;
  }

  let diff = Math.floor((Date.now() - start.getTime()) / 1000);
  if (diff < 0) {
    counterCaption.textContent = "العدّاد هيبدأ في التاريخ اللي اخترتوه ❤️";
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "0";
    });
    return;
  }

  const days = Math.floor(diff / 86400);
  diff %= 86400;
  const hours = Math.floor(diff / 3600);
  diff %= 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;

  document.getElementById("days").textContent = days.toLocaleString("en-US");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  counterCaption.textContent = "وكل ثانية جاية لسه ممكن تحمل ذكرى جديدة ❤️";
}
updateCounter();
window.setInterval(updateCounter, 1000);

// مشغّل الأغاني: يشغّل أغنية واحدة في كل مرة، مع شريط التقدم والصوت.
const songCards = [...document.querySelectorAll(".song-card")];
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}
songCards.forEach(card => {
  const audio = card.querySelector(".song-audio");
  const play = card.querySelector(".play-button");
  const progress = card.querySelector(".audio-progress");
  const current = card.querySelector(".current-time");
  const duration = card.querySelector(".duration");
  const mute = card.querySelector(".mute-button");

  play.addEventListener("click", async () => {
    if (audio.paused) {
      songCards.forEach(other => {
        const otherAudio = other.querySelector(".song-audio");
        if (otherAudio !== audio) {
          otherAudio.pause();
          other.classList.remove("is-playing");
          other.querySelector(".play-button").textContent = "▶";
        }
      });
      try {
        await audio.play();
        card.classList.add("is-playing");
        play.textContent = "Ⅱ";
      } catch (error) {
        alert("مش قادر أشغّل الملف. اتأكد إن اسم ملف الأغنية في الكود مطابق لاسمه داخل فولدر music.");
      }
    } else {
      audio.pause();
      card.classList.remove("is-playing");
      play.textContent = "▶";
    }
  });

  audio.addEventListener("loadedmetadata", () => { duration.textContent = formatTime(audio.duration); });
  audio.addEventListener("timeupdate", () => {
    current.textContent = formatTime(audio.currentTime);
    progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  });
  progress.addEventListener("input", () => {
    if (audio.duration) audio.currentTime = (Number(progress.value) / 100) * audio.duration;
  });
  audio.addEventListener("ended", () => {
    card.classList.remove("is-playing");
    play.textContent = "▶";
    progress.value = 0;
  });
  mute.addEventListener("click", () => {
    audio.muted = !audio.muted;
    mute.textContent = audio.muted ? "×" : "♫";
    mute.setAttribute("aria-label", audio.muted ? "إلغاء كتم الصوت" : "كتم الصوت");
  });
});

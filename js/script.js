document.addEventListener('DOMContentLoaded', () => {
  // ── Student name from URL ──────────────────────────────
  const params = new URLSearchParams(window.location.search);
  const student = params.get('student') || 'Student';
  const nameEl = document.getElementById('student-name');
  if (nameEl) nameEl.textContent = student;

  // Update page title
  document.title = `Mock Exam – ${student}`;

  // ── 60-minute countdown timer ─────────────────────────
  const timerEl = document.getElementById('timer');
  if (!timerEl) return;

  let totalSeconds = 60 * 60;

  function formatTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  timerEl.textContent = formatTime(totalSeconds);

  const interval = setInterval(() => {
    totalSeconds--;

    if (totalSeconds <= 0) {
      clearInterval(interval);
      timerEl.textContent = "Time's up!";
      timerEl.classList.add('warning');
      return;
    }

    timerEl.textContent = formatTime(totalSeconds);

    if (totalSeconds <= 5 * 60) {
      timerEl.classList.add('warning');
    }
  }, 1000);

  // ── Print button ──────────────────────────────────────
  const printBtn = document.getElementById('print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }
});

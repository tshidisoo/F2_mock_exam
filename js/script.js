document.addEventListener('DOMContentLoaded', () => {

  // ── Student name from URL ──────────────────────────────
  const params = new URLSearchParams(window.location.search);
  const student = params.get('student') || 'Student';
  const nameEl = document.getElementById('student-name');
  if (nameEl) nameEl.textContent = student;
  document.title = `Mock Exam – ${student}`;

  // ── 60-minute countdown timer ─────────────────────────
  const timerEl = document.getElementById('timer');
  if (timerEl) {
    let totalSeconds = 60 * 60;

    const fmt = s => {
      const m = Math.floor(s / 60).toString().padStart(2, '0');
      const sec = (s % 60).toString().padStart(2, '0');
      return `${m}:${sec}`;
    };

    timerEl.textContent = fmt(totalSeconds);

    const tick = setInterval(() => {
      totalSeconds--;
      if (totalSeconds <= 0) {
        clearInterval(tick);
        timerEl.textContent = "Time's up!";
        timerEl.classList.add('warning');
        return;
      }
      timerEl.textContent = fmt(totalSeconds);
      if (totalSeconds <= 5 * 60) timerEl.classList.add('warning');
    }, 1000);
  }

  // ── Print button ──────────────────────────────────────
  const printBtn = document.getElementById('print-btn');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  // ── Exercise 4: click-to-circle adjectives (.cw) ──────
  document.querySelectorAll('.cw').forEach(word => {
    word.addEventListener('click', () => word.classList.toggle('circled'));
  });

  // ── Exercise 5c: radio-style word choices ─────────────
  document.querySelectorAll('.choice-group').forEach(group => {
    group.querySelectorAll('.choice-word').forEach(word => {
      word.addEventListener('click', () => {
        // deselect siblings, toggle this one
        const siblings = group.querySelectorAll('.choice-word');
        const wasSelected = word.classList.contains('selected');
        siblings.forEach(s => s.classList.remove('selected'));
        if (!wasSelected) word.classList.add('selected');
      });
    });
  });

});

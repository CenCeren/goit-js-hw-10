// Flatpickr ile tarih seçici başlatma
const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.getElementById('startButton');
let userSelectedDate = null;

// Flatpickr seçenekleri
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      iziToast.error({
        title: 'Geçersiz Tarih',
        message: 'Lütfen gelecekte bir tarih seçin.',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
});

// Sayacın durumu
let countdownInterval = null;

// Zamanlayıcıyı başlatma
function startCountdown() {
  if (!userSelectedDate) return;

  startButton.disabled = true; // Start butonunu devre dışı bırak

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = userSelectedDate - currentTime;

    // Eğer süre bitmişse, sayacı durdur
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0, 0, 0, 0);
      return;
    }

    // Kalan zamanı hesapla
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);
}

// Zamanlayıcıyı güncelleme
function updateTimer(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

// Millisaniyeleri günlere, saatlere, dakika ve saniyeye dönüştürme
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Sayıları 2 haneli hale getirme
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Start butonuna tıklama olayını dinleyin
startButton.addEventListener('click', startCountdown);

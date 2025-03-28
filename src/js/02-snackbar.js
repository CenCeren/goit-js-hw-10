// script.js

document.querySelector('.form').addEventListener('submit', function (e) {
    e.preventDefault(); // Formun sayfayı yeniden yüklemesini engelle

    // Formdaki input elemanlarını al
    const delay = parseInt(e.target.delay.value);
    const state = e.target.state.value;

    // Promise oluşturuluyor
    const promise = new Promise((resolve, reject) => {
        // Gecikme süresi kadar bekle
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay); // Promise başarılı olduğunda resolve
            } else {
                reject(delay); // Promise reddedildiğinde reject
            }
        }, delay);
    });

    // Promise durumuna göre mesaj göster
    promise
        .then((delay) => {
            // Başarılı olduğunda
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight'
            });
        })
        .catch((delay) => {
            // Reddedildiğinde
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight'
            });
        });
});

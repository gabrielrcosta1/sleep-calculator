document.getElementById('sleep-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const sleepTime = document.getElementById('sleep-time').value;
    if (!sleepTime) {
        alert('Por favor, insira a hora de dormir!');
        return;
    }

    const [sleepHours, sleepMinutes] = sleepTime.split(':').map(Number);
    const sleepDate = new Date();
    sleepDate.setHours(sleepHours, sleepMinutes, 0, 0);

    // Horários para acordar (ajustáveis)
    const wakeUpTimes = ['05:00', '06:30', '07:00', '08:00', '09:00'];
    let resultHTML = `<p>Se você for dormir às ${sleepTime}:</p><ul class="list-disc pl-6">`;

    wakeUpTimes.forEach(time => {
        const [wakeHours, wakeMinutes] = time.split(':').map(Number);
        const wakeUpDate = new Date();
        wakeUpDate.setHours(wakeHours, wakeMinutes, 0, 0);

        // Se o horário de acordar for antes do horário de dormir, adiciona 1 dia
        if (wakeUpDate <= sleepDate) {
            wakeUpDate.setDate(wakeUpDate.getDate() + 1);
        }

        const diffMs = wakeUpDate - sleepDate;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Converte para horas
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Converte para minutos

        resultHTML += `<li>Se acordar às ${time}, terá dormido ${diffHours} horas e ${diffMinutes} minutos.</li>`;
    });

    resultHTML += '</ul>';
    document.getElementById('result').innerHTML = resultHTML;
});
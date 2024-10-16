document.getElementById('sleep-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const sleepTime = document.getElementById('sleep-time').value;
    const wakeTime = document.getElementById('wake-time').value;
    
    if (!sleepTime || !wakeTime) {
        alert('Por favor, insira ambos os horários de dormir e acordar!');
        return;
    }
    /**
     * We convert bedtime and wake-up time into Date objects
     */
    const [sleepHours, sleepMinutes] = sleepTime.split(':').map(Number);
    const sleepDate = new Date();
    sleepDate.setHours(sleepHours, sleepMinutes, 0, 0);

    const [wakeHours, wakeMinutes] = wakeTime.split(':').map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(wakeHours, wakeMinutes, 0, 0);
    /**
     * If your wake-up time is before bedtime, add 1 day to your wake-up time
     */
    if (wakeDate <= sleepDate) {
        wakeDate.setDate(wakeDate.getDate() + 1);
    }
    /**
     * Calculates the difference in milliseconds
     */
    const diffMs = wakeDate - sleepDate;

   /**
    * Converts to hours and minutes
    */
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    /**
     * Update the result in HTML
     */
    document.getElementById('sleep-result').textContent = 
        `Tempo total de sono: ${diffHours} horas e ${diffMinutes} minutos.`;
});
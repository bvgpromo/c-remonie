const localtunnel = require('localtunnel');

async function startTunnel() {
  try {
    const tunnel = await localtunnel({ port: 3000, subdomain: 'c-remonie-live' });

    console.log('Tunnel started at:', tunnel.url);

    tunnel.on('close', () => {
      console.log('Tunnel closed. Restarting in 3 seconds...');
      setTimeout(startTunnel, 3000);
    });
    
    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
    });
  } catch (err) {
    console.error('Error starting tunnel:', err);
    setTimeout(startTunnel, 5000);
  }
}

startTunnel();

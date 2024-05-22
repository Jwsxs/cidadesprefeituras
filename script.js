document.addEventListener('DOMContentLoaded', () => {
    fetch('cidades.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n').filter(line => line.trim() !== '');
            const container = document.getElementById('cityContainer');

            if (lines.length === 0) {
                container.innerHTML = '<p>Nenhum dado disponível.</p>';
            } else {
                lines.forEach(line => {
                    const [city, website] = line.split(',');
                    if (city && website) {
                        const trimmedCity = city.trim();
                        const trimmedWebsite = website.trim();
                        const button = document.createElement('button');
                        button.className = 'button cityButton';
                        button.textContent = trimmedCity;
                        button.setAttribute('aria-label', `Website da prefeitura de ${trimmedCity}`);
                        button.addEventListener('click', () => {
                            window.open(trimmedWebsite, '_blank');
                        });
                        container.appendChild(button);
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const container = document.getElementById('cityContainer');
            container.innerHTML = '<p>Erro ao carregar os dados. Por favor, tente novamente mais tarde.</p>';
        });
});

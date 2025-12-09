(function () {
    if (window.__speedline_js_loaded) return;
    window.__speedline_js_loaded = true;

    document.addEventListener('DOMContentLoaded', () => {
        // panel mínimo con un solo botón para ejecutar un bucle
        const panel = document.createElement('aside');
        panel.id = 'sl-js-panel';
        panel.className = 'sl-panel';
        panel.innerHTML = `
            <div class="sl-header">
                <strong class="sl-title">Bucle — SpeedLine</strong>
            </div>
            <div class="sl-controls">
                <button id="sl-run" class="sl-btn">Ejecutar bucle</button>
            </div>
            <pre id="sl-output" class="sl-output" aria-live="polite"></pre>
        `;
        document.body.appendChild(panel);

        const out = panel.querySelector('#sl-output');
        const clear = () => { out.textContent = ''; };
        const log = (s) => { out.textContent += s + '\n'; out.scrollTop = out.scrollHeight; };

        // único bucle: ejemplo for...of que lista modelos
        function runLoop() {
            clear();
            const modelos = ['Moto Deportiva', 'Coche Deportivo', 'SUV Premium', 'Moto Touring'];
            log('Listado de modelos (bucle for...of):');
            for (const modelo of modelos) {
                log('- ' + modelo);
            }
        }

        // enlazar botón
        panel.querySelector('#sl-run').addEventListener('click', runLoop);

        // mensaje inicial
        clear();
        log('Pulsa "Ejecutar bucle" para ver la salida.');
    });
})();
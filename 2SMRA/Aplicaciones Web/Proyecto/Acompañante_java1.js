(function () {
    if (window.__speedline_js_loaded) return;
    window.__speedline_js_loaded = true;

    document.addEventListener('DOMContentLoaded', () => {
        const state = {
            inventory: [
                { model: 'Moto Deportiva', type: 'Moto', price: 20000, stock: 3 },
                { model: 'Coche Deportivo', type: 'Coche', price: 65000, stock: 2 },
                { model: 'SUV Premium', type: 'Coche', price: 50000, stock: 1 }
            ]
        };

        // Crear panel
        const panel = document.createElement('aside');
        panel.id = 'sl-js-panel';
        panel.className = 'sl-panel';
        panel.innerHTML = `
            <div class="sl-header">
                <strong class="sl-title">Herramientas — SpeedLine</strong>
                <button id="sl-close" class="sl-close" title="Cerrar">✕</button>
            </div>

            <div class="sl-controls sl-form">
                <label><small>Modelo</small><input id="inp-model" class="sl-input" placeholder="Ej: Coche Deportivo"></label>
                <label><small>Tipo</small><input id="inp-type" class="sl-input" placeholder="Coche / Moto"></label>
                <label><small>Precio</small><input id="inp-price" class="sl-input" type="number" placeholder="65000"></label>
                <label><small>Stock</small><input id="inp-stock" class="sl-input" type="number" placeholder="3"></label>
                <button class="sl-btn" data-action="save">Guardar</button>
            </div>

            <div class="sl-controls">
                <button class="sl-btn" data-action="show">Mostrar</button>
                <button class="sl-btn" data-action="ifonly">If (precio)</button>
                <button class="sl-btn" data-action="loop">Listar modelos</button>
                <button class="sl-btn" data-action="arrays">Inventario (demo)</button>
                <button class="sl-btn" data-action="funcs">Funciones</button>
                <button class="sl-btn" data-action="clear">Limpiar</button>
            </div>

            <pre id="sl-output" class="sl-output" aria-live="polite"></pre>
        `;
        document.body.appendChild(panel);

        const out = panel.querySelector('#sl-output');
        const clearOut = () => { out.textContent = ''; };
        const log = s => { out.textContent += s + '\n'; out.scrollTop = out.scrollHeight; };

        function parseInputs() {
            return {
                model: panel.querySelector('#inp-model').value.trim(),
                type: panel.querySelector('#inp-type').value.trim(),
                price: Number(panel.querySelector('#inp-price').value) || 0,
                stock: Number(panel.querySelector('#inp-stock').value) || 0
            };
        }

        // 1. Guardar: añade elemento al inventory
        function doSave() {
            const v = parseInputs();
            if (!v.model || !v.type) {
                clearOut(); log('Rellena Modelo y Tipo antes de guardar.');
                return;
            }
            state.inventory.push({ model: v.model, type: v.type, price: v.price, stock: v.stock });
            clearOut(); log(`Guardado: ${v.model} (${v.type}) — ${formatPrice(v.price)} — stock ${v.stock}`);
        }

        // 2. Mostrar: muestra inventario completo
        function doShow() {
            clearOut();
            log('Inventario actual:');
            state.inventory.forEach((it, i) => {
                log(`${i + 1}. ${it.model} — ${it.type} — ${formatPrice(it.price)} — stock: ${it.stock}`);
            });
        }

        // 3. If only: clasifica según precio (solo IF)
        function doIfOnly() {
            clearOut();
            const v = parseInputs();
            const price = v.price || (state.inventory[0] && state.inventory[0].price) || 0;
            if (price === 0) { log('Precio no definido.'); return; }
            if (price > 60000) log('If: Categoría -> Premium');
            else if (price > 30000) log('If: Categoría -> Media');
            else log('If: Categoría -> Económica');
        }

        // 4. Loop: listar solo modelos (for...of)
        function doLoop() {
            clearOut();
            log('Modelos disponibles:');
            for (const item of state.inventory) {
                log('- ' + item.model + ' (' + item.type + ')');
            }
        }

        // 5. Arrays: operaciones básicas (demo)
        function doArrays() {
            clearOut();
            log('Operaciones arrays demo:');
            const demo = ['Moto Deportiva', 'Coche Deportivo', 'SUV Premium'];
            log('Inicial: ' + JSON.stringify(demo));
            demo.push('Moto Touring'); log('push -> ' + JSON.stringify(demo));
            const removed = demo.pop(); log('pop -> eliminado: ' + removed + ' -> ' + JSON.stringify(demo));
            const filtered = demo.filter(m => m.includes('Deportivo')); log('filter (Deportivo) -> ' + JSON.stringify(filtered));
        }

        // 6. Funciones: formateo y cálculo
        function formatPrice(n) {
            return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
        }
        function calcTax(n, pct) {
            return Math.round(n * (1 + pct / 100));
        }
        function doFunctions() {
            clearOut();
            const v = parseInputs();
            const base = v.price || (state.inventory[0] && state.inventory[0].price) || 0;
            log('Precio base: ' + formatPrice(base));
            log('Con IVA 21%: ' + formatPrice(calcTax(base, 21)));
        }

        // delegado de clicks
        panel.addEventListener('click', (ev) => {
            const action = ev.target.getAttribute && ev.target.getAttribute('data-action');
            if (!action) {
                if (ev.target.id === 'sl-close') panel.remove();
                return;
            }
            switch (action) {
                case 'save': doSave(); break;
                case 'show': doShow(); break;
                case 'ifonly': doIfOnly(); break;
                case 'loop': doLoop(); break;
                case 'arrays': doArrays(); break;
                case 'funcs': doFunctions(); break;
                case 'clear': clearOut(); break;
            }
        });

        clearOut(); log('Panel de herramientas cargado. Rellena campos y usa los botones.');
    });
})();
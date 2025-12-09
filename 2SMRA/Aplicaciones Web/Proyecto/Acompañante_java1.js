(function () { // función envolvente para evitar conflictos
    if (window.__speedline_js_loaded) return; // evita cargar dos veces
    window.__speedline_js_loaded = true; // marca como cargado

    document.addEventListener('DOMContentLoaded', () => { // espera a que cargue el HTML
        
        // Estado: objeto que guarda los datos de vehículos
        const state = {
            inventory: [ // inventario de ejemplo
                { model: 'Moto Deportiva', type: 'Moto', price: 20000, stock: 3 }, // moto 1
                { model: 'Coche Deportivo', type: 'Coche', price: 65000, stock: 2 }, // coche 1
                { model: 'SUV Premium', type: 'Coche', price: 50000, stock: 1 } // coche 2
            ]
        };

        // Crear panel: caja flotante con herramientas
        const panel = document.createElement('aside'); // elemento de panel
        panel.id = 'sl-js-panel'; // identidad del panel
        panel.className = 'sl-panel'; // clase para estilos
        
        panel.innerHTML = ` <!-- contenido HTML del panel -->
            <div class="sl-header"> <!-- encabezado del panel -->
                <strong class="sl-title">Herramientas — SpeedLine</strong> <!-- título -->
                <button id="sl-close" class="sl-close" title="Cerrar">✕</button> <!-- botón cerrar -->
            </div>

            <div class="sl-controls sl-form"> <!-- formulario para entrada de datos -->
                <label><small>Modelo</small><input id="inp-model" class="sl-input" placeholder="Ej: Coche Deportivo"></label> <!-- campo modelo -->
                <label><small>Tipo</small><input id="inp-type" class="sl-input" placeholder="Coche / Moto"></label> <!-- campo tipo -->
                <label><small>Precio</small><input id="inp-price" class="sl-input" type="number" placeholder="65000"></label> <!-- campo precio -->
                <label><small>Stock</small><input id="inp-stock" class="sl-input" type="number" placeholder="3"></label> <!-- campo stock -->
                <button class="sl-btn" data-action="save">Guardar</button> <!-- botón guardar -->
            </div>

            <div class="sl-controls"> <!-- botones de herramientas -->
                <button class="sl-btn" data-action="show">Mostrar</button> <!-- muestra inventario -->
                <button class="sl-btn" data-action="ifonly">If (precio)</button> <!-- prueba if -->
                <button class="sl-btn" data-action="loop">Listar modelos</button> <!-- usa bucle -->
                <button class="sl-btn" data-action="arrays">Inventario (demo)</button> <!-- usa arrays -->
                <button class="sl-btn" data-action="funcs">Funciones</button> <!-- usa funciones -->
                <button class="sl-btn" data-action="clear">Limpiar</button> <!-- limpia salida -->
            </div>

            <pre id="sl-output" class="sl-output" aria-live="polite"></pre> <!-- área de salida de texto -->
        `;
        
        document.body.appendChild(panel); // añade el panel a la página

        // Funciones de utilidad
        const out = panel.querySelector('#sl-output'); // obtiene área de salida
        const clearOut = () => { out.textContent = ''; }; // limpia la salida
        const log = s => { // añade texto a la salida
            out.textContent += s + '\n'; 
            out.scrollTop = out.scrollHeight; // desplaza hacia abajo
        };

        // Lee los campos de entrada del formulario
        function parseInputs() {
            return {
                model: panel.querySelector('#inp-model').value.trim(), // obtiene modelo
                type: panel.querySelector('#inp-type').value.trim(), // obtiene tipo
                price: Number(panel.querySelector('#inp-price').value) || 0, // obtiene precio
                stock: Number(panel.querySelector('#inp-stock').value) || 0 // obtiene stock
            };
        }

        // 1. GUARDAR: añade un vehículo nuevo al inventario
        function doSave() {
            const v = parseInputs(); // lee los datos
            if (!v.model || !v.type) { // valida que rellene los campos
                clearOut(); 
                log('Rellena Modelo y Tipo antes de guardar.');
                return;
            }
            state.inventory.push({ model: v.model, type: v.type, price: v.price, stock: v.stock }); // añade a la lista
            clearOut(); 
            log(`Guardado: ${v.model} (${v.type}) — ${formatPrice(v.price)} — stock ${v.stock}`);
        }

        // 2. MOSTRAR: lista todos los vehículos del inventario
        function doShow() {
            clearOut();
            log('Inventario actual:'); // encabezado
            state.inventory.forEach((it, i) => { // recorre cada vehículo
                log(`${i + 1}. ${it.model} — ${it.type} — ${formatPrice(it.price)} — stock: ${it.stock}`);
            });
        }

        // 3. IF: clasifica el precio según rangos (solo if, sin switch)
        function doIfOnly() {
            clearOut();
            const v = parseInputs(); // obtiene datos
            const price = v.price || (state.inventory[0] && state.inventory[0].price) || 0; // precio a clasificar
            if (price === 0) { log('Precio no definido.'); return; } // error si no hay precio
            
            // Clasifica según rangos
            if (price > 60000) log('If: Categoría -> Premium'); // caro
            else if (price > 30000) log('If: Categoría -> Media'); // medio
            else log('If: Categoría -> Económica'); // barato
        }

        // 4. BUCLE: lista solo los modelos disponibles (for...of)
        function doLoop() {
            clearOut();
            log('Modelos disponibles:'); // encabezado
            for (const item of state.inventory) { // recorre con for...of
                log('- ' + item.model + ' (' + item.type + ')'); // imprime cada modelo
            }
        }

        // 5. ARRAYS: demuestra operaciones con arrays (push, pop, filter)
        function doArrays() {
            clearOut();
            log('Operaciones arrays demo:'); // encabezado
            
            const demo = ['Moto Deportiva', 'Coche Deportivo', 'SUV Premium']; // array inicial
            log('Inicial: ' + JSON.stringify(demo)); // muestra array
            
            demo.push('Moto Touring'); // añade elemento
            log('push -> ' + JSON.stringify(demo)); 
            
            const removed = demo.pop(); // elimina último elemento
            log('pop -> eliminado: ' + removed + ' -> ' + JSON.stringify(demo));
            
            const filtered = demo.filter(m => m.includes('Deportivo')); // filtra por texto
            log('filter (Deportivo) -> ' + JSON.stringify(filtered));
        }

        // 6. FUNCIONES: demuestra funciones personalizadas
        function formatPrice(n) { // formatea número a moneda EUR
            return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
        }
        
        function calcTax(n, pct) { // calcula precio con porcentaje
            return Math.round(n * (1 + pct / 100));
        }
        
        function doFunctions() {
            clearOut();
            const v = parseInputs(); // obtiene datos
            const base = v.price || (state.inventory[0] && state.inventory[0].price) || 0; // precio base
            
            log('Precio base: ' + formatPrice(base)); // muestra base
            log('Con IVA 21%: ' + formatPrice(calcTax(base, 21))); // calcula con IVA
        }

        // Escuchador de clics: detecta qué botón se presiona
        panel.addEventListener('click', (ev) => {
            const action = ev.target.getAttribute && ev.target.getAttribute('data-action'); // obtiene acción
            if (!action) { // si no hay acción
                if (ev.target.id === 'sl-close') panel.remove(); // cierra el panel
                return;
            }
            
            // Ejecuta la función correspondiente
            switch (action) {
                case 'save': doSave(); break; // guarda
                case 'show': doShow(); break; // muestra
                case 'ifonly': doIfOnly(); break; // prueba if
                case 'loop': doLoop(); break; // bucle
                case 'arrays': doArrays(); break; // arrays
                case 'funcs': doFunctions(); break; // funciones
                case 'clear': clearOut(); break; // limpia
            }
        });

        // Mensaje inicial
        clearOut(); 
        log('Panel de herramientas cargado. Rellena campos y usa los botones.');
    });
})();
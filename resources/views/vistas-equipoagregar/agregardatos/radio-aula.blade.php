<!-- resources/views/vistas-equipoagregar/agregardatos/radio-aula.blade.php -->

<div class="agregar-Aula">

    <h2 style="text-align: center">Agregar Aula</h2>

    <form action="{{ route('aula.agregar') }}" method="POST">
        @csrf <!-- Token de protección contra CSRF -->

        <div>
            <label>Área de Conocimiento:</label>
            <select class="area-vista-aula" id="area-select-aula" name="ID_Area" required>
                <option value="">Seleccione un área de conocimiento</option>
            </select>
        </div>

        <div>
            <label>Edificio:</label>
            <select class="edificio-vista-aula" id="edificio-vista-aula" name="ID_Edificio" required>
                <option value="">Seleccione un edificio</option>
            </select>
        </div>

        <div>
            <label>Nueva Aula:</label>
            <input type="text" name="Nombre_Aula" placeholder="Nueva Aula" required>
        </div>

        <button type="submit" class="btn">Agregar</button>
    </form>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const areaSelect = document.getElementById('area-select-aula');
        const edificioSelect = document.getElementById('edificio-vista-aula');

        // Cargar las áreas de conocimiento
        fetch('/area-conocimiento')
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    data.forEach(area => {
                        let option = document.createElement('option');
                        option.value = area.ID_Area;
                        option.textContent = area.Nombre;
                        areaSelect.appendChild(option);
                    });
                } else {
                    let option = document.createElement('option');
                    option.textContent = 'No hay áreas disponibles';
                    option.disabled = true;
                    areaSelect.appendChild(option);
                }
            })
            .catch(error => console.error('Error al cargar las áreas:', error));

        // Cargar los edificios asociados cuando se selecciona un área
        areaSelect.addEventListener('change', function () {
            const areaId = areaSelect.value;
            edificioSelect.innerHTML = '<option value="">Seleccione un edificio</option>';

            if (areaId) {
                fetch(`/edificio?areaId=${areaId}`)  // Usando el parámetro `areaId` como en tu controlador
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.length > 0) {
                            data.forEach(edificio => {
                                let option = document.createElement('option');
                                option.value = edificio.ID_Edificio;
                                option.textContent = edificio.Nombre_Edificio;
                                edificioSelect.appendChild(option);
                            });
                        } else {
                            let option = document.createElement('option');
                            option.textContent = 'No hay edificios disponibles';
                            option.disabled = true;
                            edificioSelect.appendChild(option);
                        }
                    })
                    .catch(error => {
                        console.error('Error al cargar los edificios:', error);
                        let option = document.createElement('option');
                        option.textContent = 'Error al cargar los edificios';
                        option.disabled = true;
                        edificioSelect.appendChild(option);
                    });
            }
        });
    });
</script>

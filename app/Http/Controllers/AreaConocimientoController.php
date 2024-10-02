<?php

namespace App\Http\Controllers;
use App\Models\AreaConocimiento;

use Illuminate\Http\Request;

class AreaConocimientoController extends Controller
{

    // Mostrar todos los datos de la tabla Area_Conocimiento
    public function ObtenerAreaConocimiento()
    {
        $areas = AreaConocimiento::all(); // Obtener todas las areas de conocimiento
        return response()->json($areas);// Retorna los datos en formato JSON
    }

    // Función para agregar una nueva área de conocimiento
    public function AgregarAreaConocimiento(Request $request)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Asegurarse de que el campo Nombre sea requerido
        ]);

        // Crear una nueva área de conocimiento
        $area = new AreaConocimiento();
        $area->Nombre = $request->Nombre; // Asignar el nombre desde el formulario
        $area->save(); // Guardar el nuevo registro en la base de datos

        // Redirigir o devolver una respuesta
        return redirect()->route('VistaAgregarDatos')->with('success', 'Área '. $area->Nombre. ' agregada exitosamente: ' );
    }

}

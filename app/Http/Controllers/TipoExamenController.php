<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoExamen;

class TipoExamenController extends Controller
{
    public function ObtenerTipoExamen(Request $request)
    {
        $tipoexamen = TipoExamen::all();
        return response()->json($tipoexamen);
    }

    public function AgregarTipoExamen(Request $request)
    {
        // Validar los datos
        $request->validate([
            'Nombre' => 'required|string|max:255', // Asegurarse de que el campo Nombre sea requerido
        ]);

        // Crear una nuevo Tipo de Examen
        $tipoexamen = new TipoExamen();
        $tipoexamen->Nombre = $request->Nombre;// Asignar el nombre desde el formulario
        $tipoexamen->save(); // Guardar el nuevo registro en la base de datos

        // Redirigir o devolver una respuesta
        return redirect()->back()->with('success', 'Tipo de Examen: '.$tipoexamen->Nombre.' agregada exitosamente.');
    }
}

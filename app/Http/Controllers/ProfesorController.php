<?php

namespace App\Http\Controllers;
use App\Models\Profesor;

use Illuminate\Http\Request;

class ProfesorController extends Controller
{
  
    public function ObtenerProfesor()
    {
        $profesor = Profesor::all();
        return response()->json($profesor);
    }

    public function ObtenerProfesorPorDepartamento(Request $request)
    {
        $departamentoId = $request->input('DepartamentoId');

        if ($departamentoId) {
            $profesores = Profesor::where('ID_Departamento', $departamentoId)->get();
            return response()->json($profesores);
        }
        return response()->json([]);
    }

    public function AgregarProfesor(Request $request)
    {
        // Validar la entrada del usuario
        $validated = $request->validate([
            'Nombre_Completo_P' => 'required|string|max:255',
            'Correo' => 'required|email|unique:profesores,Correo',
            'Contrasenia' => 'required|string|min:1',
            'ID_Departamento' => 'required|integer',
            'ID_Perfil' => 'required|integer',
        ]);

        // Crear un nuevo profesor
        $profesor = Profesor::create([
            'Nombre_Completo_P' => $validated['Nombre_Completo_P'],
            'Correo' => $validated['Correo'],
            'Contrasenia' => ($validated['Contrasenia']),
            'ID_Departamento' => $validated['ID_Departamento'],
            'ID_Perfil' => $validated['ID_Perfil'],
        ]);

        // Retornar respuesta
        return redirect()->route('VistaAgregarDatos')->with('success', 'Profesor ' . $profesor->Nombre_Completo_P . ' agregado exitosamente.');
    }
}

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

}

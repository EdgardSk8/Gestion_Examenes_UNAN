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

}

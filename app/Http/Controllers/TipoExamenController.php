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
}

<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Models\Carrera;
use App\Models\Departamento;
use App\Models\AreaConocimiento;
use Illuminate\Http\Request;


class EstudianteController extends Controller
{
    public function ObtenerEstudiantePorCarrera(Request $request)
    {
        $carreraId = $request->input('carreraId'); // Obtiene el ID de la carrera

        if ($carreraId) {
            // Obtiene los estudiantes asociados a la carrera seleccionada
            $estudiantes = Estudiante::where('ID_Carrera', $carreraId)->get();
            return response()->json($estudiantes); // Retorna los estudiantes en formato JSON
        }
    
        return response()->json([]); // Si no se proporciona un ID de carrera, retorna un array vacío en JSON
    }

    public function AgregarEstudiante(Request $request)
    {
        // Validar los datos recibidos en la solicitud
        $request->validate([
            'Nombre_Completo' => 'required|string|max:255',
            'Carnet' => 'required|string|max:20|unique:estudiantes,Carnet', // Si 'Carnet' es único
            'Genero' => 'required|string|in:Masculino,Femenino',
            'ID_Localidad' => 'required|integer|exists:localidades,ID_Localidad',
            'ID_Carrera' => 'required|integer|exists:carrera,ID_Carrera',
            'Correo_Institucional' => 'required|email|unique:estudiantes,Correo_Institucional', // Si el correo es único
        ]);

        // Crear el nuevo estudiante y asignar los datos
        $estudiante = new Estudiante();
        $estudiante->Nombre_Completo = $request->Nombre_Completo; // Asegúrate de que el nombre de la variable sea correcto
        $estudiante->Carnet = $request->Carnet;
        $estudiante->Genero = $request->Genero;
        $estudiante->ID_Localidad = $request->ID_Localidad;
        $estudiante->ID_Carrera = $request->ID_Carrera;
        $estudiante->Correo_Institucional = $request->Correo_Institucional;
        
        // Guardar el estudiante
        $estudiante->save();

        return redirect()->route('VistaAgregarDatos')->with('success', 'Estudiante agregado exitosamente');

    }

    public function validarCarnet(Request $request)
{
    $exists = Estudiante::where('Carnet', $request->carnet)->exists();
    return response()->json(['exists' => $exists]);
}

public function validarCorreo(Request $request)
{
    $exists = Estudiante::where('Correo_Institucional', $request->correo)->exists();
    return response()->json(['exists' => $exists]);
}


}

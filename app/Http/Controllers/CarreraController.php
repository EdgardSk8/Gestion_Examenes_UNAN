<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carrera;

class CarreraController extends Controller
{

    //Obtiene la carrera por medio del ID del departamento
    public function ObtenerCarreraPorDepartamento(Request $request)
    {
        $departamentoId = $request->input('departamentoId'); // Obtiene el ID del departamento
        
        if ($departamentoId) {
            // Obtiene las carreras asociadas al departamento seleccionado
            $carreras = Carrera::where('ID_Departamento', $departamentoId)->get();
            return response()->json($carreras); // Retorna las carreras en formato JSON
        }
        return response()->json([]); // Si no se proporciona un ID de departamento, retorna un array vacío en formato JSON
    }

    // Método AgregarCarrera
    public function AgregarCarrera(Request $request)
    {
        // Validar los datos recibidos del formulario
        $validatedData = $request->validate([
            'Nombre' => 'required|string|max:255', // Nombre de la carrera
            'ID_Departamento' => 'required|exists:departamento,ID_Departamento', // Verifica que el departamento exista
        ]);

        try {
            // Crear una nueva carrera utilizando los datos validados
            $carrera = new Carrera();
            $carrera->Nombre = $validatedData['Nombre'];
            $carrera->ID_Departamento = $validatedData['ID_Departamento']; // Relacionar con el departamento

            // Guardar la carrera en la base de datos
            $carrera->save();

            // Retornar una respuesta de éxito
            return redirect()->back()->with('success', 'Carrera agregada exitosamente.');
        } catch (\Exception $e) {
            // Si ocurre algún error, retornar con mensaje de error
            return redirect()->back()->with('error', 'Ocurrió un error al agregar la carrera: ' . $e->getMessage());
        }
    }

}

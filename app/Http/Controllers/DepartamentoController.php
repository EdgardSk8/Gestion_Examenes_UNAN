<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departamento;
use App\Models\AreaConocimiento;

class DepartamentoController extends Controller
{
    public function ObtenerDepartamentoPorArea(Request $request)
    {
        $areaId = $request->input('idArea'); // Obtiene el ID del Area 'Area_Conocimiento'

        if ($areaId) {
            // Obtiene los departamentos asociadas al area 
            $departamentos = Departamento::where('ID_Area', $areaId)->get();
            return response()->json($departamentos); // Retorna las carreras en formato JSON
        }
        return response()->json([]);  // Si no se proporciona un ID de area, retorna un array vacío en formato JSON
    }

    // Método AgregarDepartamento
    public function AgregarDepartamento(Request $request)
    {
        // Validar los datos recibidos del formulario
        $validatedData = $request->validate([
            'Nombre' => 'required|string|max:255',
            'ID_Area' => 'required|exists:area_conocimiento,ID_Area', // Aquí debe ser ID_Area, no ID_Area_Conocimiento
        ]);

        try {
            // Crear el nuevo departamento usando los datos validados
            $departamento = new Departamento();
            $departamento->Nombre = $validatedData['Nombre'];
            $departamento->ID_Area = $validatedData['ID_Area']; // Relación con el área de conocimiento

            // Guardar el departamento en la base de datos
            $departamento->save();

            // Retornar una respuesta de éxito
            return redirect()->back()->with('success', 'Departamento agregado exitosamente.');
        } catch (\Exception $e) {
            // Retornar una respuesta de error en caso de fallar la inserción
            return redirect()->back()->with('error', 'Ocurrió un error al agregar el departamento: ' . $e->getMessage());
        }
    }


    
}

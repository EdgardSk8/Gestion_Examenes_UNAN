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

    public function ObtenerTodosEstudiantesAJAX(Request $request)
    {
        try {
            // Obtener todos los estudiantes con sus relaciones
            $estudiantes = Estudiante::with([
                'localidad',
                'carrera.departamento.areaConocimiento', // Cargar departamento y su área de conocimiento a través de carrera
            ])->paginate(10); // Cambia el tamaño de paginación según tus necesidades
    
            return response()->json([
                'success' => true,
                'data' => $estudiantes,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los estudiantes: ' . $e->getMessage(),
            ], 500);
        }
    }
    


    public function AgregarEstudianteAjax(Request $request){

        // Validar la entrada del usuario
        $validated = $request->validate([
            'Nombre_Completo' => 'required|string|max:255',
            'Carnet' => 'required|string|max:20|unique:estudiantes,Carnet',
            'Genero' => 'required|string|in:Masculino,Femenino',
            'ID_Localidad' => 'required|integer|exists:localidades,ID_Localidad',
            'ID_Carrera' => 'required|integer|exists:carrera,ID_Carrera',
            'Correo_Institucional' => 'required|email|unique:estudiantes,Correo_Institucional',
        ]);

        try {
            // Crear un nuevo estudiante
            $estudiante = Estudiante::create([
                'Nombre_Completo' => $validated['Nombre_Completo'],
                'Carnet' => $validated['Carnet'],
                'Genero' => $validated['Genero'],
                'ID_Localidad' => $validated['ID_Localidad'],
                'ID_Carrera' => $validated['ID_Carrera'],
                'Correo_Institucional' => $validated['Correo_Institucional'],
            ]);
            
            // Retornar una respuesta JSON de éxito
            return response()->json([
                'success' => true,
                'message' => 'Estudiante agregado exitosamente.',
                'data' => $estudiante // Devolver el estudiante creado
            ]);
        } catch (\Exception $e) {
            // Retornar una respuesta JSON de error
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al agregar el estudiante: ' . $e->getMessage()
            ], 500); // 500 indica un error interno del servidor
        }

    }

    public function EliminarEstudianteAJAX($id)
    {
        // Buscar el estudiante por su ID
        $estudiante = Estudiante::find($id);

        if ($estudiante) {
            try {
                // Eliminar el estudiante
                $estudiante->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Estudiante eliminado exitosamente.',
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ocurrió un error al eliminar el estudiante: ' . $e->getMessage()
                ], 500);
            }
        }

        // Si el estudiante no existe, retornar un mensaje de error
        return response()->json([
            'success' => false,
            'message' => 'Estudiante no encontrado.'
        ], 404);
    }

    public function EditarEstudianteAJAX($id)
    {
        try {
            // Cargar el estudiante con su localidad, carrera y departamento asociados
            $estudiante = Estudiante::with('localidad', 'carrera.departamento.areaConocimiento')->findOrFail($id);
    
            // Verificar si la carrera tiene un departamento asociado
            $departamento = $estudiante->carrera && $estudiante->carrera->departamento
                ? $estudiante->carrera->departamento
                : null;
    
            // Verificar si el departamento tiene un área de conocimiento asociada
            $areaConocimiento = $departamento && $departamento->areaConocimiento
                ? $departamento->areaConocimiento
                : null;
    
            return response()->json([
                'success' => true,
                'data' => [
                    'ID_Estudiante' => $estudiante->ID_Estudiante,
                    'Nombre_Completo' => $estudiante->Nombre_Completo,
                    'Carnet' => $estudiante->Carnet,
                    'Genero' => $estudiante->Genero,
                    'ID_Localidad' => $estudiante->ID_Localidad,
                    'Localidades' => $estudiante->localidades,
                    'ID_Carrera' => $estudiante->ID_Carrera,
                    'Carrera' => $estudiante->carrera ? $estudiante->carrera->Nombre : null, // Nombre de la carrera
                    'ID_Departamento' => $departamento ? $departamento->ID_Departamento : null, // ID del departamento
                    'Departamento' => $departamento ? $departamento->Nombre : null, // Nombre del departamento
                    'ID_Area' => $areaConocimiento ? $areaConocimiento->ID_Area : null, // ID del área de conocimiento
                    'Area' => $areaConocimiento ? $areaConocimiento->Nombre : null, // Nombre del área de conocimiento
                    'Correo_Institucional' => $estudiante->Correo_Institucional,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el estudiante: ' . $e->getMessage()
            ], 500);
        }
    }
    

    public function ActualizarEstudianteAJAX(Request $request, $id)
    {
        $request->validate([
            'Nombre_Completo' => 'required|string|max:255',
            'Carnet' => 'required|string|max:20|unique:estudiantes,Carnet,' . $id . ',ID_Estudiante', // Ignorar el carnet del estudiante actual
            'Genero' => 'required|string|in:Masculino,Femenino',
            'ID_Localidad' => 'required|exists:localidades,ID_Localidad',
            'ID_Carrera' => 'required|exists:carrera,ID_Carrera',
            'Correo_Institucional' => 'required|email|max:255|unique:estudiantes,Correo_Institucional,' . $id . ',ID_Estudiante', // Ignorar el correo del estudiante actual
        ]);
    
        try {
            $estudiante = Estudiante::findOrFail($id);
            $estudiante->update($request->only([
                'Nombre_Completo',
                'Carnet',
                'Genero',
                'ID_Localidad',
                'ID_Carrera',
                'Correo_Institucional'
            ]));
    
            // Cargar la localidad, carrera, departamento y área de conocimiento después de la actualización
            $estudiante->load('localidad', 'carrera.departamento.areaConocimiento');
    
            // Verificar si la carrera tiene un departamento asociado
            $departamento = $estudiante->carrera && $estudiante->carrera->departamento
                ? $estudiante->carrera->departamento
                : null;
    
            // Verificar si el departamento tiene un área de conocimiento asociada
            $areaConocimiento = $departamento && $departamento->areaConocimiento
                ? $departamento->areaConocimiento
                : null;
    
            return response()->json([
                'success' => true,
                'message' => 'Estudiante actualizado exitosamente.',
                'data' => [
                    'ID_Estudiante' => $estudiante->ID_Estudiante,
                    'Nombre_Completo' => $estudiante->Nombre_Completo,
                    'Carnet' => $estudiante->Carnet,
                    'Genero' => $estudiante->Genero,
                    'ID_Localidad' => $estudiante->ID_Localidad,
                    'Localidad' => $estudiante->localidad,
                    'ID_Carrera' => $estudiante->ID_Carrera,
                    'Carrera' => $estudiante->carrera ? $estudiante->carrera->Nombre : null, // Nombre de la carrera
                    'ID_Departamento' => $departamento ? $departamento->ID_Departamento : null, // ID del departamento
                    'Departamento' => $departamento ? $departamento->Nombre : null, // Nombre del departamento
                    'ID_Area' => $areaConocimiento ? $areaConocimiento->ID_Area : null, // ID del área de conocimiento
                    'Area' => $areaConocimiento ? $areaConocimiento->Nombre : null, // Nombre del área de conocimiento
                    'Correo_Institucional' => $estudiante->Correo_Institucional,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el estudiante: ' . $e->getMessage()
            ], 500);
        }
    }
    
    
}

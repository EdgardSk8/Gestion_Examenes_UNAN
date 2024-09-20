<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipo extends Model
{
    use HasFactory;

    protected $table = 'equipos'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Equipo'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Titulo',
        'Integrante1',
        'Integrante2',
        'Integrante3',
        'Fecha_Asignada',
        'Fecha_Aprobada',
        'ID_Dia', //sin uso
        'Hora_Inicio',
        'Hora_Fin',
        'ID_Aula',
        'ID_Tipo_Examen',
        'Calificacion',
        'Tutor_ID',
        'Juez1_ID',
        'Juez2_ID',
        'Juez3_ID',
        'ID_Carrera'
    ];

    // Relación con los estudiantes (integrantes del equipo)
    public function integrante1()
    {
        return $this->belongsTo(Estudiante::class, 'Integrante1', 'ID_Estudiante');
    }

    public function integrante2()
    {
        return $this->belongsTo(Estudiante::class, 'Integrante2', 'ID_Estudiante');
    }

    public function integrante3()
    {
        return $this->belongsTo(Estudiante::class, 'Integrante3', 'ID_Estudiante');
    }

    // Relación con la tabla 'aulas'
    public function aula()
    {
        return $this->belongsTo(Aula::class, 'ID_Aula');
    }

    // Relación con la tabla 'tipo_examen'
    public function tipoExamen()
    {
        return $this->belongsTo(TipoExamen::class, 'ID_Tipo_Examen');
    }

    // Relación con la tabla 'profesores' para el tutor
    public function tutor()
    {
        return $this->belongsTo(Profesor::class, 'Tutor_ID');
    }

    // Relación con la tabla 'profesores' para el juez1
    public function juez1()
    {
        return $this->belongsTo(Profesor::class, 'Juez1_ID');
    }

    // Relación con la tabla 'profesores' para el juez2
    public function juez2()
    {
        return $this->belongsTo(Profesor::class, 'Juez2_ID');
    }

    // Relación con la tabla 'profesores' para el juez3
    public function juez3()
    {
        return $this->belongsTo(Profesor::class, 'Juez3_ID');
    }

     // Relación con la tabla 'carrera'
     public function carrera()
     {
         return $this->belongsTo(Carrera::class, 'ID_Carrera');
     }
}

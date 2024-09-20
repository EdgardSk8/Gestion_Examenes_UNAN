<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

    protected $table = 'estudiantes'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Estudiante'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Nombre_Completo',
        'Carnet',
        'Genero',
        'ID_Localidad',
        'ID_Carrera',
        'Correo_Institucional'
    ];

    // Relación con la tabla 'localidades' (un estudiante pertenece a una localidad)
    public function localidad()
    {
        return $this->belongsTo(Localidad::class, 'ID_Localidad');
    }

    // Relación con la tabla 'carrera' (un estudiante pertenece a una carrera)
    public function carrera()
    {
        return $this->belongsTo(Carrera::class, 'ID_Carrera');
    }

    // Relación con la tabla 'equipos' (un estudiante puede estar en muchos equipos)
    public function equipos()
    {
        return $this->belongsToMany(Equipo::class, 'equipos_roles', 'ID_Estudiante', 'ID_Equipo');
    }
}

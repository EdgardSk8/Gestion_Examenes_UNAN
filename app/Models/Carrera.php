<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrera extends Model
{
    use HasFactory;

    protected $table = 'carrera'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Carrera'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Nombre',
        'ID_Departamento'
    ];

    // Relación con la tabla 'departamento'
    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'ID_Departamento');
    }

    // Relación con la tabla 'equipos' (una carrera puede estar asociada a muchos equipos)
    public function equipos()
    {
        return $this->hasMany(Equipo::class, 'ID_Carrera');
    }

    // Relación con la tabla 'estudiantes' (una carrera puede estar asociada a muchos estudiantes)
    public function estudiantes()
    {
        return $this->hasMany(Estudiante::class, 'ID_Carrera');
    }
}

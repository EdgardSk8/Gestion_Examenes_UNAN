<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipoRol extends Model
{
    use HasFactory;

    protected $table = 'equipos_roles'; // Nombre de la tabla en la base de datos
    public $incrementing = false; // La clave primaria no es auto incrementable
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'ID_Equipo',
        'ID_Profesor',
        'ID_Rol'
    ];

    // Relación con el modelo 'Equipo' (un equipo tiene muchos roles)
    public function equipo()
    {
        return $this->belongsTo(Equipo::class, 'ID_Equipo');
    }

    // Relación con el modelo 'Profesor' (un rol puede ser asignado a muchos profesores)
    public function profesor()
    {
        return $this->belongsTo(Profesor::class, 'ID_Profesor');
    }

    // Relación con el modelo 'Rol' (un rol puede ser asignado a muchos equipos)
    public function rol()
    {
        return $this->belongsTo(Rol::class, 'ID_Rol');
    }
}

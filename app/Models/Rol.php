<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $table = 'rol'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Rol'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Nombre'
    ];

    // Relación con el modelo 'EquipoRol' (un rol puede estar asignado a muchos equipos)
    public function equipoRoles()
    {
        return $this->hasMany(EquipoRol::class, 'ID_Rol');
    }
}

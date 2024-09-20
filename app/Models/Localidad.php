<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Localidad extends Model
{
    use HasFactory;

    protected $table = 'localidades'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Localidad'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Nombre'
    ];

    // Relación con la tabla 'estudiantes' (una localidad puede tener muchos estudiantes)
    public function estudiantes()
    {
        return $this->hasMany(Estudiante::class, 'ID_Localidad');
    }
}

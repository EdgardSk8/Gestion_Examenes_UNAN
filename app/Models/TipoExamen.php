<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoExamen extends Model
{
    use HasFactory;

    protected $table = 'tipo_examen'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Tipo_Examen'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Nombre' // Nombre del tipo de examen
    ];

    // Relación con la tabla 'equipos' (un tipo de examen puede estar asociado a muchos equipos)
    public function equipos()
    {
        return $this->hasMany(Equipo::class, 'ID_Tipo_Examen');
    }
}

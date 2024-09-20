<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    use HasFactory;

    protected $table = 'departamento'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Departamento'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Nombre',
        'ID_Area'
    ];

    // Relación con la tabla 'area_conocimiento'
    public function areaConocimiento()
    {
        return $this->belongsTo(AreaConocimiento::class, 'ID_Area');
    }

    // Relación con la tabla 'carrera' (un departamento puede tener muchas carreras)
    public function carreras()
    {
        return $this->hasMany(Carrera::class, 'ID_Departamento');
    }

    // Relación con la tabla 'profesores' (un departamento puede tener muchos profesores)
    public function profesores()
    {
        return $this->hasMany(Profesor::class, 'ID_Departamento');
    }
}

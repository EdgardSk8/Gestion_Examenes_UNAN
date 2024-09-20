<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AreaConocimiento extends Model
{
    use HasFactory;

    protected $table = 'area_conocimiento'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Area'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Nombre'
    ];

    // Relación con la tabla 'departamento' (un área de conocimiento puede tener muchos departamentos)
    public function departamentos()
    {
        return $this->hasMany(Departamento::class, 'ID_Area');
    }

    // Relación con la tabla 'edificio' (un área de conocimiento puede tener muchos edificios)
    public function edificios()
    {
        return $this->hasMany(Edificio::class, 'ID_Area');
    }
}

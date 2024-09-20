<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Edificio extends Model
{
    use HasFactory;

    protected $table = 'edificio'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Edificio'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Nombre_Edificio',
        'ID_Area'
    ];

    // Relación con la tabla 'area_conocimiento' (un edificio pertenece a un área de conocimiento)
    public function areaConocimiento()
    {
        return $this->belongsTo(AreaConocimiento::class, 'ID_Area');
    }

    // Relación con la tabla 'aulas' (un edificio puede tener muchas aulas)
    public function aulas()
    {
        return $this->hasMany(Aula::class, 'ID_Edificio');
    }
}

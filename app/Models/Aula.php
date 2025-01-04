<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aula extends Model
{
    use HasFactory;

    protected $table = 'aulas'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Aula'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Nombre_Aula', // Nombre del aula
        'ID_Edificio' // ID del edificio asociado
    ];

    // Relación con la tabla 'edificio'
    public function edificio()
    {
        return $this->belongsTo(Edificio::class, 'ID_Edificio');
    }

    public function area_conocimiento()
    {
        return $this->hasOneThrough(
            AreaConocimiento::class, // Modelo final
            Edificio::class,         // Modelo intermediario
            'ID_Edificio',           // Clave foránea en `Edificio`
            'ID_Area',               // Clave foránea en `AreaConocimiento`
            'ID_Edificio',           // Clave local en `Aula`
            'ID_Area'                // Clave local en `Edificio`
        );
    }

    // Relación con la tabla 'equipos' (un aula puede tener muchos equipos asignados)
    public function equipos()
    {
        return $this->hasMany(Equipo::class, 'ID_Aula');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    use HasFactory;

    protected $table = 'perfil'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Perfil'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Nombre'
    ];

    // Relación con el modelo 'Profesor' (un perfil puede ser asignado a muchos profesores)
    public function profesores()
    {
        return $this->hasMany(Profesor::class, 'ID_Perfil');
    }
}

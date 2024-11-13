<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profesor extends Model
{
    use HasFactory;

    protected $table = 'profesores'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'ID_Profesor'; // Llave primaria
    public $timestamps = false; // Desactiva los timestamps si no los estás utilizando

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'Nombre_Completo_P',
        'Correo',
        'Contrasenia',
        'ID_Departamento',
        'ID_Perfil'
    ];

    // Relación con la tabla 'departamento'
    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'ID_Departamento');
    }

    // Relación con la tabla 'perfil'
    public function perfil()
    {
        return $this->belongsTo(Perfil::class, 'ID_Perfil');
    }

    // Relación con la tabla 'equipos' (un profesor puede ser tutor o juez en muchos equipos)
    public function equiposTutorados()
    {
        return $this->hasMany(Equipo::class, 'Tutor_ID');
    }

    public function equiposJuez1()
    {
        return $this->hasMany(Equipo::class, 'Juez1_ID');
    }

    public function equiposJuez2()
    {
        return $this->hasMany(Equipo::class, 'Juez2_ID');
    }

    public function equiposJuez3()
    {
        return $this->hasMany(Equipo::class, 'Juez3_ID');
    }

    // Relación con la tabla 'equipos_roles' (un profesor puede tener varios roles en diferentes equipos)
    public function equiposRoles()
    {
        return $this->hasMany(EquipoRol::class, 'ID_Profesor');
    }
}

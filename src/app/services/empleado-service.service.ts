import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {
listEmpleado:Empleado[]=[
  {nombreCompleto:'angel sant',
  telefono:45225,
  correo:'angelxd0714@gmail.com',
  fechaIngreso:new Date('2023-02-12'),
  estadoCivil:'pareja',
  sexo:'M'
  },
  {nombreCompleto:'sant',
  telefono:45225,
  correo:'angelxd0714@gmail.com',
  fechaIngreso:new Date('2023-02-12'),
  estadoCivil:'pareja',
  sexo:'M'
  }
]
  constructor() { }
  getEmpleados(){
  return  this.listEmpleado.slice()
  }
  eliminarEmpleado(index:number){
    this.listEmpleado.splice(index,1)
  }
  agregarEmpleado(empleado:Empleado){
    this.listEmpleado.unshift(empleado)
  }
  getEditarEmpleado(index:number){
    return this.listEmpleado[index]
  }
  editarEm(empleado:Empleado,idEmpleado:number){
    this.listEmpleado[idEmpleado].nombreCompleto=empleado.nombreCompleto
    this.listEmpleado[idEmpleado].correo=empleado.correo
    this.listEmpleado[idEmpleado].estadoCivil=empleado.estadoCivil
    this.listEmpleado[idEmpleado].telefono=empleado.telefono
    this.listEmpleado[idEmpleado].sexo=empleado.sexo
  }
}

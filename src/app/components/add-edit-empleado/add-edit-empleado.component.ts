import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoServiceService } from 'src/app/services/empleado-service.service';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css']
})
export class AddEditEmpleadoComponent {
  estadosCiviles: string[] = ['soltero', 'casado', 'divorciado', 'otro']
  myForm: FormGroup
  idEmpleado: any;
  accion = "Crear"
  constructor(private fb: FormBuilder, private empleadoService: EmpleadoServiceService, private router: Router, private snackbar: MatSnackBar, private aRoute: ActivatedRoute) {
    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      sexo: ['', [Validators.required]]
    })
    const idParams = "id"
    this.idEmpleado = this.aRoute.snapshot.params[idParams]
  }
  ngOnInit(): void {
    if (this.idEmpleado !== undefined) {
      this.accion = "Editar"
      this.editarEmpleado()
    }
  }
  guardarEmpleado() {
    const empleado: Empleado = {
      nombreCompleto: this.myForm.get('nombreCompleto')?.value,
      correo: this.myForm.get('correo')?.value,
      fechaIngreso: this.myForm.get('fechaIngreso')?.value,
      estadoCivil: this.myForm.get('estadoCivil')?.value,
      sexo: this.myForm.get('sexo')?.value,
      telefono: this.myForm.get('telefono')?.value

    }
    if (this.idEmpleado !== undefined) {
      this.editarEmpleados(empleado)
    } else {
      this.agregarEmpleados(empleado)
    }


  }
  editarEmpleados(empleado: Empleado) {
    this.empleadoService.editarEm(empleado, this.idEmpleado)
    this.snackbar.open('Se edito con exito!', '', {
      duration: 3000,


    })
    this.router.navigate(['/'])
  }
  agregarEmpleados(empleado: Empleado) {
    this.empleadoService.agregarEmpleado(empleado)
    this.snackbar.open('Se guardo con exito!', '', {
      duration: 3000,


    })
    this.router.navigate(['/'])
  }
  editarEmpleado() {
    const empleado: Empleado = this.empleadoService.getEditarEmpleado(this.idEmpleado)
    console.log(empleado)
    this.myForm.patchValue(
      {
        nombreCompleto: empleado.nombreCompleto,
        correo: empleado.correo,
        telefono: empleado.telefono,
        fechaIngreso: empleado.fechaIngreso,
        estadoCivil: empleado.estadoCivil,
        sexo: empleado.sexo
      }
    )
  }
}

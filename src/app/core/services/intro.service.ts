import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { driver } from "driver.js";
import { TaskStore } from "./task.service";
import { User } from "../../shared/types/task.type";
import { delay, of, take } from "rxjs";
import { Dialog } from "@angular/cdk/dialog";
import { TaskFormComponent } from "../../shared/components/task-form/task-form.component";


@Injectable({ providedIn: 'root' })
export class IntroService {
    constructor(private service: TaskStore, private dlg: Dialog) { }

    stepOne(userForm: FormGroup, submit: () => unknown) {
        const driverObj = driver({
            onHighlighted: () => {
                if (driverObj.getActiveIndex() === 4) {
                    userForm.patchValue({ email: this.createRandomEmail() })
                    if (userForm.valid) {
                        of(null).pipe(
                            delay(4000) // Retrasa la emisión 2 segundos (2000 ms)
                        )
                            .pipe(take(1))
                            .subscribe(() => {
                                this.service.getUser(userForm.value as User, true);
                                driverObj.destroy();
                            });
                    }
                }
            },
            showProgress: true,
            steps: [
                { element: `#login-page`, popover: { title: `Bienvenido/a`, description: `Hola, este será un pequeño recorrido para describir y resaltar los pasos del challenge` } },
                { element: `#login-form`, popover: { title: `Requerimiento 1.`, description: `La aplicación consta de 2 páginas... Esta es la página de inicio de sesión, la cual está protegida, y no se puede acceder a la página 2 ("/home") a menos que haya una sesión iniciada.` } },
                { element: `#login-email`, popover: { title: `Requerimiento 2`, description: `La página de inicio de sesión tiene un formulario donde solo se debepedir el correo.` } },
                {
                    element: `#login-email`, popover: { title: `Requerimiento 2`, description: `Si el usuario existe, navega a la página principal, encaso contrario se deberá presentar un diálogo que confirme la creación del usuario.` }
                },
                {
                    element: `#login-email`, popover: { title: `Requerimiento 2`, description: `Crearemos un correo electrónico aleatorio y, como no existe, se guardará utilizando el endpoint /users. Después de eso, aparecerá un mensaje emergente de confirmación (si todo sale bien) y seremos redirigidos a /home."` }
                }
            ]
        });
        driverObj.drive();
    }

    stepTwo() {
        let eLnewCard: Element;
        const driverObj = driver({
            onHighlighted: (el) => {
                if (driverObj.getActiveIndex() === 2) {
                    eLnewCard = el!;
                    (eLnewCard as HTMLElement).click();
                }
                if (driverObj.getActiveIndex() === 4) {
                    this.dlg.closeAll();
                }
                if (driverObj.getActiveIndex() === 12) {
                    const task = {
                        "id": "VEKYCHfhfZQJdVS08sOP",
                        "dateCreated": {
                            "_seconds": 1724271020,
                            "_nanoseconds": 671000000
                        },
                        "description": "NUEVO 10NUEVO 10NUEVO 10NUEVO 10",
                        "title": "NUEVO 10",
                        "user": "daasd@da.com",
                        "status": "todo"
                    }
                    this.dlg.open(TaskFormComponent, {
                        minWidth: '300px',
                        data: { isNewTask: false, task}
                      });
                }

            },
            showProgress: true,
            steps: [
                { element: `#home-btnNewTask`, popover: { title: `Requerimiento 3`, description: `Debe haber un formulario en la página principal que permite agregar nuevas tareas. ` } },
                { element: `#home-btnNewTask`, popover: { title: `Requerimiento 3`, description: `Para agregar una nueva tarea, podemos hacer clic aquí.` } },
                { element: `#home-cardNewTask`, popover: { title: `Requerimiento 3`, description: `O también aquí` } },
                { element: `#form-task`, popover: { title: `Requerimiento 3`, description: `Este es nuestro formulario para crear una tarea nueva.` } },
                { element: `#home-linkToHome`, popover: { title: `Requerimiento 3`, description: `Además de un botón que permite volver al inicio de sesión` } },
                { element: `#todo-1 > div`, popover: { title: `Requerimiento 4`, description: `Cada tarea debe mostrar su título, descripción, fecha de creación y estado de completado.` } },
                { element: `#todo-1 > div > #card-title`, popover: { title: `Requerimiento 4`, description: `Título` } },
                { element: `#todo-1 > div > #card-description`, popover: { title: `Requerimiento 4`, description: `Descripción` } },
                { element: `#todo-1 > div > #card-date`, popover: { title: `Requerimiento 4`, description: `Fecha de creación` } },
                { element: `#cardHeader-todo`, popover: { title: `Requerimiento 4`, description: `Estado de completado.` } },
                { element: `#cardHeader-inprogress`, popover: { title: `No requerimiento`, description: `Agregué estados adicionales, como  In progress` } },
                { element: `#cardHeader-inqa`, popover: { title: `No requerimiento`, description: `In QA` } },
                { element: `#cardHeader-done`, popover: { title: `No requerimiento`, description: `Y finalmente Done, todas las tareas puede pasar directamente a Done` } },
                { element: `#form-checkbox`, popover: { title: `Requerimiento 5`, description: `El usuario debe poder marcar una tarea como completada o pendiente mediante una casilla de verificación.` } },
                { element: `#form-edits`, popover: { title: `Requerimiento 6`, description: `Debe existir una opción para editar y eliminar una tarea` } }
            ]
        });
        driverObj.drive();
    }

    createRandomEmail(): string {
        const user = Date.parse(new Date().toString()) / 100;
        return `${user}@gmail.com`
    }
}



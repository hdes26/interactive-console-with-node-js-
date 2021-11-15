const colors = require('colors');
const { guardarDB, leerDb } = require('./helpers/guardarArchivo.js');
const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer.js');
const Tareas = require('./models/tareas.js');

const main = async () => {
    console.clear();
    
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDb();
    if (tareasDB) {//cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }



    do {
        

         opt = await inquirerMenu();
         switch (opt) {
             case '1':
                    const desc = await leerInput('Descripcion: ');
                    tareas.crearTarea(desc);
                 break;
             case '2':
                    tareas.listadoCompleto();
                 break;

             case '3'://Listar tareas completadas
                    tareas.listarPendientesCompleptadas(true);
                 break;

             case '4'://Listar tareas pendientes
                    tareas.listarPendientesCompleptadas(false);
                 break;
             case '5'://Completo / pendiente
                   const ids =  await mostrarListadoCheckList( tareas.listadoArr );
                   tareas.toggleCompletadas(ids);
                 break;

             case '6'://borrar
                    const id = await listadoTareasBorrar( tareas.listadoArr );
                    if (id!=='0') {
                        const ok = await confirmar( '¿Está seguro?' );
                        if ( ok ) {
                            tareas.borrarTarea( id );
                            console.log('Tarea borrada');
                        }
                    }
                 break;
         
             
         }

         guardarDB( tareas.listadoArr );
         
         await pausa();
         

    } while (opt !== '0');

    
    //pausa();
}
main()
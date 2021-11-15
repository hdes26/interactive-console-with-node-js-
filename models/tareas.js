const Tarea = require('./tarea');

/* 
    listado:
    {}
*/


class Tareas {

    listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this.listado).forEach( key=>{
            const tarea = this.listado[key]
            listado.push( tarea )
        } )
        return listado;
    }
    

    constructor(){
        this.listado = {};
    }
    
    borrarTarea(id){
        if (this.listado[id]) {
            delete this.listado[id];
        }
    }

    cargarTareasFromArray( tareas=[] ){
        tareas.forEach( tarea =>{
            
            this.listado[tarea.id] = tarea;
        } );
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this.listado[tarea.id] = tarea;
    }

    listadoCompleto(){

        console.log();

        this.listadoArr.forEach((tarea,i) =>{
            const idx =  `${i+1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                :' Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
        

    }

    listarPendientesCompleptadas(completadas = true){
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) =>{
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                :' Pendiente'.red;
            if (completadas) {
                if (completadoEn) {
                    
                    contador+=1;
                    console.log(`${contador.toString().green + '.'} ${desc} :: ${estado}`)
                }
                
            }else{
                if (!completadoEn) {
                    contador+=1;
                    console.log(`${contador.toString().green + '.'}. ${desc} :: ${estado}`)
                    
                }
            }
        });
    }

    toggleCompletadas(ids = []){

        ids.forEach(id =>{
            const tarea = this.listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea=>{
            if (!ids.includes(tarea.id)) {
                this.listado[tarea.id].completadoEn = null;
            }
        });


    }


}


module.exports = Tareas;
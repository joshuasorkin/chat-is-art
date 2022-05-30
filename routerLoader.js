const fs=require('fs');

class RouterLoader{

    constructor(app){
        this.app=app;
    }

    loadRoutes(){

        //begin loadRoutes() for REST API
        var route_directory = "routes";
        //get list of filenames in /routes
        var filenames = fs.readdirSync(route_directory);
        var router;
        //iterate through filenames
        filenames.forEach(filename=>{
            //routername is filename without .js extension
            router=filename.substring(0,filename.length-3);
            //require and use the routername
            if(router==='index'){
                this.app.use('/',require(`./routes/${router}`));
            }
            else{
                this.app.use(`/${router}`,require(`./routes/${router}`));
            }           
            
        })
        //end loadRoutes()
    }

}

module.exports = RouterLoader;
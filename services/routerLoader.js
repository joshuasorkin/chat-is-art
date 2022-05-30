const fs = require('fs');
const indexRouter = require('../routes/index');

class RouterLoader {
    constructor(app){
        this.app = app;
    }

    loadRoutes(){
        var route_directory = "routes";
        var filenames = fs.readdirSync(route_directory);
        var router;
        filenames.forEach(filename=>{
            //routername is filename without .js extension
            var router=filename.substring(0,filename.length-3);
            var routerConst="var "+router+"Router = require('./routes/"+router+"');"
            console.log(routerConst);
            eval(routerConst);
            if(router!=='index'){
                eval("this.app.use('/"+router+"',"+router+"Router);");
            }
            else{
                console.log("adding default route");
                eval("this.app.use('/',"+router+"Router);");
            }
        })
    }

}


module.exports = RouterLoader;
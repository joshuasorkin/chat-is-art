//this class is for checking whether a proposed new username is already held by another user
//moving to a database approach for data storage will make it unnecessary, or at least
//it can be converted to a wrapper class for the database calls

class NameChecker{
    constructor(){
        this.IDToNameMap=new Map();
        this.NameToIDMap=new Map();
    }

    getIDFromName(username){
        var ID=this.NameToIDMap.get(username);
        if(ID===undefined){
            return null;
        }
    }
    getNameFromID(ID){
        var username=this.IDToNameMap.get(ID);
        if(username===undefined){
            return null;
        }
    }

    addIDAndName(ID,username){
        this.IDToNameMap.set(ID,username);
        this.NameToIDMap.set(username,ID);
    }

    removeID(ID){
        var username=this.IDToNameMap.get(ID);
        this.IDToNameMap.delete(ID);
        this.NameToIDMap.delete(username);
    }

}

module.exports = NameChecker;
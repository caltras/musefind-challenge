var _=require("lodash");
var fs = require("fs");
module.exports = function(){
    var self=this;
    self.data = {};
    self.createSequence = function(obj){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };
    self.save = function(domain,obj,options){
        return new Promise(function(resolve,reject){
            try{
                self.data = self.data || {};
                options = options || {};
                var key = obj.id;
                if(!key){
                    key = self.createSequence(obj);
                    obj.id = key;
                }
                if(!self.data[domain]){
                    self.data[domain] = {};
                }
                self.data[domain][key] = obj;
                if(options.flush){
                    self.flush();
                }
                resolve(obj);
            }catch(e){
                reject(e);
            }
        });
    };
    self.delete = function(domain,id,options){
        return new Promise(function(resolve,reject){
            
        });
    };
    self.find = function(domain, criterias){
        return new Promise(function(resolve,reject){
            
        });
    };
    
    self.flush = function(){
        fs.writeFile("./server/db/db.json",JSON.stringify(self.data),function(error){
            if(error){
                console.log(error);
                return;
            }
            console.log("File saved");
        });
    };
    self.loadData = function(){
        if (fs.existsSync("./server/db/db.json")) {
            self.data = JSON.parse(fs.readFileSync("./server/db/db.json", 'utf8'));
            // fs.readFile("./server/db/db.json",function(error,file){
            //     if(error){
            //         console.log(error);
            //         return;
            //     }
            //     self.data = JSON.parse(file);
            // });
        }
    };
    self.loadData();
    
};

var express = require('express');
var config = require("./config");
var passport = require("passport");
var Strategy = require('passport-local').Strategy;
var fs = require("fs");
var _ = require("lodash");

function Server() {
    var self = this;
    self.server = null;
    self.router = null;
    self.dataSource = null;

    self.configure = function() {
        passport.use(new Strategy({
            passReqToCallback: true
        },
        function(req, username, password, cb) {
            if(self.dataSource && self.dataSource.data && self.dataSource.data.accounts){
                var user = _.find(self.dataSource.data.accounts,function(a){
                    return a.email === username && a.password === password;
                });
                cb(null, user);
            }else{
                cb(null,false);
            }
        }));
        passport.serializeUser(function(user, cb) {
            cb(null, user.id);
        });

        passport.deserializeUser(function(id, cb) {
            if(self.dataSource && self.dataSource.data && self.dataSource.data.accounts){
                var user = self.dataSource.data.accounts[id];
                cb(null, user);
            }else{
                cb(null,false);
            }
        });
        self.router.configure(function() {
            self.router.set('views', config.express.views);
            self.router.engine('html', require('ejs').renderFile);

            self.router.use(express.logger('dev'));
            self.router.use(express.cookieParser());
            self.router.use(express.bodyParser());
            self.router.use(express.session({
                secret: config.express.expressSession
            }));

            self.router.use(express.urlencoded());
            self.router.use(express.json());
            self.router.use(express.static(config.express.statics));
            self.router.use('/scripts', express.static('./node_modules/'));

            if (config.hasAuthentication) {
                self.router.use(passport.initialize());
                self.router.use(passport.session());
            }
        });
        
    };
    self.routes = function() {
        self.controllers();
    };
    self.controllers = function() {
        var pathController = "./server/controller";
        var dirs = fs.readdirSync(pathController);
        _.each(dirs, function(file) {
            var controller = require("./controller/" + file);
            var keys = _.keys(controller);

            _.each(keys, function(v, k) {
                var actions = _.keys(controller[v]);
                _.each(actions, function(a, j) {
                    var path = "/"+file.toLowerCase().replace(".js", "") + "/" + a;
                    path = path.replace("//","/");
                    self.router[v](path, controller[v][a]);
                });
            });
            controller.dataSource = self.dataSource;

        });
    };
    self.initBase = function(){
        var p = require("./providers/"+config.dataBaseProvider);
        self.dataSource = new p();
    };
    self.init = function() {
        var loginSucess = function(req, res) {
            res.redirect(config.login.successRedirect);
        };
        self.router = express();
        
        self.initBase();
        
        self.configure();
        self.routes();
        
        self.router.post(config.login.action, passport.authenticate('local', {
                failureRedirect: config.login.failureRedirect
        }), loginSucess);

        self.router.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
            console.log("Running Musefind challenge");
        });
    };
}
module.exports = new Server();
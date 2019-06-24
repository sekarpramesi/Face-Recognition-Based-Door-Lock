'use strict';

var response = require('./res');
var connection = require('./conn');
var count = 0;
function setCount(val){
    count = val;
}


exports.users = function(req, res) {
    connection.query('SELECT * FROM user', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

function toggle(id_door,id_user,status,door_status,res){
    connection.query('UPDATE door SET STATUS_DOOR=? WHERE ID_DOOR=?',
    [ door_status,id_door ], 
    function (error, rows, fields){
        if(error){
            console.log(error);
        } else{
            connection.query('INSERT INTO event_log (id_door,id_user,status_event_log) values (?,?,?)',
            [ id_door,id_user,status ], 
            function (error, rows, fields){
                if(error){
                    console.log(error);
                } else{
                    var msg = '';
                    if(status == 1){
                        msg = "Door opened and added to log!"
                    }else{
                        msg = "Door closed and added to log!"
                    }
                    response.ok(msg, res);
                }
            });
        }
    });
}
exports.createUser=function(req,res){
    connection.query('SELECT COUNT(*) as jml from user',
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            var id_user='';
            setCount(rows[0].jml)
            console.log(count);
            if(count>=10){
                id_user='U0'+count;
            }else{
                id_user='U00'+count;
            }
            console.log(id_user);
            var name_user = req.params.name_user;
            var pass_user = req.params.name_user;
            connection.query('INSERT INTO user (id_user,name_user,pass_user,access_type) values (?,?,?,0)',
            [id_user,name_user,pass_user], 
            function (error, rows, fields){
                if(error){
                    console.log(error)
                } else{
                    response.ok("Berhasil menambahkan user!", res)
                }
            });
        }
    });
}

exports.toggleDoor = function(req, res) {
    var name_user=req.params.name_user;
    var pass_user=req.params.pass_user;
    var id_door=req.params.id_door;
    var id_user = '';
    connection.query('SELECT id_user,count(*) as jml FROM `user` where name_user=? and pass_user=?',
        [name_user,pass_user], function (error, rows, fields){
            if(error){
                console.log(error)
            }else{
                if(rows[0].jml>0){
                    id_user = rows[0].id_user;
                    connection.query('SELECT STATUS_DOOR FROM door where ID_DOOR =?',
                    [id_door], function (err, r, fields){
                        if(error){
                            console.log(err);
                        }else{
                            if(r[0].STATUS_DOOR == 0){
                                toggle(id_door,id_user,1,1,res);
                            }else{
                                toggle(id_door,id_user,0,2,res);
                            }
                        }
                    });
                }else{
                    response.ok("No Users Found",res);//no users found
                }
            }
        });
};

exports.doors = function(req, res) {
    connection.query('SELECT * FROM door', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.allLog = function(req, res) {
    connection.query('SELECT * FROM event_log', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.openLog = function(req,res){
    connection.query('SELECT * FROM event_log where STATUS_EVENT_LOG =0', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

exports.thiefLog = function(req,res){
    connection.query('SELECT * FROM event_log where STATUS_EVENT_LOG =1', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

exports.resetLog = function(req,res){
    connection.query('SELECT * FROM event_log where STATUS_EVENT_LOG =2', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

exports.createLog=function(req,res){
    var status_event_log = req.params.status_event;
    var id_door = req.params.id_door;
    var id_user = req.params.id_user;
    connection.query('INSERT INTO event_log (id_door,id_user,status_event_log) values (?,?,?)',
    [ id_door,id_user,status_event_log ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Sucessfully added Log!", res)
        }
    });
}

exports.getDoorState=function(req,res){
    var id_door = req.params.id_door;
    connection.query('SELECT STATUS_DOOR FROM door where ID_DOOR =?',
    [id_door],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
}

exports.setDoorState=function(req,res){
    var state_door = req.params.door_state;
    var id_door = req.params.id_door;
    connection.query('UPDATE door SET STATUS_DOOR=? WHERE ID_DOOR=?',
    [ state_door,id_door ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Door state changed : "+state_door, res)
        }
    });
}


exports.index = function(req, res) {
    response.ok("Hello this is the API for the IoT Project!", res)
};
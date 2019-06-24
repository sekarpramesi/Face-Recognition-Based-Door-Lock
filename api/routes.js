'use strict';

module.exports = function(app) {
    var api= require('./controller');

    app.route('/')
        .get(api.index);

    app.route('/users')
        .get(api.users);

    app.route('/users/insert/:name_user/:pass_user')
        .get(api.createUser);
    
    app.route('/toggleDoor/:id_door/:name_user/:pass_user')
        .get(api.toggleDoor);
    
    app.route('/doors')
        .get(api.doors);
    
    app.route('/doors/state/:id_door')
        .get(api.getDoorState);
    
    app.route('/doors/:id_door/:door_state')
        .get(api.setDoorState);

    app.route('/log')
        .get(api.allLog);
        
    app.route('/log/open')
        .get(api.openLog);
        
    app.route('/log/thief')
        .get(api.thiefLog);
    
    app.route('/log/reset')
        .get(api.resetLog);
        
    app.route('/log/create/:id_door/:id_user/:status_event')
        .get(api.createLog);
    
};
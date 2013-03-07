/**
 * DEVELOPED BY
 * GIL LOPES BUENO
 * gilbueno.mail@gmail.com
 *
 * WORKS WITH:
 * IE 9+, FF 4+, SF 5+, WebKit, CH 7+, OP 12+, BESEN, Rhino 1.7+
 *
 * FORK:
 * https://github.com/melanke/Watch.JS
 *
 * Modifications by SR Feb 2013:
 * load in AMD only for simplicity
 *
 * SRR.changes:
 * Call back listeners immediately to synchronize views.
 * Provide changed value as 1st arg.
 */

define( function() {
  //"use strict";
  var WatchJS = {
        noMore: false
      },
      defineWatcher,
      unwatchOne,
      callWatchers;

  var isFunction = function( functionToCheck ) {
    var getType = {};
    return functionToCheck && getType.toString.call( functionToCheck ) == '[object Function]';
  };

  var isInt = function( x ) {
    return x % 1 === 0;
  };

  var isArray = function( obj ) {
    return Object.prototype.toString.call( obj ) === '[object Array]';
  };

  var isModernBrowser = function() {
    return Object.defineProperty || Object.prototype.__defineGetter__;
  };

  var defineGetAndSet = function( obj, propName, getter, setter ) {
    try {
      Object.defineProperty( obj, propName, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      } );
    }
    catch( error ) {
      try {
        Object.prototype.__defineGetter__.call( obj, propName, getter );
        Object.prototype.__defineSetter__.call( obj, propName, setter );
      }
      catch( error2 ) {
        throw "watchJS error: browser not supported :/"
      }
    }
  };

  var defineProp = function( obj, propName, value ) {
    try {
      Object.defineProperty( obj, propName, {
        enumerable: false,
        configurable: true,
        writable: false,
        value: value
      } );
    }
    catch( error ) {
      obj[propName] = value;
    }
  };

  var watch = function() {

    //TODO: Add init callback for other watch types
    if ( isFunction( arguments[1] ) ) {
      watchAll.apply( this, arguments );
    }
    else if ( isArray( arguments[1] ) ) {
      watchMany.apply( this, arguments );
    }
    else {
      //arguments: obj, prop, watcher, level
      watchOne.apply( this, arguments );

      //SRR: Send initial value with init action
      var model = arguments[0];
      var property = arguments[1];
      var value = model[property];
      var watcher = arguments[2];
      watcher( value, model, property, 'init', value, value );
    }

  };


  var watchAll = function( obj, watcher, level ) {

    if ( obj instanceof String || (!(obj instanceof Object) && !isArray( obj )) ) { //accepts only objects and array (not string)
      return;
    }

    var props = [];


    if ( isArray( obj ) ) {
      for ( var prop = 0; prop < obj.length; prop++ ) { //for each item if obj is an array
        props.push( prop ); //put in the props
      }
    }
    else {
      for ( var prop2 in obj ) { //for each attribute if obj is an object
        props.push( prop2 ); //put in the props
      }
    }

    watchMany( obj, props, watcher, level ); //watch all itens of the props
  };


  var watchMany = function( obj, props, watcher, level ) {

    for ( var prop in props ) { //watch each attribute of "props" if is an object
      watchOne( obj, props[prop], watcher, level );
    }

  };

  var watchOne = function( obj, prop, watcher, level ) {

    if ( isFunction( obj[prop] ) ) { //dont watch if it is a function
      return;
    }

    if ( obj[prop] != null && (level === undefined || level > 0) ) {
      if ( level !== undefined ) {
        level--;
      }
      watchAll( obj[prop], watcher, level ); //recursively watch all attributes of this
    }

    defineWatcher( obj, prop, watcher );

  };

  var unwatch = function() {

    if ( isFunction( arguments[1] ) ) {
      unwatchAll.apply( this, arguments );
    }
    else if ( isArray( arguments[1] ) ) {
      unwatchMany.apply( this, arguments );
    }
    else {
      unwatchOne.apply( this, arguments );
    }

  };

  var unwatchAll = function( obj, watcher ) {

    if ( obj instanceof String || (!(obj instanceof Object) && !isArray( obj )) ) { //accepts only objects and array (not string)
      return;
    }

    var props = [];


    if ( isArray( obj ) ) {
      for ( var prop = 0; prop < obj.length; prop++ ) { //for each item if obj is an array
        props.push( prop ); //put in the props
      }
    }
    else {
      for ( var prop2 in obj ) { //for each attribute if obj is an object
        props.push( prop2 ); //put in the props
      }
    }

    unwatchMany( obj, props, watcher ); //watch all itens of the props
  };


  var unwatchMany = function( obj, props, watcher ) {

    for ( var prop2 in props ) { //watch each attribute of "props" if is an object
      unwatchOne( obj, props[prop2], watcher );
    }
  };

  if ( isModernBrowser() ) {

    defineWatcher = function( obj, prop, watcher ) {

      var val = obj[prop];

      watchFunctions( obj, prop );

      if ( !obj.watchers ) {
        defineProp( obj, "watchers", {} );
      }

      if ( !obj.watchers[prop] ) {
        obj.watchers[prop] = [];
      }


      obj.watchers[prop].push( watcher ); //add the new watcher in the watchers array


      var getter = function() {
        return val;
      };


      var setter = function( newval ) {
        var oldval = val;
        val = newval;

        if ( obj[prop] ) {
          watchAll( obj[prop], watcher );
        }

        watchFunctions( obj, prop );

        if ( !WatchJS.noMore ) {
          if ( JSON.stringify( oldval ) !== JSON.stringify( newval ) ) {
            callWatchers( obj, prop, "set", newval, oldval );
            WatchJS.noMore = false;
          }
        }
      };

      defineGetAndSet( obj, prop, getter, setter );

    };

    callWatchers = function( obj, prop, action, newval, oldval ) {

      for ( var wr in obj.watchers[prop] ) {
        if ( isInt( wr ) ) {
          obj.watchers[prop][wr].call( obj, newval, prop, action, newval, oldval );
        }
      }
    };

    // @todo code related to "watchFunctions" is certainly buggy
    var methodNames = ['pop', 'push', 'reverse', 'shift', 'sort', 'slice', 'unshift'];
    var defineArrayMethodWatcher = function( obj, prop, original, methodName ) {
      defineProp( obj[prop], methodName, function() {
        var response = original.apply( obj[prop], arguments );
        watchOne( obj, obj[prop] );
        if ( methodName !== 'slice' ) {
          callWatchers( obj, prop, methodName, arguments );
        }
        return response;
      } );
    };

    var watchFunctions = function( obj, prop ) {

      if ( (!obj[prop]) || (obj[prop] instanceof String) || (!isArray( obj[prop] )) ) {
        return;
      }

      for ( var i = methodNames.length, methodName; i--; ) {
        methodName = methodNames[i];
        defineArrayMethodWatcher( obj, prop, obj[prop][methodName], methodName );
      }

    };

    unwatchOne = function( obj, prop, watcher ) {
      for ( var i in obj.watchers[prop] ) {
        var w = obj.watchers[prop][i];

        if ( w == watcher ) {
          obj.watchers[prop].splice( i, 1 );
        }
      }
    };

  }
  else {
    //this implementation dont work because it cant handle the gap between "settings".
    //I mean, if you use a setter for an attribute after another setter of the same attribute it will only fire the second
    //but I think we could think something to fix it

    var subjects = [];

    defineWatcher = function( obj, prop, watcher ) {

      subjects.push( {
                       obj: obj,
                       prop: prop,
                       serialized: JSON.stringify( obj[prop] ),
                       watcher: watcher
                     } );

    };

    unwatchOne = function( obj, prop, watcher ) {

      for ( var i in subjects ) {
        var subj = subjects[i];

        if ( subj.obj == obj && subj.prop == prop && subj.watcher == watcher ) {
          subjects.splice( i, 1 );
        }

      }

    };

    callWatchers = function( obj, prop, action, value ) {

      for ( var i in subjects ) {
        var subj = subjects[i];

        if ( subj.obj == obj && subj.prop == prop ) {
          subj.watcher.call( obj, value, prop, action, value );
        }

      }

    };

    var loop = function() {

      for ( var i in subjects ) {

        var subj = subjects[i];
        var newSer = JSON.stringify( subj.obj[subj.prop] );
        if ( newSer != subj.serialized ) {
          var newVal = subj.obj[subj.prop];
          subj.watcher.call( subj.obj, newVal, subj.prop, newVal, JSON.parse( subj.serialized ) );
          subj.serialized = newSer;
        }

      }

    };

    setInterval( loop, 50 );

  }

  WatchJS.watch = watch;
  WatchJS.unwatch = unwatch;
  WatchJS.callWatchers = callWatchers;

  //Return the function which will almost always be used, but wire up the entire object in case other methods needed
  WatchJS.watch.WatchJS = WatchJS;
  return WatchJS.watch;
} );

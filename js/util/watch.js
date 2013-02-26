define( function () {

  //Get notified whenever an attribute changes
  return function ( model, attribute, callback ) {
    model.watch( attribute, function ( id, oldval, newval ) {
      callback( newval, oldval, id );//last params optional
      return newval;
    } );

    //Sync up initially
    callback( model[attribute], model[attribute], attribute );
  }
} );
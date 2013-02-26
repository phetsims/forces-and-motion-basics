define( function () {
  //Convenience adapter function for use with object.watch which just calls back with the new value.
  return  function ( callback ) {
    return function ( id, oldval, newval ) {
      callback( newval );
      return newval;
    };
  }
} );
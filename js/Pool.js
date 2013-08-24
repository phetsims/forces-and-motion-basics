///**
// * Object pool for recycling unused objects, to prevent new allocations and hence (hopefully) garbage collection.
// * @author Sam Reid
// *
// * TODO: Add requirejs and make it work for different object types.
// * @constructor
// */
//
//function Pool() {
//  this.alive = [];
//  this.dead = [];
//}
//
//Pool.prototype = {
//  create: function( minX, minY, maxX, maxY ) {
//    if ( this.dead.length ) {
//      var element = this.dead.pop();
//      element.set( minX, minY, maxX, maxY );
//      this.alive.push( element );
//      console.log( 'resurrected' );
//      return element;
//    }
//    else {
//      var bounds2 = new Bounds2( minX, minY, maxX, maxY );
//      this.alive.push( bounds2 );
//      return  bounds2;
//    }
//  },
//  destroy: function( bounds ) {
//    var index = this.alive.indexOf( bounds );
////      console.log( index );
//    if ( index >= 0 ) {
////        console.log( 'destroyed' );
//      this.alive.splice( index );
//      this.dead.push( bounds );
//    }
//  }
//};
//
//Bounds2.Pool = new Pool();
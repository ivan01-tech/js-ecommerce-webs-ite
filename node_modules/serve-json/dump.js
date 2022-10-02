if ( process.argv.length != 3 ) throw 'USAGE: node ' + process.argv[ 1 ] + ' data.json'

let	data = JSON.parse( require( 'fs' ).readFileSync( process.argv[ 2 ] ) )

const Defined		= p => typeof p != 'undefined'

const IsObject		= p => typeof p == 'object'

const IsArray		= p => Array.isAray( p )

function
PrintGetPath( p, path ) {
	console.log( path )
	if ( typeof( p ) == 'object' ) {
		for ( const k in p ) PrintGetPath( p[ k ], path + '/' + k )
	}
}
PrintGetPath( data, '' )

console.log( '----------------------' )

function
PrintPostPath( p, path ) {
	if ( Array.isArray( p ) ) console.log( path )
	if ( typeof( p ) == 'object' ) {
		for ( const k in p ) PrintPostPath( p[ k ], path + '/' + k )
	}
}
PrintPostPath( data, '' )

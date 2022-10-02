#!/usr/bin/env node

const	Defined			= p => typeof p != 'undefined'

const	IsObject		= p => typeof p == 'object'

const	IsArray			= p => Array.isArray( p )

const	PathElements	= req => req.path.split( '/' ).filter( p => p != '' )

const	Filter			= ( p, f ) => {
	if ( Array.isArray( p ) ) return p.filter( f )
	v = {}
	for ( const k in p ) if ( f( p[ k ] ) ) v[ k ] = p[ k ]
	return v
}

if ( process.argv.length < 3 ) throw 'USAGE: node ' + process.argv[ 1 ] + ' data.json [ port ]'

let		data			= JSON.parse( require( 'fs' ).readFileSync( process.argv[ 2 ] ) )

const	Get				= req => {
	let	v = data
	for ( const k of PathElements( req ) ) {
		if ( ! Defined( v ) ) break;
		v = v[ k ]
	}
	return v
}

const	CS				= pes => {
	let	wC = data
	let wS = pes[ 0 ]
	pes.shift()
	for ( const w of pes ) {
		if ( !Defined( wC ) ) break;
		wC = wC[ wS ]
		wS = w
	}
	return [ wC, wS ]
}

const express = require( 'express' )
const app = express()
app.use( express.json( { strict:false } ) )

app.get(
	'/*'
,	( req, res ) => {
		let	v = Get( req )
		if ( ! Defined( v ) )							{ res.status( 404 ).end();	return }
		if ( Object.entries( req.query ).length == 0 )	{ res.json( v );			return }
		if ( ! IsObject( v ) )							{ res.status( 400 ).end();	return }
		for ( const k in req.query ) v = Filter( v, p => p[ k ] == req.query[ k ] )
		res.json( v )
	}
)

app.post(
	'/*'
,	( req, res ) => {
		let	w = Get( req )
		if ( !IsArray( w ) )							{ res.status( 400 ).end();	return }
		v = w.length
		w.push( req.body )
		res.json( v )
	}
)

app.put(
	'/*'
,	( req, res ) => {
		const wPEs = PathElements( req )
		if ( wPEs.length == 0 ) {
			const v = data
			data = req.body
			res.json( v )
		} else {
			let [ wC, wS ] = CS( wPEs )
			if ( !IsObject( wC ) )						{ res.status( 400 ).end();	return }
			const v = wC[ wS ]
			wC[ wS ] = req.body
			res.json( Defined( v ) ? v : null )
		}
	}
)

app.delete(
	'/*'
,	( req, res ) => {
		const wPEs = PathElements( req )
		if ( wPEs.length == 0 ) {
			const v = data
			data = null
			res.json( v )
		} else {
			let [ wC, wS ] = CS( wPEs )
			if ( !IsObject( wC ) )						{ res.status( 400 ).end();	return }
			const v = wC[ wS ]
			if ( !Defined( v ) )						{ res.status( 404 ).end();	return }
			if ( Array.isArray( wC ) )	wC.splice( wS, 1 )
			else						delete wC[ wS ]
			res.json( v )
		}
	}
)

const	wPort = process.argv[ 3 ] || 3000
console.log( 'serve-json started listening port: ' + wPort )
app.listen( wPort )


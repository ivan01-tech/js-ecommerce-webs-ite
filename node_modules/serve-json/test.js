console.log( 'TEST START' )

const	Filter	= ( p, f ) => {
	return Object.keys( p ).filter(
		k => f( p[ k ] )
	).reduce(
		( v, k ) => ( v[ k ] = p[ k ], v )
	,	{}
	)
}

const	fetch	= require( 'node-fetch' )
const	assert	= require( 'assert' )

const	h		= 'http://localhost:3000/'

const	GetJ	= async ( path, d ) => assert.deepEqual( d, await ( await fetch( h + path ) ).json() )
const	DelJ	= async ( path, d ) => assert.deepEqual( d, await ( await fetch( h + path, { method: 'DELETE' } ) ).json() )
const	PutJ	= async ( path, d, body ) => {
	const wOpt = { method: 'PUT', body: JSON.stringify( body ), headers: { 'Content-Type': 'application/json' } }
	assert.deepEqual( d, await ( await fetch( h + path, wOpt ) ).json() )
}
const	PosJ	= async ( path, d, body ) => {
	const wOpt = { method: 'POST', body: JSON.stringify( body ), headers: { 'Content-Type': 'application/json' } }
	assert.deepEqual( d, await ( await fetch( h + path, wOpt ) ).json() )
}

const	GetX	= ( path, e ) => new Promise(
	( res, rej ) => {
		fetch( h + path ).then(
			p => ( p.status == e ? res : rej )( p )
		).catch (
			e => rej( e )
		)
	}
)

const	P		= ( path, e, method ) => new Promise(
	( res, rej ) => {
		fetch( h + path, { method: method, body: '{}' } ).then(
			p => ( p.status == e ? res : rej )( p )
		).catch (
			e => rej( e )
		)
	}
)
const	PosX	= ( path, e ) => P( path, e, 'POST' )
const	PutX	= ( path, e ) => P( path, e, 'PUT' )
const	DelX	= ( path, e ) => P( path, e, 'DELETE' )

;	//	<= このコロンがないと下のが引数に見えてしまう。

(	async() => {
		try {
			let	data = await ( await fetch( h ) ).json()

			await GetX( 'abc'							, 404 )
			await GetX( 'races/0/grade?birthday=0'		, 400 )
			await PosX( 'races/0/grade'					, 400 )
			await PosX( 'jockeys'						, 400 )
			await PutX( 'abc/def'						, 400 )
			await DelX( 'abc/def'						, 400 )
			await DelX( 'jockeys/05339/abc'				, 404 )

			await GetJ( ''								, data )
			await GetJ( 'jockeys'						, data.jockeys )
			await GetJ( 'jockeys/05339'					, data.jockeys[ "05339" ] )
			await GetJ( 'jockeys/05339/name'			, data.jockeys[ "05339" ].name )
			await GetJ( 'jockeys/05339/birthday'		, data.jockeys[ "05339" ].birthday )
			await GetJ( 'jockeys/05212'					, data.jockeys[ "05212" ] )
			await GetJ( 'jockeys/05212/name'			, data.jockeys[ "05212" ].name )
			await GetJ( 'jockeys/05212/birthday'		, data.jockeys[ "05212" ].birthday )
			await GetJ( 'races'							, data.races )
			await GetJ( 'jockeys?name=Mirco+Demuro'		, Filter( data.jockeys, p => p.name == 'Mirco Demuro' ) )
			await GetJ( 'races?date=20181125&grade=G3'	, data.races.filter( p => p.date == 20181125 ).filter( p => p.grade == 'G3' ) )
			
			let w = { date: 20181228, name: 'Hopeful S.', grade: 'G1', horses: [ 'Saturnalia', 'Admire Justa' ] }
			await PosJ( 'races'							, 4, w )
			data.races.push( w )
			await GetJ( 'races?grade=G1'				, data.races.filter( p => p.grade == 'G1' ) )

			w = "Vin de Garde"
			await PosJ( 'races/4/horses'				, 2, w )
			data.races[ 4 ].horses.push( w )
			await GetJ( 'races/4/horses'				, data.races[ 4 ].horses )

			await PutJ( 'jockeys/05339/birthday'		, 19790520, 0 )
			data.jockeys[ '05339' ].birthday = 0
			await PutJ( 'jockeys/05339/sex'				, null, 1 )
			data.jockeys[ '05339' ].sex = 1

			await DelJ( 'jockeys/05339/birthday'		, 0 )
			delete data.jockeys[ '05339' ].birthday

			await DelJ( 'races/1'						, data.races[ 1 ] )
			delete data.races.splice( 1, 1 )

			await PutJ( ''								, data, null )
			await PutJ( ''								, null, data )

			await DelJ( ''								, data )
			await PutJ( ''								, null, data )

			await GetJ( ''								, data )

			console.log( 'TEST END' )
		} catch ( e ) {
			console.log( 'ERROR', e )
		}
	}
)()


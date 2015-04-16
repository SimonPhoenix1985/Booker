function checkInputs( url )
{
    $.ajax( {
        url   : url,
        method: 'POST',
        data  : $( ".authForm" ).serialize()
    } ).then( function ( data )
    {console.log(data);
        var objJSON = JSON.parse( data );
        if ( Object.keys( objJSON ).length == 0 )
        {
            window.location.href = "/index.php";
        } else
        {
            $.each( objJSON, function ( key, val )
            {
                $( '.' + key ).html( val );
            } )
        }
    } )
}

function deleteUser( url, userId )
{
    console.log( url + userId );
    $.ajax( {
        url   : url + userId,
        method: 'GET'
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        if ( objJSON[ 0 ] )
        {
            $( 'body' ).find( '.panel-default[name*=' + userId + ']' ).empty();
        }
    } )
}

function newUser( url )
{
    $.ajax( {
        url   : url,
        method: 'POST',
        data  : $( ".newUser" ).serialize()
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        console.log( data );
        if ( Object.keys( objJSON ).length == 0 )
        {
            window.location.href = "/index.php";
        } else
        {
            $.each( objJSON, function ( key, val )
            {
                $( '.' + key ).html( val );
            } )
        }
    } )
}

function checkTime( appStart, appEnd, dayStart, dayEnd )
{
    $.ajax( {
        url   : 'index.php?page=AjaxTime&start=' + appStart + '&end=' + appEnd + '&startDay=' +
        dayStart + '&endDay=' + dayEnd,
        method: 'GET'
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        if ( true == objJSON[ 0 ] )
        {
            $( '.checkTime' ).html( '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>' );
            $( '.newBookItButton' ).attr( 'disabled', 'disabled' );
        } else
        {
            $( '.checkTime' ).html( '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' );
            $( '.newBookItButton' ).removeAttr( 'disabled' );
        }
    } )
}

function insertApp( url, appStart, appEnd, dayStart, dayEnd )
{
    $.ajax( {
        url   : url,
        method: 'POST',
        data  : $( "#bookForm" ).serialize() + '&start=' + appStart + '&end=' + appEnd +
        '&startDay=' + dayStart + '&endDay=' + dayEnd
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        if ( true == objJSON[ 0 ] )
        {
            window.location.href = "/index.php";
        }
    } )
}
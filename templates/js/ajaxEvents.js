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

function newUser( url, name, pass, mail )
{
    $.ajax( {
        url   : url + '&name=' + name + '&pass=' + pass + '&mail=' + mail,
        method: 'GET'
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        if ( true == objJSON[ 0 ] )
        {
            window.location.href = "/index.php?page=EmployeeListCtrl";
        } else
        {
            $.each( objJSON, function ( key, val )
            {
                $.each( val, function ( key, value )
                {
                    $( '#err' ).append( '<p>' + value + '</p>');
                })

            } )
        }
    } )
}

function editUser( url, name, pass, mail, user_id, errSpan )
{
    $.ajax( {
        url   : url + '&name=' + name + '&pass=' + pass + '&mail=' + mail + '&userId=' + user_id,
        method: 'GET'
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        if ( true == objJSON[ 0 ] )
        {
            window.location.href = "/index.php?page=EmployeeListCtrl";
        } else
        {
            $.each( objJSON, function ( key, val )
            {
                $.each( val, function ( key, value )
                {console.log(value);
                    errSpan.append( '<p>' + value + '</p>');
                })

            } )
        }
    } )
}

function checkTime( appStart, appEnd, dayStart, dayEnd, recType, duration, room_id )
{
    $.ajax( {
        url   : 'index.php?page=AjaxTime&start=' + appStart + '&end=' + appEnd + '&startDay=' +
        dayStart + '&endDay=' + dayEnd + '&recurringRes=' + recType + '&duration=' + duration + '&room_id=' + room_id,
        method: 'GET'
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        if ( false == objJSON[ 0 ] )
        {
            $( '.checkTime' ).html( '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>' );
            $( '.newBookItButton' ).attr( 'disabled', 'disabled' );
            if ($('#recursion_1').prop('disabled')) {

            } else {
            $( '.checkRec' ).html( '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>' );
            }
        } else
        {
            $( '.checkTime' ).html( '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' );
            $( '.newBookItButton' ).removeAttr( 'disabled' );
            if ($('#recursion_1').prop('disabled')) {

        } else {
            $( '.checkRec' ).html( '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' );
        }
        }
    } )
}

function insertApp( url, appStart, appEnd, dayStart, dayEnd, room_id )
{
    $.ajax( {
        url   : url,
        method: 'POST',
        data  : $( "#bookForm" ).serialize() + '&start=' + appStart + '&end=' + appEnd +
        '&startDay=' + dayStart + '&endDay=' + dayEnd + '&room_id=' + room_id
    } ).then( function ( data )
    {console.log(data);
        var objJSON = JSON.parse( data );
        console.log(objJSON[ 0 ]);
        if ( true == objJSON[ 0 ] )
        {
            window.location.href = "/index.php";
        }
    } )
}

function logOff() {
    $.ajax( {
        url   : 'index.php?page=LogOffCtrl',
        method: 'GET'
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        console.log(objJSON[ 0 ]);
        if ( objJSON[ 0 ] )
        {
            window.location.href = "/index.php";
        }
    } )
}

function deleteAppointment(url, app_id){
    $.ajax( {
        url   : url,
        method: 'POST',
        data  : $( "#editForm" ).serialize() + '&action=delete&app_id=' + app_id
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        console.log(objJSON[ 0 ]);
        if ( true == objJSON[ 0 ] )
        {
            window.opener.location.reload();
            window.close();
        }
    } )
}

function updateAppointment(url, app_id, room_id){
    $.ajax( {
        url   : url,
        method: 'POST',
        data  : $( "#editForm" ).serialize() + '&action=update&app_id=' + app_id +
        '&startDay=' + '&room_id=' + room_id
    } ).then( function ( data )
    {console.log(data);
        var objJSON = JSON.parse( data );
        console.log(objJSON);
        if ( true == objJSON[ 0 ] )
        {
            window.opener.location.reload();
            window.close();
        } else {
            $('.errMess' ).html('Conflict at ' + objJSON[ 0 ]);
            $('.update, .delete' ).prop('disabled', true);
            setTimeout('window.close()', 1100);
            setTimeout('window.opener.location.reload()', 1100);
        }
    } )
}
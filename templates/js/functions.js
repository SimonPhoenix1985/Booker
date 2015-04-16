function buildHead( day )
{
    var headData = '<tr>';
    var nameDayOfWeek = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
    if ( day == 'Monday begin' )
    {
        for ( var i = 0; i <= 6; i ++ )
        {
            headData += '<th>' + nameDayOfWeek[ i ] + '</th>';
        }
        headData += '</tr>';
        return headData;
    } else
    {
        nameDayOfWeek.splice( 0, 0, nameDayOfWeek.splice( - 1, 5 )[ 0 ] );
        for ( var i = 0; i <= 6; i ++ )
        {
            headData += '<th>' + nameDayOfWeek[ i ] + '</th>';
        }
        headData += '</tr>';
        return headData;
    }

}

function lScomm()
{
    var objLS = JSON.parse( localStorage[ 'settings' ] );
    return objLS[ 0 ][ 'start day of week' ];
}

function lSchanger( paramKey, paramVal )
{
    var objLS = JSON.parse( localStorage[ 'settings' ] );
    $.each( objLS, function ( key, val )
    {

    } );
}
var months = [ 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December' ];
function GetMonthName( monthNumber )
{

    return months[ monthNumber ];
}

function generateDaysList( month, lastDayOfMonth, dayStart, year )
{
    for ( var i = 1; i <= lastDayOfMonth; i ++ )
    {
        if ( i < dayStart )
        {
            $( '.bookItDate' ).append( '<option disabled value="' + i + '">' + i + '</option>' );
        } else if ( i == dayStart )
        {
            if ( weekEnds( new Date( year, month, i ) ) )
            {
                $( '.bookItDate' ).append( '<option selected value=" ' + i + '" class="activeDay">' + i + '</option>' );
            } else
            {
                $( '.bookItDate' ).append( '<option disabled value="' + i + '">' + i + '</option>' );
            }

        } else
        {
            if ( weekEnds( new Date( year, month, i ) ) )
            {
                $( '.bookItDate' ).append( '<option value="' + i + '" class="activeDay">' + i + '</option>' );
            } else
            {
                $( '.bookItDate' ).append( '<option disabled value="' + i + '">' + i + '</option>' );
            }

        }
    }

}
function fillDateSelect( month, lastDayOfMonth, dayStart, year )
{
    for ( var i = 0; i <= 11; i ++ )
    {
        if ( i == month )
        {
            $( '.bookItMonth' ).append( '<option selected="selected" value="' + i + '">' + months[ i ] + '</option>' );
        } else
        {
            $( '.bookItMonth' ).append( '<option value="' + i + '">' + months[ i ] + '</option>' );
        }

    }
    generateDaysList( month, lastDayOfMonth, dayStart, year );

    for ( var i = 0; i <= 11; i ++ )
    {
        var count = new Date().getFullYear() + i;
        if ( count == year )
        {
            $( '.bookItYear' ).append( '<option selected="selected" value="' + count + '">' + count + '</option>' );
        } else
        {
            $( '.bookItYear' ).append( '<option value="' + count + '">' + count + '</option>' );
        }
    }
}

function weekEnds( date )
{
    if ( date.getDay() == 0 || date.getDay() == 6 )
    {
        return false;
    } else
    {
        return true;
    }
}

function getListOfDays( curYear, curMonth )
{
    $( '.bookItDate, .startHour, .endHour' ).html( '' );
    var curDate = new Date( new Date().setHours( 0, 0, 0, 0 ) );
    var daysInMonth = 32 - new Date( curYear, curMonth, 32 ).getDate();
    if ( curDate.getFullYear() == curYear )
    {
        if ( curDate.getMonth() == curMonth )
        {
            generateDaysList( curMonth, daysInMonth, new Date().getDate(), curYear );
        } else if ( curDate.getMonth() > curMonth )
        {
            generateDaysList( curMonth, daysInMonth, 32, curYear );
        } else
        {
            generateDaysList( curMonth, daysInMonth, 1, curYear );
        }
    } else if ( curDate.getFullYear() > curYear )
    {
        generateDaysList( curMonth, daysInMonth, 32, curYear );
    } else
    {
        generateDaysList( curMonth, daysInMonth, 1, curYear );
    }
}

function fillHoursAndMinutes( timeFormat, date )
{
    $( '.startHour, .endHour' ).html( '' );
    var nowHour = new Date().getHours();
    var nowMinutes = new Date().getMinutes();
    var start = 0;
    var end = 23;
    if ( 'am' == timeFormat )
    {
        start = 1;
        end = 12;
    }
    if ( date.setHours( 0, 0, 0, 0 ) == new Date().setHours( 0, 0, 0, 0 ) )
    {
        for ( var i = start; i <= end; i ++ )
        {
            if ( nowHour == i )
            {
                if (nowMinutes >= 30) {
                    $( '.startHour, .endHour' ).append( '<option disabled value="' + i + '">' + i + '</option>' );
                } else {
                    $( '.startHour, .endHour' ).append( '<option class="activeDay" selected="selected" value="' +
                    i + '">' + i + '</option>' );
                }

            } else if ( nowHour > i )
            {
                $( '.startHour, .endHour' ).append( '<option disabled value="' + i + '">' + i + '</option>' );
            } else
            {
                $( '.startHour, .endHour' ).append( '<option class="activeDay" value="' + i + '">' + i + '</option>' );
            }
        }
    } else if ( date.getTime() > new Date().getTime() )
    {
        for ( var i = start; i <= end; i ++ )
        {
            $( '.startHour, .endHour' ).append( '<option class="activeDay" value="' + i + '">' + i + '</option>' );
        }
    } else
    {
        for ( var i = start; i <= end; i ++ )
        {
            $( '.startHour, .endHour' ).append( '<option disabled value="' + i + '">' + i + '</option>' );
        }
    }
}

function getTimeFormat()
{
    return 24;
}
function confirmDelete()
{
    if ( confirm( 'Are You sure want to delete this user and all his appointments ?' ) )
    {
        return true;
    } else
    {
        return false;
    }
}

function validation( year, month, day, insert )
{
    year = parseInt( year );//console.log(year);
    month = parseInt( month );//console.log(month);
    day = parseInt( day );//console.log(day);
    var startHour = parseInt($('.startHour' ).val());//console.log(startHour);
    var startMinutes = parseInt($('.startMin' ).val());//console.log(startMinutes);
    var endHour = parseInt($('.endHour' ).val());//console.log(endHour);
    var endMinutes = parseInt($('.endMin' ).val());//console.log(endMinutes);
    var appStart = new Date(year, month, day, startHour, startMinutes ).getTime();//console.log(appStart);
    var appEnd = new Date(year, month, day, endHour, endMinutes ).getTime();//console.log(appEnd);
    var dayStart = new Date(year, month, day ).getTime(); //console.log(dayStart);
    var dayEnd = new Date(year, month, day, 23, 59).getTime(); //console.log(dayEnd);
    if (insert == 'insert') {
        insertApp('index.php?page=AjaxTime', appStart, appEnd, dayStart, dayEnd);
    } else {
        if ( new Date(year, month, day) >= new Date().setHours( 0, 0, 0, 0 )){
            $('.checkDate' ).html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
            if (appEnd > appStart) {
                checkTime(appStart, appEnd, dayStart, dayEnd);
            } else {
                $('.checkTime' ).html('<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>');
                $('.newBookItButton' ).attr('disabled', 'disabled');
            }
        }else {
            $('.checkDate' ).html('<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>');
            $('.newBookItButton' ).attr('disabled', 'disabled');
        }
    }
}
/*
CSS Browser Selector 0.6.1
Originally written by Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
https://github.com/rafaelp/css_browser_selector

Co-maintained by:
https://github.com/verbatim/css_browser_selector
*/

// u  # navigator.userAgent
function Detection(u) {

    var uaInfo = {},  //userAgent info
        screens = [320, 480, 640, 768, 1024, 1152, 1280, 1440, 1680, 1920, 2560],
        allScreens = screens.length,
        ua = u.toLowerCase(),

        is = function(t) {
            return RegExp(t,"i").test(ua);
        },

        // p  # operation system
        // n  # operation system version number
        version = function( p, n ) {
            n = n.replace(".","_");
            var i = n.indexOf('_'),
                ver="" ;

            while ( i>0 ) {
                ver += " "+ p + n.substring(0,i);
                i = n.indexOf('_', i+1);
            }

            ver += " "+p+n;
            return ver;
        },

        g='gecko',
        w='webkit',
        c='chrome',
        f='firefox',
        s='safari',
        o='opera',
        m='mobile',
        a='android',
        bb='blackberry',
        lang='lang_',
        dv='device_',
        html=document.documentElement,

        b=  [
            // browser
            ( !(/opera|webtv/i.test(ua)) && /msie\s(\d+)/.test(ua) )

                ? ('ie ie'+(/trident\/4\.0/.test(ua) ? '8' : RegExp.$1) )

                : is('firefox/')?g+ " " + f+(/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+f+RegExp.$2 + ' '+f+RegExp.$2+"_"+RegExp.$4:'')
                : is('gecko/')?g
                : is('opera')?o+(/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+o+RegExp.$2 + ' '+o+RegExp.$2+"_"+RegExp.$4 : (/opera(\s|\/)(\d+)\.(\d+)/.test(ua)?' '+o+RegExp.$2+" "+o+RegExp.$2+"_"+RegExp.$3:''))
                : is('konqueror')?'konqueror'

                : is('blackberry') ?
                    ( bb +
                        ( /Version\/(\d+)(\.(\d+)+)/i.test(ua)
                            ? ' ' + bb+ RegExp.$1 + ' '+bb+ RegExp.$1+RegExp.$2.replace('.','_')
                            : (/Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua)
                                ? ' ' +bb+RegExp.$2 + (RegExp.$3?' ' +bb+RegExp.$2+RegExp.$3:'')
                                : '')
                        )
                    ) // blackberry

                : is('android') ?
                    (  a +
                        ( /Version\/(\d+)(\.(\d+))+/i.test(ua)
                            ? " " + a+ RegExp.$1 + " "+a+ RegExp.$1+RegExp.$2.replace('.','_')
                            : '')
                        + (/Android (.+); (.+) Build/i.test(ua)
                            ? ' '+dv+( (RegExp.$2).replace(/ /g,"_") ).replace(/-/g,"_")
                            :'' )
                    ) //android

                : is('chrome')?w+   ' '+c+(/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)?' '+c+RegExp.$2 +((RegExp.$4>0) ? ' '+c+RegExp.$2+"_"+RegExp.$4:''):'')

                : is('iron')?w+' iron'

                : is('applewebkit/') ?
                    ( w+ ' '+ s +
                        ( /version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua)
                            ?  ' '+ s +RegExp.$2 + " "+s+ RegExp.$2+RegExp.$3.replace('.','_')
                            :  ( / Safari\/(\d+)/i.test(ua)
                                ?
                                ( (RegExp.$1=="419" || RegExp.$1=="417" || RegExp.$1=="416" || RegExp.$1=="412" ) ? ' '+ s + '2_0'
                                    : RegExp.$1=="312" ? ' '+ s + '1_3'
                                    : RegExp.$1=="125" ? ' '+ s + '1_2'
                                    : RegExp.$1=="85" ? ' '+ s + '1_0'
                                    : '' )
                                :'')
                            )
                    ) //applewebkit

                : is('mozilla/')?g
                : ''
            ,

            // mobile
            is("android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk")?m:''
            ,

            // os system
            is('j2me')?'j2me'

            :is('ipad|ipod|iphone') ?
                (
                    (
                        /CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(ua)  ?
                        'ios' + version('ios',RegExp.$2) : ''
                    ) + ' ' + ( /(ip(ad|od|hone))/gi.test(ua) ? RegExp.$1 : "" )
                ) //'iphone'

            :is('ipod')?'ipod'
            :is('ipad')?'ipad'

            :is('playbook')?'playbook'
            :is('kindle|silk')?'kindle'
            :is('playbook')?'playbook'

            // platform system
            :is('mac')?'mac'+ (/mac os x ((\d+)[.|_](\d+))/.test(ua) ?    ( ' mac' + (RegExp.$2)  +  ' mac' + (RegExp.$1).replace('.',"_")  )     : '' )
            :is('win')?'win'+
                    (is('windows nt 6.2')?' win8'
                    :is('windows nt 6.1')?' win7'
                    :is('windows nt 6.0')?' vista'
                    :is('windows nt 5.2') || is('windows nt 5.1') ? ' win_xp'
                    :is('windows nt 5.0')?' win_2k'
                    :is('windows nt 4.0') || is('WinNT4.0') ?' win_nt'
                    : ''
                    )
            :is('freebsd')?'freebsd'
            :(is('x11|linux'))?'linux'
            :''
            ,

            // user agent language
            (/[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(ua))?(lang+RegExp.$2).replace("-","_")+(RegExp.$3!=''?(' '+lang+RegExp.$1).replace("-","_"):''):''
            ,

            // beta: test if running iPad app
            ( is('ipad|iphone|ipod') && !is('safari') )  ?  'ipad_app'  : ''

            // return array [ browsers, mobile, os_or_operation_system, user_language, ipad_app]
        ]; // browers

    function screenSize() {
        // html #document.documentElement
        var width = window.outerWidth || html.clientWidth;
        var height = window.outerHeight || html.clientHeight;

        uaInfo.orientation = ((width<height) ? "portrait" : "landscape");

        // remove previous min-width, max-width, client-width, client-height, and orientation
        html.className = html.className
            .replace(/ ?orientation_\w+/g, "")
            .replace(/ [min|max|cl]+[w|h]_\d+/g, "");

        // screens = [320, 480, 640, 768, 1024, 1152, 1280, 1440, 1680, 1920, 2560]
        for ( var i=(allScreens-1); i>=0; i--) {
            if ( width >= screens[i] ) {
                uaInfo.maxw = screens[i];
                break;
            }
        }
        for ( var i=0; i<(allScreens-1); i++) {
            if ( width <= screens[i] ) {
                uaInfo.minw = screens[i];
                break;
            }
        }

        widthClasses="";

        // uaInfo obj ex: { orientation= "landscape", maxw=1440 }
        for ( var info in uaInfo ) {
            widthClasses+=" "+info+"_"+ uaInfo[info]
        };

        html.className =  ( html.className + widthClasses  );

        return widthClasses;
    } // screenSize

    window.onresize = screenSize;

    screenSize();

    // gecko firefox firefox20 firefox20_0(majorVersion_minorVersion)  mac mac10 mac10_8   js
    var BrowserClasses = (b.join(' ')) + " js ";

    html.className =   ( BrowserClasses + html.className.replace( /\b(no[-|_]?)?js\b/g, "")  )
        .replace(/^ /, "")  // replace first space into non-space
        .replace(/ +/g," "); // replace extra spaces into single space

    return BrowserClasses;
}

Detection(navigator.userAgent);

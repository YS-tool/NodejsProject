function ready(){
    console.log( "ready!" );
}

function clickHideP(){
    $("p").click(function(){
        $(this).hide();
    });
}

async function getUserAndHWinfo(){
    var trackUserObj = {
        browser    : getBrowser(),
        userOS     : getOS(),
        cpuCore    : navigator.hardwareConcurrency,
        memory     : navigator.deviceMemory,
        defaultLan : navigator.language,
        touchPoint : navigator.maxTouchPoints,
        battery    : await getBattery(getBrowser())
    }

    // navigator.geolocation.getCurrentPosition((addr)=>{
    //     console.log(addr.coords)
    //     console.log(addr.timestamp)
    // })

    return trackUserObj

}

function getOS(){
    var userAgent = navigator.userAgent,
    platform = window.navigator?.userAgentData?.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
    } else if (/Android/.test(userAgent)) {
    os = 'Android';
    } else if (/Linux/.test(platform)) {
    os = 'Linux';
    }

    return os
}

async function getBattery(firefox){
    if(firefox=="Firefox"){
        return false
    }
    const chargingStatus = await navigator.getBattery()
    const isCharging = chargingStatus.charging
    return isCharging
}

function getBrowser(){
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'Opera';
    } else if (navigator.userAgent.indexOf("Edg") != -1) {
        return 'Edge';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        return 'IE';
    } else {
        return 'unknown';
    }
}
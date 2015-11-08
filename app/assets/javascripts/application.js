// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

/*
Usage: call function loadFacebookSDK() at the beginning of the body tag in html
*/

// to trigger login, create this button:
//<fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>

// with this div to show status:
// <div id="status"></div>
// also check the javascript console for the data returned by the server.

// to logout (of the app and facebook), call fbLogout(callback) with some callback function that takes a response parameter.

// to find permissions granted, call fbPermissions(callback) with some callback function that takes a response in the form
// {"public_profile": "granted", "email": "granted, "user_friends": "declined"}

// to request more permissions, call the function requestPermissions, which must be called from a HTML button event handler.
// the argument is a comma-separated list of permissions like "user_friends,email"
// you're allowed to re-ask for declined permissions (might only work once though)
// unclear what happens if you re-ask for permissions which have been granted.

var userId = "";
var userName = "";


// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
                      statusChangeCallback(response);
                      });
}

window.fbAsyncInit = function() {
    FB.init({
            appId      : '752986251511997',
            cookie     : true,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.2' // use version 2.2. or maybe 2.5?
            });
    
    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    
    FB.getLoginStatus(function(response) {
                      statusChangeCallback(response);
                      });
    
};

function fbLogout(callback) {
    // logs the user out of the app and facebook
    FB.logout(function(response) {
        callback(response);
        // Person is now logged out
    });
}

function requestPermissions(permissions) {
    FB.login(function(response) {
        console.log(response);
    }, {scope: permissions, auth_type: 'rerequest'});
}

function fbPermissions(callback) {
    FB.api('/me/permissions', function(response) {
        arrayPermissions = response["data"];
        permissions = {};
        for (var i = 0; i < arrayPermissions.length; i++) {
            perm = arrayPermissions[i];
            if (perm["status"] === "granted") {
                permissions[perm["permission"]] = "granted";
            } else {
                permissions[perm["permission"]] = "declined";
            }
        }
        callback(permissions);
    });
}

// functions that will get called when the SDK is known and userId and userName too
var execAfterLoadSDK = [];
var loadedSDK = false;

function fetchMusic() {
    FB.api('/'+userId+'/music', function(response) {
        // look in created_time field for the time the user liked the page
        console.log("found music");
        console.log(response);
        document.getElementById("lee").innerHTML = response;
    });
}

// music and profile picture might actually require /ser-id/ instead of /me/
function fbMusic() {
    if (loadedSDK) {
        fetchMusic();
    } else {
        execAfterLoadSDK.push(fetchMusic);
    }
}

function fbProfilePic(callback) {
    FB.api('/me/picture', function(response) {
        if (response && !response.error) {
            callback(response);
        }
    });
}


// Load the SDK asynchronously
function loadSDK(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}

function loadFacebookSDK() {
    loadSDK(document, 'script', 'facebook-jssdk');
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
           console.log('Successful login for: ' + response.name);
           console.log('full data:');
           console.log(response);
           document.getElementById('lee').innerHTML =
           'Thanks for logging in, ' + response.name + '!';
           userName = response.name;
           userId = response.id;
           for (var i = 0; i < execAfterLoadSDK.length; i++) {
                execAfterLoadSDK[i]();
            }
            loadedSDK = true;
           });
}
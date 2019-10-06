let discord = new LoginWithDiscord({
  cache: true
});

let user, guilds;

function request(url, data) {
  const myRequest = new Request('https://windzix.glitch.me/server/' + url, {method: 'POST', body: data});
  
  var x = fetch(myRequest)
  .then(response => {
    if (response.status === 200) {
      return response.text();
    } else if (response.status === 404) {
      return null;
    } else {
      return console.log("%cSomething went wrong on request", "color: #222; font-weight: 900; font-size: 12px; border: solid 1px #ff2222; border-radius: 5px; padding: 7px;")
    }
  })
  .then(response => {
    return response;
  });
  
  return x;
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

window.onload = () => {
  console.log("%cWindzix", "color: #222; font-weight: 900; font-size: 64px; margin-left: 32px;")
  console.log("%cdashboard", "color: #666; font-weight: 300; font-size: 32px; margin-left: 80px; margin-bottom: 10px;")
  discord.init();
}

discord.onlogin = async () => {
  console.log("%cLogged in successfuly", "color: #222; font-weight: 900; font-size: 12px; border: solid 1px #22ff22; border-radius: 5px; padding: 7px;")

  Array.from(document.getElementsByClassName('out')).forEach(x => {
    x.style.display = "none";
  });
  Array.from(document.getElementsByClassName('in')).forEach(x => {
    x.style.display = '';
  });
  user = await discord.fetchUser().catch(console.log);
  console.log("%cSuccessfuly got user data", "color: #222; font-weight: 900; font-size: 12px; border: solid 1px #22ff22; border-radius: 5px; padding: 7px;");

  if (getCookie("ckAlert") == undefined) {
    setTimeout(function() {Materialize.toast('We use cookies to set your theme, ok?', 4000)}, 1000);
    setCookie("ckAlert", 1, {expires: 361650000, path: "/"});
  }
  
  document.getElementById('name').innerHTML = `<span class="username">${user.username}</span>`;
  document.getElementById('userpfp').src = user.avatarURL;
  document.getElementById('nameMobile').innerHTML = `<span class="username">${user.username}</span>`;
  document.getElementById('userpfpMobile').src = user.avatarURL;

  $("#loading").removeClass("fadeIn");
  $("#loading").addClass("fadeOut");
  setTimeout(function() {
    document.getElementById('loading').style.display = "none";
    document.body.style.overflow = 'visible';
    $(".t").addClass('fadeIn');
  }, 500);

  // REQUESTS //
  var getUser = request("/getUser", `{ "id": "${user.id}" }`);
  if (getUser === null || getUser === undefined) {
    request("/sendUser", `{ "id": "${user.id}", "rankColor": "#aaaaaa", "rankImage": "" }`);
    getUser = request("/getUser", `{ "id": "${user.id}" }`);
  }
}

discord.onlogout = async () => {
  console.log("%cLogged out", "color: #222; font-weight: 900; font-size: 12px; border: solid 1px #ff2222; border-radius: 5px; padding: 7px;")
  Array.from(document.getElementsByClassName('in')).forEach(x => {
    x.style.display = "none";
  });
  Array.from(document.getElementsByClassName('out')).forEach(x => {
    x.style.display = '';
  });
}

async function login() {
  await discord.login('617400949731753987', Scope.Identify, Scope.Connections, Scope.Email, Scope.Guilds);
}

async function logout() {
  await discord.logout();
}

/* CHANGING GUILD SETTINGS */

var id = window.location.pathname.slice(1);

var settings = request("/getServer", `{ "id": "${id}" }`).then(function(result) {return result;});

settings.then(res => {
  
  res = JSON.parse(res);
  var x = discord.fetchGuild(id);
  x.then(data => ({name: data.name, icon: data.icon})).then(r => { 
    console.log("%cServer - " + r.name, "color: #222; font-weight: 300; font-size: 16px; margin-bottom: 10px;")
    $(".name").text(r.name);
    if (r.icon === "https://cdn.discordapp.com/icons/" + id + "/null.png") {
      $(".icon").html(`<div class="guildIco">${r.name.charAt(0)}</div>`);
    } else {
      $(".icon").html(`<img src="${r.icon}" class="guildIco">`);
    }
  });
  
  $("#prefix").val(res.settings.prefix);
  $(".delete").text(res.settings.delete);
  $(".deleteTime").text(res.settings.deleteTime);
  $('select').material_select();
  $(".select-dropdown").val(res.settings.delete);
  $('.pr').characterCounter();
  
  // UPDATING FIELDS //
  
  var saveState = true;
  
  var $form = $('form'),
    origForm = $form.serialize();

  $('form :input').on('change input', function() {
    
    if ($form.serialize() !== origForm && saveState) {
      $(".save").css("display", "flex");
      $(".save").addClass("fadeIn");
      saveState = false;
      setTimeout(() => {
        $(".save").removeClass("fadeIn")
      }, 300);
    } else if ($form.serialize() == origForm) {
      $(".save").addClass("fadeOut");
      saveState = true;
      setTimeout(() => {
        $(".save").removeClass("fadeOut");
        $(".save").css("display", "none");
      }, 300);
    }
  });
  
  // SAVE/CANCEL BUTTONS LOGIC //
  
  $(".saveBtn").click(function () {
    if ($("#prefix").val() === "" || $("#prefix").val().length > 5) {
      function redUnderline () {
        $("#prefix").addClass("red-input");
        setTimeout(function () {$("#prefix").removeClass("red-input")}, 1500);
      }
      return redUnderline();
    }
    
    origForm = $form.serialize();
    request("/updateServer", `{ "id": "${id}", "settings": { "prefix": "${$("#prefix").val()}", "delete": "${$(".dropdown-content").find("li.active").text()}", "deleteTime": 10000, "volume": 100, "maxVolume": 200, "djonly": false, "djroles": [], "levelup": false } }`);
    $(".save").addClass("fadeOut");
    setTimeout(() => {
      $(".save").removeClass("fadeOut");
      $(".save").css("display", "none");
    }, 300);
  });
  
  $(".cancelBtn").click(function () {
    if ($("#prefix").val() === "" || $("#prefix").val().length > 5) {
      function redUnderline () {
        $("#prefix").addClass("red-input");
        setTimeout(function () {$("#prefix").removeClass("red-input")}, 1500);
      }
      return redUnderline();
    }
    
    origForm = $form.serialize();
    request("/updateServer", `{ "id": "${id}", "settings": { "prefix": "${$("#prefix").val()}", "delete": "${$(".dropdown-content").find("li.active").text()}", "deleteTime": 10000, "volume": 100, "maxVolume": 200, "djonly": false, "djroles": [], "levelup": false } }`);
    $(".save").addClass("fadeOut");
    setTimeout(() => {
      $(".save").removeClass("fadeOut");
      $(".save").css("display", "none");
    }, 300);
  });
  
});
let discord = new LoginWithDiscord({
  cache: true
});

let user, guilds;

function request(url, data) {
  const myRequest = new Request('https://windzix.glitch.me/dashboard/' + url, {method: 'POST', body: data});
  
  var x = fetch(myRequest)
  .then(response => {
    if (response.status === 200) {
      return response.json();
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
  console.log("%cSuccessfuly got user data", "color: #222; font-weight: 900; font-size: 12px; border: solid 1px #22ff22; border-radius: 5px; padding: 7px;")
  guilds = await discord.fetchGuilds().catch(console.log);
  console.log("%cSuccessfuly got guilds data", "color: #222; font-weight: 900; font-size: 12px; border: solid 1px #22ff22; border-radius: 5px; padding: 7px;")

  if (getCookie("ckAlert") == undefined) {
    setTimeout(function() {Materialize.toast('We use cookies to set your theme, ok?', 4000)}, 1000);
    setCookie("ckAlert", 1, {expires: 361650000, path: "/"});
  }
  
  document.getElementById('name').innerHTML = `<span class="username">${user.username}</span>`;
  document.getElementById('userpfp').src = user.avatarURL;
  document.getElementById('nameMobile').innerHTML = `<span class="username">${user.username}</span>`;
  document.getElementById('userpfpMobile').src = user.avatarURL;

  let g = document.getElementById('guilds');
  for (let guild of guilds) {
    let child = document.createElement('a');
    
    if (guild.permissions.has('MANAGE_SERVER')) {
      child.classList.add('guild');
      $(child).attr("onclick", "choose('" + guild.id + "')");

      if (guild.icon === null) {
        child.innerHTML = `<div class="guildIco">${guild.name.charAt(0)}</div><div class="hint z-depth-2">${guild.name}</div>`;
      } else {
        child.innerHTML = `<img class="guildIco" src="${guild.iconURL}"><div class="hint z-depth-2">${guild.name}</div>`;
      }

      g.appendChild(child);
    }
  
  }

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
  document.getElementById('guilds').innerHTML = '';
}

async function login() {
  await discord.login('617400949731753987', Scope.Identify, Scope.Connections, Scope.Email, Scope.Guilds);
}

async function logout() {
  await discord.logout();
}

/* CHANGING GUILD SETTINGS */

function fetchBotInGuild(guild) {
  var state;
  var r = request("/getBotInGuild", `{ "id": "${guild}" }`);
  
  return r.then(res => {
    return res.state;
  });
}

function choose(guild) {
    
  fetchBotInGuild(guild).then(s => {
    if (s == false) {
      window.location.href = "https://discordapp.com/api/oauth2/authorize?client_id=617400949731753987&permissions=8&redirect_uri=https%3A%2F%2Fwindzix.glitch.me%2Fdashboard%2F&scope=bot";
    } else {
      window.location.href = 'https://windzix.glitch.me/dashboard/' + guild;
    }
  });

}
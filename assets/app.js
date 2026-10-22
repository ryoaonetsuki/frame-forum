/* FRAME Forum — shared app layer. Static frontend, localStorage only (no backend yet). */
(function(){
'use strict';
var DB_KEY='frame_db_v1';

/* ---------- seed data ---------- */
function seed(){
  var now=Date.now(), H=36e5, D=24*H;
  return {
    users:[
      {id:'u-salman',name:'Salman',email:'salman@frame.dev',pass:'admin123',avatar:'https://i.pravatar.cc/100?img=12',role:'superadmin',badge:'admin',title:'Founder & Super Admin',joined:'Mar 2021',bio:'Building FRAME — a premium community for developers and creators.',msgs:5210,likes:'18.2K',banned:false},
      {id:'u-mika',name:'Mika Tanaka',email:'mika@frame.dev',pass:'admin123',avatar:'https://i.pravatar.cc/100?img=47',role:'admin',badge:'admin',title:'Community founder',joined:'Mar 2021',bio:'Full-stack developer. I run the community day to day.',msgs:4218,likes:'12.4K',banned:false},
      {id:'u-ari',name:'Ari Chen',email:'ari@frame.dev',pass:'mod123',avatar:'https://i.pravatar.cc/100?img=60',role:'mod',badge:'mod',title:'Moderator',joined:'Jan 2022',bio:'Keeping discussions healthy and helpful.',msgs:2903,likes:'9.8K',banned:false},
      {id:'u-jules',name:'Jules Park',email:'jules@frame.dev',pass:'user123',avatar:'https://i.pravatar.cc/100?img=11',role:'member',badge:'vip',title:'Plus member',joined:'Jul 2022',bio:'React developer. I build dashboards and design systems.',msgs:1847,likes:'6.2K',banned:false},
      {id:'u-noah',name:'Noah Williams',email:'noah@frame.dev',pass:'user123',avatar:'https://i.pravatar.cc/100?img=32',role:'member',badge:'creator',title:'Creator',joined:'Aug 2022',bio:'Indie maker shipping templates and tools.',msgs:1204,likes:'4.1K',banned:false}
    ],
    forums:[
      {id:'f-ann',cat:'Community',name:'Announcements',desc:'Official news and updates from the FRAME team.',icon:'ph-megaphone'},
      {id:'f-gen',cat:'Community',name:'General Discussion',desc:'Talk about anything — tech, life, ideas.',icon:'ph-chats-circle'},
      {id:'f-intro',cat:'Community',name:'Introductions',desc:'New here? Say hello to the community.',icon:'ph-hand-waving'},
      {id:'f-dev',cat:'Development',name:'Developer tools',desc:'Editors, frameworks, libraries and workflows.',icon:'ph-code'},
      {id:'f-show',cat:'Development',name:'Projects & Showcase',desc:'Show what you are building and get feedback.',icon:'ph-rocket-launch'},
      {id:'f-market',cat:'Marketplace',name:'Templates & Themes',desc:'Buy and sell templates, themes and UI kits.',icon:'ph-shopping-bag'},
      {id:'f-req',cat:'Marketplace',name:'Requests',desc:'Looking for something? Request it here.',icon:'ph-hand-coins'},
      {id:'f-game',cat:'Entertainment',name:'Gaming',desc:'Games, reviews and recommendations.',icon:'ph-game-controller'},
      {id:'f-tv',cat:'Entertainment',name:'TV & film',desc:'Shows, movies and everything on screen.',icon:'ph-television'}
    ],
    threads:[
      {id:'t1',forumId:'f-dev',title:'What are you building this week?',authorId:'u-mika',createdAt:now-12*6e4,views:1800,status:'active',type:'discussion',pinned:true,excerpt:'Share what you are working on this week — side projects, tricky bugs, new tools, or something you just learned.'},
      {id:'t2',forumId:'f-show',title:'An appreciation post for games that respect your time.',authorId:'u-jules',createdAt:now-38*6e4,views:942,status:'active',type:'discussion',excerpt:'No filler, no grind-for-grind\u2019s-sake — which games actually respect your time?'},
      {id:'t3',forumId:'f-show',title:'How do you structure a React project that will grow?',authorId:'u-noah',createdAt:now-1*H,views:1200,status:'active',type:'discussion',excerpt:'Folders, features, or organized chaos? How do you keep a React codebase sane?'},
      {id:'t4',forumId:'f-gen',title:'What should every new developer know about contributing to open source?',authorId:'u-ari',createdAt:now-2*H,views:517,status:'closed',type:'discussion',excerpt:'First-PR nerves? What experienced contributors wish every newcomer knew.'},
      {id:'t5',forumId:'f-market',title:'NeonX — React Admin Dashboard Template',authorId:'u-jules',createdAt:now-3*H,views:856,status:'active',type:'product',price:29,currency:'USD',free:false,buyUrl:'https://gumroad.com/l/neonx-demo',buyLabel:'Buy now',image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',previewUrl:'https://demo.neonx.dev',shots:['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=70','https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&q=70','https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=70'],excerpt:'Production-ready admin template: 40+ pages, dark/light mode, charts, auth flows. Built with React + Tailwind.'},
      {id:'t6',forumId:'f-ann',title:'Welcome to FRAME — please read the community guidelines',authorId:'u-salman',createdAt:now-5*D,views:5400,status:'active',type:'discussion',pinned:true,excerpt:'A quick tour of the community, the rules, and how to get the most out of FRAME.'},
      {id:'t7',forumId:'f-intro',title:'Hello everyone! Frontend dev from Dhaka here',authorId:'u-noah',createdAt:now-1*D,views:214,status:'active',type:'discussion',excerpt:'Just joined — I build React apps and love design systems. Excited to be here!'}
    ],
    posts:[
      {id:'p1',threadId:'t1',authorId:'u-mika',createdAt:now-12*6e4,likes:248,parentId:null,body:'Share what you are working on this week. It can be a side project, a tricky bug, a new tool, or something you have just learned. Where could the community help?'},
      {id:'p2',threadId:'t1',authorId:'u-jules',createdAt:now-8*6e4,likes:12,parentId:null,body:'Currently rebuilding a small dashboard in React. My biggest focus this week is making the component system easier to maintain.'},
      {id:'p3',threadId:'t1',authorId:'u-noah',createdAt:now-4*6e4,likes:4,parentId:'p2',body:'Totally agree — we did the same refactor last month and maintenance got so much easier.'},
      {id:'p4',threadId:'t1',authorId:'u-ari',createdAt:now-2*6e4,likes:7,parentId:null,body:'Small wins count too. Share your repo structure or a screenshot if you want feedback from the community.'},
      {id:'p5',threadId:'t6',authorId:'u-salman',createdAt:now-5*D,likes:412,parentId:null,body:'Welcome to FRAME! This is a premium community for developers and creators. Be kind, share knowledge, no spam. Read the Help page for the full guidelines.'}
    ],
    reports:[
      {id:'r1',threadId:'t2',byId:'u-noah',reason:'Possible spam link in replies',createdAt:now-3*H,status:'open'}
    ],
    notifs:[
      {id:'n1',uid:'u-jules',text:'Ari Chen liked your reply in “What are you building this week?”',createdAt:now-30*6e4,read:false},
      {id:'n2',uid:'u-jules',text:'Noah Williams replied to your comment',createdAt:now-4*6e4,read:false}
    ],
    convos:[
      {id:'c1',withId:'u-ari',msgs:[{from:'u-ari',text:'Hey! Loved your dashboard post.',at:now-2*D},{from:'u-jules',text:'Thanks Ari! Appreciate it.',at:now-2*D+5*6e4}]}
    ],
    saved:{'u-jules':['t5']},
    follows:{},
    session:{uid:'u-jules'},
    settings:{siteName:'FRAME',announcement:'',registrationOpen:true}
  };
}

/* ---------- DB ---------- */
var DB={
  get:function(){try{var d=JSON.parse(localStorage.getItem(DB_KEY));if(d&&d.users)return d;}catch(e){}var s=seed();localStorage.setItem(DB_KEY,JSON.stringify(s));return s;},
  set:function(d){localStorage.setItem(DB_KEY,JSON.stringify(d));},
  reset:function(){localStorage.removeItem(DB_KEY);return DB.get();},
  user:function(id){return DB.get().users.find(function(u){return u.id===id;});},
  thread:function(id){return DB.get().threads.find(function(t){return t.id===id;});}
};

/* ---------- auth ---------- */
var Auth={
  me:function(){var d=DB.get();return d.session&&d.session.uid?DB.user(d.session.uid):null;},
  login:function(email,pass){var d=DB.get();var u=d.users.find(function(x){return x.email.toLowerCase()===String(email).toLowerCase();});if(!u)return{err:'No account found with this email.'};if(u.pass!==pass)return{err:'Incorrect password. Try again.'};if(u.banned)return{err:'This account has been banned.'};d.session={uid:u.id};DB.set(d);return{ok:u};},
  register:function(name,email,pass){var d=DB.get();if(d.users.some(function(x){return x.email.toLowerCase()===String(email).toLowerCase();}))return{err:'An account with this email already exists.'};var u={id:'u-'+Date.now(),name:name,email:email,pass:pass,avatar:'https://i.pravatar.cc/100?u='+encodeURIComponent(email),role:'member',badge:'',title:'New member',joined:'Oct 2026',bio:'',msgs:0,likes:'0',banned:false};d.users.push(u);d.session={uid:u.id};DB.set(d);return{ok:u};},
  google:function(name,email){var d=DB.get();var u=d.users.find(function(x){return x.email.toLowerCase()===String(email).toLowerCase();});if(!u){u={id:'u-'+Date.now(),name:name||'Google User',email:email,pass:'',avatar:'https://i.pravatar.cc/100?u='+encodeURIComponent(email),role:'member',badge:'',title:'New member',joined:'Oct 2026',bio:'',msgs:0,likes:'0',banned:false,google:true};d.users.push(u);}if(u.banned)return{err:'This account has been banned.'};d.session={uid:u.id};DB.set(d);return{ok:u};},
  logout:function(){var d=DB.get();d.session=null;DB.set(d);location.href='login.html';}
};
function requireLogin(){if(!Auth.me()){location.href='login.html?next='+encodeURIComponent(location.pathname.split('/').pop()+location.search);return false;}return true;}
function requireRole(roles){var me=Auth.me();if(!me){location.href='login.html';return false;}if(roles.indexOf(me.role)<0){location.href='index.html';return false;}return true;}

/* ---------- helpers ---------- */
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function timeAgo(ts){var s=(Date.now()-ts)/1e3;if(s<60)return'Just now';if(s<3600)return Math.floor(s/60)+' min ago';if(s<86400)return Math.floor(s/3600)+' hr ago';if(s<86400*7)return Math.floor(s/86400)+'d ago';return new Date(ts).toLocaleDateString();}
function uid(){return 'x'+Date.now().toString(36)+Math.floor(Math.random()*999);}
function badgeHTML(b){
  if(b==='admin')return '<span class="badge badge-admin"><i class="ph-fill ph-crown"></i> Admin</span>';
  if(b==='mod')return '<span class="badge badge-mod"><i class="ph-fill ph-shield-check"></i> Mod</span>';
  if(b==='vip')return '<span class="badge badge-vip"><i class="ph-fill ph-diamond"></i> Plus</span>';
  if(b==='creator')return '<span class="badge badge-creator"><i class="ph-fill ph-star"></i> Creator</span>';
  return '';
}
function statusBadge(st){return st==='closed'?'<span class="badge badge-closed"><i class="ph-fill ph-lock"></i> Closed</span>':'<span class="badge badge-active"><i class="ph-fill ph-check-circle"></i> Active</span>';}
function roleLabel(r){return r==='superadmin'?'Super Admin':r==='admin'?'Admin':r==='mod'?'Moderator':'Member';}
function toast(msg){var t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);}t.textContent=msg;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('show');},2400);}
function threadReplies(tid){return DB.get().posts.filter(function(p){return p.threadId===tid&&!p.parentId;}).length;}
function forumOf(fid){return DB.get().forums.find(function(f){return f.id===fid;});}

/* ---------- shared chrome ---------- */
var Chrome={
  header:function(){
    var me=Auth.me();
    var right=me
      ? '<button class="plain-iconbtn" onclick="location.href=\'notifications.html\'" aria-label="Notifications"><svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M18 9.5C18 7 16.5 4.8 14.2 4.2C13.7 3.5 12.9 3 12 3C11.1 3 10.3 3.5 9.8 4.2C7.5 4.8 6 7 6 9.5C6 14 4.5 15.5 4.5 15.5H19.5C19.5 15.5 18 14 18 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round"/></svg>'+(DB.get().notifs.some(function(n){return n.uid===me.id&&!n.read;})?'<span class="dot-ind"></span>':'')+'</button>'
        +'<button class="plain-iconbtn hide-m" onclick="location.href=\'messages.html\'" aria-label="Messages"><i class="ph-bold ph-chat-circle-text" style="font-size:22px"></i></button>'
      : '<a class="btn btn-primary btn-sm" href="login.html">Log in</a>';
    return '<header class="site-header"><a class="brand" href="index.html"><span class="brand-text">FRAME</span></a>'
      +'<div class="hsearch"><i class="ph-bold ph-magnifying-glass"></i><input id="hq" placeholder="Search discussions..." onkeydown="if(event.key===\'Enter\')location.href=\'search.html?q=\'+encodeURIComponent(this.value)"></div>'
      +'<div class="hacts">'+right+'</div></header>';
  },
  nav:function(active){
    var me=Auth.me();
    var prof=me?'<button class="navtab" onclick="toggleSheet(true)"><img class="nav-avatar" src="'+me.avatar+'" alt="Profile"><span>Profile</span></button>'
      :'<a class="navtab" href="login.html"><i class="ph-bold ph-user-circle" style="font-size:25px"></i><span>Log in</span></a>';
    return '<nav class="bottomnav">'
      +'<a class="navtab'+(active==='home'?' active':'')+'" href="index.html"><svg viewBox="0 0 24 24" width="25" height="25" fill="none"><path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H14V14H10V21H4C3.45 21 3 20.55 3 20V10.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg><span>Home</span></a>'
      +'<a class="navtab'+(active==='explore'?' active':'')+'" href="forums.html"><svg viewBox="0 0 24 24" width="25" height="25" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M14.8 9.2L13.4 13.4L9.2 14.8L10.6 10.6L14.8 9.2Z" stroke="var(--accent)" stroke-width="1.5" stroke-linejoin="round"/></svg><span>Explore</span></a>'
      +'<button class="navtab'+(active==='create'?' active':'')+'" onclick="goCreate()"><svg viewBox="0 0 24 24" width="25" height="25" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 8.5V15.5M8.5 12H15.5" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round"/></svg><span>Create</span></button>'
      +prof+'</nav>';
  },
  sheet:function(){
    var me=Auth.me();if(!me)return '';
    var staff=me.role==='admin'||me.role==='superadmin'||me.role==='mod';
    return '<div class="sheet-overlay" id="sheetOverlay" onclick="toggleSheet(false)"></div>'
    +'<div class="more-sheet" id="moreSheet" role="menu" aria-label="Menu"><div class="sheet-handle"></div>'
    +'<button onclick="location.href=\'profile.html?u='+me.id+'\'"><i class="ph-duotone ph-user"></i>Profile</button>'
    +'<button onclick="goCreate()"><i class="ph-duotone ph-plus-circle"></i>Create post</button>'
    +'<button onclick="location.href=\'profile.html?u='+me.id+'&tab=threads\'"><i class="ph-duotone ph-chat-teardrop-text"></i>My discussions</button>'
    +'<button onclick="location.href=\'saved.html\'"><i class="ph-duotone ph-bookmark"></i>Saved items</button>'
    +'<button onclick="location.href=\'members.html\'"><i class="ph-duotone ph-users"></i>Members</button>'
    +(staff?'<button onclick="location.href=\'admin.html\'"><i class="ph-duotone ph-shield-check"></i>Admin panel</button>':'')
    +(me.role==='superadmin'?'<button onclick="location.href=\'superadmin.html\'"><i class="ph-duotone ph-crown"></i>Super admin</button>':'')
    +'<button onclick="location.href=\'help.html\'"><i class="ph-duotone ph-question"></i>Help &amp; feedback</button>'
    +'<button onclick="toggleAppearance(true)"><i class="ph-duotone ph-palette"></i>Appearance</button>'
    +'<button onclick="Auth.logout()"><i class="ph-duotone ph-sign-out"></i>Log out</button>'
    +'</div>';
  },
  appearance:function(){
    return '<div class="appearance-overlay" id="appearanceOverlay" onclick="if(event.target===this&&Date.now()-_appOpenT>350)toggleAppearance(false)">'
    +'<div class="appearance-modal" role="dialog" aria-modal="true" aria-label="Select Mode">'
    +'<div class="appearance-head"><h3>Select Mode</h3><button onclick="toggleAppearance(false)" aria-label="Close"><i class="ph-bold ph-x"></i></button></div>'
    +'<div class="appearance-section"><h4>Mode</h4><div class="mode-buttons"><button class="mode-btn" data-theme="light" onclick="setTheme(\'light\')">Light</button><button class="mode-btn" data-theme="dark" onclick="setTheme(\'dark\')">Dark</button></div></div>'
    +'<div class="appearance-section"><h4>Solid Color</h4><div class="color-swatches" id="solidSwatches"></div></div>'
    +'<div class="appearance-section"><h4>Gradient Color</h4><div class="color-swatches" id="gradSwatches"></div></div>'
    +'<div class="appearance-section"><h4>Custom Color</h4><div class="custom-color-row"><input type="color" id="customAccent" value="#2970a3" oninput="setCustomColor(this.value)"><span id="customAccentVal">#2970a3</span></div></div>'
    +'</div></div>';
  },
  footer:function(){
    return '<footer class="site-footer"><div class="f-brand"><span class="brand-text" style="font-size:18px">FRAME</span><p>A premium community for developers and creators.</p></div>'
    +'<div class="f-links"><a href="forums.html">Forums</a><a href="members.html">Members</a><a href="help.html">Help</a><a href="search.html">Search</a></div>'
    +'<div class="f-copy">© 2026 FRAME Community</div></footer>';
  },
  mount:function(active){
    document.getElementById('chrome-header').innerHTML=Chrome.header();
    document.getElementById('chrome-nav').innerHTML=Chrome.nav(active||'home');
    var sh=document.getElementById('chrome-sheet');if(sh)sh.innerHTML=Chrome.sheet();
    var ap=document.getElementById('chrome-appearance');if(ap)ap.innerHTML=Chrome.appearance();
    var ft=document.getElementById('chrome-footer');if(ft)ft.innerHTML=Chrome.footer();
    buildSwatches();markActiveTheme();markActiveSwatch();
  }
};

/* ---------- theme (shared) ---------- */
var themeKey='user_preferred_theme',colorKey='user_preferred_style';
function applyTheme(){try{var t=localStorage.getItem(themeKey)||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}try{var c=localStorage.getItem(colorKey);if(c)applyStyle(c);}catch(e){}}
function setTheme(t){document.documentElement.setAttribute('data-theme',t);try{localStorage.setItem(themeKey,t);}catch(e){}markActiveTheme();}
function applyStyle(style){var h=document.documentElement;if(style.indexOf('linear-gradient')===0){var m=style.match(/#([0-9a-f]{6}|[0-9a-f]{3})/i);h.style.setProperty('--keycolor',m?m[0]:'#2970a3');h.style.setProperty('--key-background',style);}else{h.style.setProperty('--keycolor',style);h.style.setProperty('--key-background',style);}markActiveSwatch();}
function setSolidColor(c){try{localStorage.setItem(colorKey,c);}catch(e){}applyStyle(c);}
function setGradient(g){try{localStorage.setItem(colorKey,g);}catch(e){}applyStyle(g);}
function setCustomColor(c){try{localStorage.setItem(colorKey,c);}catch(e){}applyStyle(c);var v=document.getElementById('customAccentVal');if(v)v.textContent=c;}
function markActiveTheme(){var t=document.documentElement.getAttribute('data-theme')||'dark';document.querySelectorAll('.mode-btn').forEach(function(b){b.classList.toggle('active',b.dataset.theme===t);});}
function markActiveSwatch(){var s=null;try{s=localStorage.getItem(colorKey);}catch(e){}document.querySelectorAll('.color-swatch').forEach(function(b){var v=b.dataset.color||b.dataset.gradient||'';b.classList.toggle('active',!!s&&v.toLowerCase()===String(s).toLowerCase());});if(!s){var d=document.querySelector('.color-swatch[data-color="#2970a3"]');if(d)d.classList.add('active');}}
function buildSwatches(){var solids=['#2970a3','#5ca5d6','#d9534f','#ff0000','#f52727','#5cb85c','#46bfbd','#9966cc','#e84393','#fd7e14','#20c997','#6c757d'];var grads=['linear-gradient(45deg,#2970a3,#5ca5d6)','linear-gradient(45deg,#ff5f6d,#ffc371)','linear-gradient(45deg,#2948ff,#1cffab)','linear-gradient(45deg,#8e2de2,#4a00e0)','linear-gradient(45deg,#f7971e,#ffd200)','linear-gradient(45deg,#11998e,#38ef7d)','linear-gradient(45deg,#fc4a1a,#f7b733)','linear-gradient(45deg,#4b6cb7,#182848)','linear-gradient(45deg,#c94b4b,#4b134f)','linear-gradient(45deg,#00c9ff,#92fe9d)','linear-gradient(45deg,#f857a6,#ff5858)','linear-gradient(45deg,#7f7fd5,#86a8e7)'];var a=document.getElementById('solidSwatches'),b=document.getElementById('gradSwatches');if(a)a.innerHTML=solids.map(function(c){return '<button class="color-swatch" data-color="'+c+'" style="background:'+c+'" onclick="setSolidColor(this.dataset.color)" aria-label="'+c+'"></button>';}).join('');if(b)b.innerHTML=grads.map(function(g){return '<button class="color-swatch gradient" data-gradient="'+g+'" style="background:'+g+'" onclick="setGradient(this.dataset.gradient)" aria-label="gradient"></button>';}).join('');}
var _appOpenT=0;
function toggleAppearance(show){document.getElementById('appearanceOverlay').classList.toggle('show',!!show);if(show){_appOpenT=Date.now();toggleSheet(false);markActiveTheme();markActiveSwatch();}}
function toggleSheet(show){var m=document.getElementById('moreSheet'),o=document.getElementById('sheetOverlay');if(m)m.classList.toggle('show',!!show);if(o)o.classList.toggle('show',!!show);}
function goCreate(){if(!Auth.me()){location.href='login.html?next=new-thread.html';return;}location.href='new-thread.html';}
function like(btn,pid){var liked=btn.classList.toggle('liked');var ic=btn.querySelector('i'),ct=btn.querySelector('span');if(ic)ic.className=liked?'ph-fill ph-heart':'ph ph-heart';if(ct){var n=parseInt(ct.textContent)||0;ct.textContent=n+(liked?1:-1);}if(pid){var d=DB.get();var p=d.posts.find(function(x){return x.id===pid;});if(p){p.likes=Math.max(0,p.likes+(liked?1:-1));DB.set(d);}}}

/* expose */
window.DB=DB;window.Auth=Auth;window.Chrome=Chrome;window.esc=esc;window.timeAgo=timeAgo;window.uid=uid;
window.badgeHTML=badgeHTML;window.statusBadge=statusBadge;window.roleLabel=roleLabel;window.toast=toast;
window.requireLogin=requireLogin;window.requireRole=requireRole;window.threadReplies=threadReplies;window.forumOf=forumOf;
window.applyTheme=applyTheme;window.setTheme=setTheme;window.setSolidColor=setSolidColor;window.setGradient=setGradient;
window.setCustomColor=setCustomColor;window.markActiveTheme=markActiveTheme;window.markActiveSwatch=markActiveSwatch;
window.toggleAppearance=toggleAppearance;window.toggleSheet=toggleSheet;window.goCreate=goCreate;window.like=like;
})();

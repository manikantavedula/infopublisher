"use strict";(self.webpackChunkinfopublishers=self.webpackChunkinfopublishers||[]).push([[495],{7035:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(2791),o=n(2007),r=n.n(o),a=n(4554);const s=(0,n(6934).ZP)(a.Z)((e=>{let{theme:t,ownerState:n}=e;const{palette:i,functions:o,borders:r,boxShadows:a}=t,{variant:s,bgColor:l,color:c,opacity:d,borderRadius:f,shadow:h,coloredShadow:u}=n,{gradients:m,grey:g,white:p}=i||{},{linearGradient:b}=o||{},{borderRadius:x}=r||{},{colored:y}=a||{},S={"grey-100":g[100],"grey-200":g[200],"grey-300":g[300],"grey-400":g[400],"grey-500":g[500],"grey-600":g[600],"grey-700":g[700],"grey-800":g[800],"grey-900":g[900]},k=["transparent","white","black","primary","secondary","info","success","warning","error","light","dark","text","grey-100","grey-200","grey-300","grey-400","grey-500","grey-600","grey-700","grey-800","grey-900"];let w=l;w="gradient"===s?["primary","secondary","info","success","warning","error","dark","light"].find((e=>e===l))?b(m[l].main,m[l].state):p.main:k.find((e=>e===l))?i[l]?i[l].main:S[l]:l;let Z=c;k.find((e=>e===c))&&(Z=i[c]?i[c].main:S[c]);let z=f;["xs","sm","md","lg","xl","xxl","section"].find((e=>e===f))&&(z=x[f]);let v="none";return["xs","sm","md","lg","xl","xxl","inset"].find((e=>e===h))?v=a[h]:u&&(v=y[u]?y[u]:"none"),{opacity:d,background:w,color:Z,borderRadius:z,boxShadow:v}}));var l=n(184);const c=(0,i.forwardRef)(((e,t)=>{let{variant:n,bgColor:i,color:o,opacity:r,borderRadius:a,shadow:c,coloredShadow:d,...f}=e;return(0,l.jsx)(s,{...f,ref:t,ownerState:{variant:n,bgColor:i,color:o,opacity:r,borderRadius:a,shadow:c,coloredShadow:d}})}));c.defaultProps={variant:"contained",bgColor:"transparent",color:"dark",opacity:1,borderRadius:"none",shadow:"none",coloredShadow:"none"},c.propTypes={variant:r().oneOf(["contained","gradient"]),bgColor:r().string,color:r().string,opacity:r().number,borderRadius:r().string,shadow:r().string,coloredShadow:r().oneOf(["primary","secondary","info","success","warning","error","light","dark","none"])};const d=c},2916:(e,t,n)=>{n.d(t,{Z:()=>c});var i=n(2791),o=n(890);const r=(0,n(6934).ZP)(o.Z)((e=>{let{theme:t,ownerState:n}=e;const{palette:i,typography:o,functions:r}=t,{color:a,textTransform:s,verticalAlign:l,fontWeight:c,opacity:d,textGradient:f,darkMode:h}=n,{gradients:u,transparent:m,white:g}=i,{fontWeightLight:p,fontWeightRegular:b,fontWeightMedium:x,fontWeightBold:y}=o,{linearGradient:S}=r,k={light:p,regular:b,medium:x,bold:y};let w="inherit"!==a&&i[a]?i[a].main:"inherit";return!h||"inherit"!==a&&i[a]?h&&"dark"===a&&(w=g.main):w="inherit",{opacity:d,textTransform:s,verticalAlign:l,textDecoration:"none",color:w,fontWeight:k[c]&&k[c],...f&&{backgroundImage:"inherit"!==a&&"text"!==a&&"white"!==a&&u[a]?S(u[a].main,u[a].state):S(u.dark.main,u.dark.state),display:"inline-block",WebkitBackgroundClip:"text",WebkitTextFillColor:m.main,position:"relative",zIndex:1}}}));var a=n(9373),s=n(184);const l=(0,i.forwardRef)(((e,t)=>{let{color:n,fontWeight:i,textTransform:o,verticalAlign:l,textGradient:c,opacity:d,children:f,...h}=e;const[u]=(0,a.Ad)(),{darkMode:m}=u;return(0,s.jsx)(r,{...h,ref:t,ownerState:{color:n,textTransform:o,verticalAlign:l,fontWeight:i,opacity:d,textGradient:c,darkMode:m},children:f})}));l.defaultProps={color:"dark",fontWeight:!1,textTransform:"none",verticalAlign:"unset",textGradient:!1,opacity:1};const c=l},6259:(e,t,n)=>{var i=n(3060),o=n(7035),r=n(2916);const a={background:{default:"#f0f2f5"},text:{main:"#7b809a",focus:"#7b809a"},transparent:{main:"transparent"},white:{main:"#ffffff",focus:"#ffffff"},black:{light:"#000000",main:"#000000",focus:"#000000"},primary:{main:"#e91e63",focus:"#e91e63"},secondary:{main:"#7b809a",focus:"#8f93a9"},info:{main:"#1A73E8",focus:"#1662C4"},success:{main:"#4CAF50",focus:"#67bb6a"},warning:{main:"#fb8c00",focus:"#fc9d26"},error:{main:"#F44335",focus:"#f65f53"},light:{main:"#f0f2f5",focus:"#f0f2f5"},dark:{main:"#344767",focus:"#2c3c58"},grey:{100:"#f8f9fa",200:"#f0f2f5",300:"#dee2e6",400:"#ced4da",500:"#adb5bd",600:"#6c757d",700:"#495057",800:"#343a40",900:"#212529"},gradients:{primary:{main:"#EC407A",state:"#D81B60"},secondary:{main:"#747b8a",state:"#495361"},info:{main:"#49a3f1",state:"#1A73E8"},success:{main:"#66BB6A",state:"#43A047"},warning:{main:"#FFA726",state:"#FB8C00"},error:{main:"#EF5350",state:"#E53935"},light:{main:"#EBEFF4",state:"#CED4DA"},dark:{main:"#42424a",state:"#191919"}},socialMediaColors:{facebook:{main:"#3b5998",dark:"#344e86"},twitter:{main:"#55acee",dark:"#3ea1ec"},instagram:{main:"#125688",dark:"#0e456d"},linkedin:{main:"#0077b5",dark:"#00669c"},pinterest:{main:"#cc2127",dark:"#b21d22"},youtube:{main:"#e52d27",dark:"#d41f1a"},vimeo:{main:"#1ab7ea",dark:"#13a3d2"},slack:{main:"#3aaf85",dark:"#329874"},dribbble:{main:"#ea4c89",dark:"#e73177"},github:{main:"#24292e",dark:"#171a1d"},reddit:{main:"#ff4500",dark:"#e03d00"},tumblr:{main:"#35465c",dark:"#2a3749"}},badgeColors:{primary:{background:"#f8b3ca",text:"#cc084b"},secondary:{background:"#d7d9e1",text:"#6c757d"},info:{background:"#aecef7",text:"#095bc6"},success:{background:"#bce2be",text:"#339537"},warning:{background:"#ffd59f",text:"#c87000"},error:{background:"#fcd3d0",text:"#f61200"},light:{background:"#ffffff",text:"#c7d3de"},dark:{background:"#8097bf",text:"#1e2e4a"}},coloredShadows:{primary:"#e91e62",secondary:"#110e0e",info:"#00bbd4",success:"#4caf4f",warning:"#ff9900",error:"#f44336",light:"#adb5bd",dark:"#404040"},inputBorderColor:"#d2d6da",tabs:{indicator:{boxShadow:"#ddd"}}};const s=function(e){return"".concat(e/(arguments.length>1&&void 0!==arguments[1]?arguments[1]:16),"rem")},{dark:l}=a,c={fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',fontWeightLighter:100,fontWeightLight:300,fontWeightRegular:400,fontWeightMedium:600,fontWeightBold:700,fontSizeXXS:s(10.4),fontSizeXS:s(12),fontSizeSM:s(14),fontSizeMD:s(16),fontSizeLG:s(18),fontSizeXL:s(20),fontSize2XL:s(24),fontSize3XL:s(30)},d={fontFamily:c.fontFamily,color:l.main,fontWeight:c.fontWeightBold},f={fontFamily:c.fontFamily,color:l.main,fontWeight:c.fontWeightLight,lineHeight:1.2},h={fontFamily:c.fontFamily,fontWeightLighter:c.fontWeightLighter,fontWeightLight:c.fontWeightLight,fontWeightRegular:c.fontWeightRegular,fontWeightMedium:c.fontWeightMedium,fontWeightBold:c.fontWeightBold,h1:{fontSize:s(48),lineHeight:1.25,...d},h2:{fontSize:s(36),lineHeight:1.3,...d},h3:{fontSize:s(30),lineHeight:1.375,...d},h4:{fontSize:s(24),lineHeight:1.375,...d},h5:{fontSize:s(20),lineHeight:1.375,...d},h6:{fontSize:s(16),lineHeight:1.625,...d},subtitle1:{fontFamily:c.fontFamily,fontSize:c.fontSizeXL,fontWeight:c.fontWeightLight,lineHeight:1.625},subtitle2:{fontFamily:c.fontFamily,fontSize:c.fontSizeMD,fontWeight:c.fontWeightLight,lineHeight:1.6},body1:{fontFamily:c.fontFamily,fontSize:c.fontSizeXL,fontWeight:c.fontWeightRegular,lineHeight:1.625},body2:{fontFamily:c.fontFamily,fontSize:c.fontSizeMD,fontWeight:c.fontWeightLight,lineHeight:1.6},button:{fontFamily:c.fontFamily,fontSize:c.fontSizeSM,fontWeight:c.fontWeightLight,lineHeight:1.5,textTransform:"uppercase"},caption:{fontFamily:c.fontFamily,fontSize:c.fontSizeXS,fontWeight:c.fontWeightLight,lineHeight:1.25},overline:{fontFamily:c.fontFamily},d1:{fontSize:s(80),...f},d2:{fontSize:s(72),...f},d3:{fontSize:s(64),...f},d4:{fontSize:s(56),...f},d5:{fontSize:s(48),...f},d6:{fontSize:s(40),...f},size:{xxs:c.fontSizeXXS,xs:c.fontSizeXS,sm:c.fontSizeSM,md:c.fontSizeMD,lg:c.fontSizeLG,xl:c.fontSizeXL,"2xl":c.fontSize2XL,"3xl":c.fontSize3XL},lineHeight:{sm:1.25,md:1.5,lg:2}};var u=n(184);function m(e){let{company:t,links:n}=e;const{href:a,name:s}=t,{size:l}=h;return(0,u.jsxs)(o.Z,{width:"100%",display:"flex",flexDirection:{xs:"column",lg:"row"},justifyContent:"space-between",alignItems:"center",px:1.5,children:[(0,u.jsxs)(o.Z,{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap",color:"text",fontSize:l.sm,px:1.5,children:["Copyright \xa9 ",(new Date).getFullYear(),(0,u.jsx)(i.Z,{href:a,target:"_blank",children:(0,u.jsxs)(r.Z,{variant:"button",fontWeight:"medium",children:["\xa0",s,".\xa0"]})}),"All Rights Reserved."]}),(0,u.jsx)(o.Z,{component:"ul",sx:e=>{let{breakpoints:t}=e;return{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",listStyle:"none",mt:3,mb:0,p:0,[t.up("lg")]:{mt:0}}},children:n.map((e=>(0,u.jsx)(o.Z,{component:"li",px:2,lineHeight:1,children:(0,u.jsx)(i.Z,{href:e.href,target:"_blank",children:(0,u.jsx)(r.Z,{variant:"button",fontWeight:"regular",color:"text",children:e.name})})},e.name)))})]})}m.defaultProps={company:{href:"https://app.infopublisher.in/",name:"Infopublishers"},links:[{href:"https://app.infopublisher.in/",name:"Infopublishers"},{href:"https://app.infopublisher.in/presentation",name:"About Us"},{href:"https://app.infopublisher.in/blog",name:"Blog"},{href:"https://app.infopublisher.in/license",name:"License"}]}},8377:(e,t,n)=>{n(2791),n(7035),n(9373),n(184)},8755:(e,t,n)=>{var i=n(2791),o=n(6871),r=n(3504),a=n(4395),s=n(4663),l=n(3400),c=n(911),d=n(9875),f=n(7035),h=n(3517),u=n(2916),m=n(184);function g(e){let{icon:t,title:n,route:i,light:o}=e;const a=i.slice(0,-1);return(0,m.jsxs)(f.Z,{mr:{xs:0,xl:8},children:[(0,m.jsxs)(h.Z,{sx:{"& .MuiBreadcrumbs-separator":{color:e=>{let{palette:{white:t,grey:n}}=e;return o?t.main:n[600]}}},children:[(0,m.jsx)(r.rU,{to:"/",children:(0,m.jsx)(u.Z,{component:"span",variant:"body2",color:o?"white":"dark",opacity:o?.8:.5,sx:{lineHeight:0},children:(0,m.jsx)(d.Z,{children:t})})}),a.map((e=>(0,m.jsx)(r.rU,{to:"/".concat(e),children:(0,m.jsx)(u.Z,{component:"span",variant:"button",fontWeight:"regular",textTransform:"capitalize",color:o?"white":"dark",opacity:o?.8:.5,sx:{lineHeight:0},children:e})},e))),(0,m.jsx)(u.Z,{variant:"button",fontWeight:"regular",textTransform:"capitalize",color:o?"white":"dark",sx:{lineHeight:0},children:n.replace("-"," ")})]}),(0,m.jsx)(u.Z,{fontWeight:"bold",textTransform:"capitalize",variant:"h6",color:o?"white":"dark",noWrap:!0,children:n.replace("-"," ")})]})}g.defaultProps={light:!1};const p=g;var b=n(2007),x=n.n(b),y=n(3786),S=n(3060);const k=function(e){const{palette:t,borders:n,transitions:i}=e,{secondary:o,light:r,dark:a}=t,{borderRadius:s}=n;return{display:"flex",alignItems:"center",width:"100%",color:o.main,borderRadius:s.md,transition:i.create("background-color",{easing:i.easing.easeInOut,duration:i.duration.standard}),"& *":{transition:"color 100ms linear"},"&:not(:last-child)":{mb:1},"&:hover":{backgroundColor:r.main,"& *":{color:a.main}}}},w=(0,i.forwardRef)(((e,t)=>{let{icon:n,title:i,...o}=e;return(0,m.jsx)(y.Z,{...o,ref:t,sx:e=>k(e),children:(0,m.jsxs)(f.Z,{component:S.Z,py:.5,display:"flex",alignItems:"center",lineHeight:1,children:[(0,m.jsx)(u.Z,{variant:"body1",color:"secondary",lineHeight:.75,children:n}),(0,m.jsx)(u.Z,{variant:"button",fontWeight:"regular",sx:{ml:1},children:i})]})})}));w.propTypes={icon:x().node.isRequired,title:x().string.isRequired};const Z=w;const z=(e,t)=>{let{breakpoints:n}=e,{isMini:i}=t;return{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",[n.up("md")]:{justifyContent:i?"space-between":"stretch",width:i?"100%":"max-content"},[n.up("xl")]:{justifyContent:"stretch !important",width:"max-content !important"}}},v=e=>{let{typography:{size:t},breakpoints:n}=e;return{px:1,"& .material-icons, .material-icons-round":{fontSize:"".concat(t.xl," !important")},"& .MuiTypography-root":{display:"none",[n.up("sm")]:{display:"inline-block",lineHeight:1.2,ml:.5}}}},j=e=>{let{breakpoints:t}=e;return{display:"inline-block",lineHeight:0,[t.up("xl")]:{display:"none"}}};var W=n(9373);function C(e){let{absolute:t,light:n,isMini:h}=e;const[u,g]=(0,i.useState)(),[b,x]=(0,W.Ad)(),{miniSidenav:y,transparentNavbar:S,fixedNavbar:k,openConfigurator:w,darkMode:C}=b,[R,F]=(0,i.useState)(!1),M=(0,o.TH)().pathname.split("/").slice(1);(0,i.useEffect)((()=>{function e(){(0,W.T4)(x,k&&0===window.scrollY||!k)}return g(k?"sticky":"static"),window.addEventListener("scroll",e),e(),()=>window.removeEventListener("scroll",e)}),[x,k]);const L=()=>F(!1),H=e=>{let{palette:{dark:t,white:i,text:o},functions:{rgba:r}}=e;return{color:()=>{let e=n||C?i.main:t.main;return S&&!n&&(e=C?r(o.main,.6):o.main),e}}};return(0,m.jsx)(a.Z,{position:t?"absolute":u,color:"inherit",sx:e=>function(e,t){const{palette:n,boxShadows:i,functions:o,transitions:r,breakpoints:a,borders:s}=e,{transparentNavbar:l,absolute:c,light:d,darkMode:f}=t,{dark:h,white:u,text:m,transparent:g,background:p}=n,{navbarBoxShadow:b}=i,{rgba:x,pxToRem:y}=o,{borderRadius:S}=s;return{boxShadow:l||c?"none":b,backdropFilter:l||c?"none":"saturate(200%) blur(".concat(y(30),")"),backgroundColor:l||c?"".concat(g.main," !important"):x(f?p.default:u.main,.8),color:()=>{let e;return e=d?u.main:l?m.main:h.main,e},top:c?0:y(12),minHeight:y(75),display:"grid",alignItems:"center",borderRadius:S.xl,paddingTop:y(8),paddingBottom:y(8),paddingRight:c?y(8):0,paddingLeft:c?y(16):0,"& > *":{transition:r.create("all",{easing:r.easing.easeInOut,duration:r.duration.standard})},"& .MuiToolbar-root":{display:"flex",justifyContent:"space-between",alignItems:"center",[a.up("sm")]:{minHeight:"auto",padding:"".concat(y(4)," ").concat(y(16))}}}}(e,{transparentNavbar:S,absolute:t,light:n,darkMode:C}),children:(0,m.jsxs)(s.Z,{sx:e=>(e=>{let{breakpoints:t}=e;return{flexDirection:"column",alignItems:"flex-start",justifyContent:"space-between",pt:.5,pb:.5,[t.up("md")]:{flexDirection:"row",alignItems:"center",paddingTop:"0",paddingBottom:"0"}}})(e),children:[(0,m.jsx)(f.Z,{color:"inherit",mb:{xs:1,md:0},sx:e=>z(e,{isMini:h}),children:(0,m.jsx)(p,{icon:"home",title:M[M.length-1],route:M,light:n})}),h?null:(0,m.jsx)(f.Z,{sx:e=>z(e,{isMini:h}),children:(0,m.jsxs)(f.Z,{color:n?"white":"inherit",children:[(0,m.jsx)(r.rU,{to:"/authentication/sign-in/basic",children:(0,m.jsx)(l.Z,{sx:v,size:"small",disableRipple:!0,children:(0,m.jsx)(d.Z,{sx:H,children:"account_circle"})})}),(0,m.jsx)(l.Z,{size:"small",disableRipple:!0,color:"inherit",sx:j,onClick:()=>(0,W.en)(x,!y),children:(0,m.jsx)(d.Z,{sx:H,fontSize:"medium",children:y?"menu_open":"menu"})}),(0,m.jsx)(l.Z,{size:"small",disableRipple:!0,color:"inherit",sx:v,onClick:()=>(0,W.yO)(x,!w),children:(0,m.jsx)(d.Z,{sx:H,children:"settings"})}),(0,m.jsx)(l.Z,{size:"small",disableRipple:!0,color:"inherit",sx:v,"aria-controls":"notification-menu","aria-haspopup":"true",variant:"contained",onClick:e=>F(e.currentTarget),children:(0,m.jsx)(d.Z,{sx:H,children:"notifications"})}),(0,m.jsxs)(c.Z,{anchorEl:R,anchorReference:null,anchorOrigin:{vertical:"bottom",horizontal:"left"},open:Boolean(R),onClose:L,sx:{mt:2},children:[(0,m.jsx)(Z,{icon:(0,m.jsx)(d.Z,{children:"email"}),title:"Check new messages"}),(0,m.jsx)(Z,{icon:(0,m.jsx)(d.Z,{children:"podcasts"}),title:"Manage Podcast sessions"}),(0,m.jsx)(Z,{icon:(0,m.jsx)(d.Z,{children:"shopping_cart"}),title:"Payment successfully completed"})]})]})})]})})}C.defaultProps={absolute:!1,light:!1,isMini:!1}},9875:(e,t,n)=>{n.d(t,{Z:()=>b});var i=n(7462),o=n(3366),r=n(2791),a=n(8182),s=n(865),l=n(6934),c=n(3736),d=n(4036),f=n(9076);function h(e){return(0,f.Z)("MuiIcon",e)}(0,n(9046).Z)("MuiIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var u=n(184);const m=["baseClassName","className","color","component","fontSize"],g=(0,l.ZP)("span",{name:"MuiIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,"inherit"!==n.color&&t["color".concat((0,d.Z)(n.color))],t["fontSize".concat((0,d.Z)(n.fontSize))]]}})((e=>{let{theme:t,ownerState:n}=e;return{userSelect:"none",width:"1em",height:"1em",overflow:"hidden",display:"inline-block",textAlign:"center",flexShrink:0,fontSize:{inherit:"inherit",small:t.typography.pxToRem(20),medium:t.typography.pxToRem(24),large:t.typography.pxToRem(36)}[n.fontSize],color:{primary:t.palette.primary.main,secondary:t.palette.secondary.main,info:t.palette.info.main,success:t.palette.success.main,warning:t.palette.warning.main,action:t.palette.action.active,error:t.palette.error.main,disabled:t.palette.action.disabled,inherit:void 0}[n.color]}})),p=r.forwardRef((function(e,t){const n=(0,c.Z)({props:e,name:"MuiIcon"}),{baseClassName:r="material-icons",className:l,color:f="inherit",component:p="span",fontSize:b="medium"}=n,x=(0,o.Z)(n,m),y=(0,i.Z)({},n,{baseClassName:r,color:f,component:p,fontSize:b}),S=(e=>{const{color:t,fontSize:n,classes:i}=e,o={root:["root","inherit"!==t&&"color".concat((0,d.Z)(t)),"fontSize".concat((0,d.Z)(n))]};return(0,s.Z)(o,h,i)})(y);return(0,u.jsx)(g,(0,i.Z)({as:p,className:(0,a.Z)(r,"notranslate",S.root,l),ownerState:y,"aria-hidden":!0,ref:t},x))}));p.muiName="Icon";const b=p},3060:(e,t,n)=>{n.d(t,{Z:()=>Z});var i=n(3366),o=n(7462),r=n(2791),a=n(8182),s=n(865),l=n(8529),c=n(2065),d=n(4036),f=n(6934),h=n(3736),u=n(8221),m=n(2071),g=n(890),p=n(9076);function b(e){return(0,p.Z)("MuiLink",e)}const x=(0,n(9046).Z)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]);var y=n(184);const S=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant"],k={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},w=(0,f.ZP)(g.Z,{name:"MuiLink",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t["underline".concat((0,d.Z)(n.underline))],"button"===n.component&&t.button]}})((e=>{let{theme:t,ownerState:n}=e;const i=(0,l.DW)(t,"palette.".concat((e=>k[e]||e)(n.color)))||n.color;return(0,o.Z)({},"none"===n.underline&&{textDecoration:"none"},"hover"===n.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===n.underline&&{textDecoration:"underline",textDecorationColor:"inherit"!==i?(0,c.Fq)(i,.4):void 0,"&:hover":{textDecorationColor:"inherit"}},"button"===n.component&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},["&.".concat(x.focusVisible)]:{outline:"auto"}})})),Z=r.forwardRef((function(e,t){const n=(0,h.Z)({props:e,name:"MuiLink"}),{className:l,color:c="primary",component:f="a",onBlur:g,onFocus:p,TypographyClasses:x,underline:k="always",variant:Z="inherit"}=n,z=(0,i.Z)(n,S),{isFocusVisibleRef:v,onBlur:j,onFocus:W,ref:C}=(0,u.Z)(),[R,F]=r.useState(!1),M=(0,m.Z)(t,C),L=(0,o.Z)({},n,{color:c,component:f,focusVisible:R,underline:k,variant:Z}),H=(e=>{const{classes:t,component:n,focusVisible:i,underline:o}=e,r={root:["root","underline".concat((0,d.Z)(o)),"button"===n&&"button",i&&"focusVisible"]};return(0,s.Z)(r,b,t)})(L);return(0,y.jsx)(w,(0,o.Z)({className:(0,a.Z)(H.root,l),classes:x,color:c,component:f,onBlur:e=>{j(e),!1===v.current&&F(!1),g&&g(e)},onFocus:e=>{W(e),!0===v.current&&F(!0),p&&p(e)},ref:M,ownerState:L,variant:Z},z))}))}}]);
//# sourceMappingURL=495.1ccdd87d.chunk.js.map
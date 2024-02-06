"use strict";(self.webpackChunkinfopublishers=self.webpackChunkinfopublishers||[]).push([[35],{9035:(e,s,l)=>{l.r(s),l.d(s,{default:()=>K});var t=l(2791),o=l(1889),n=l(7621),r=(l(9373),l(8550)),i=l(9434),c=l(8001),a=l(1243),d=l(3379),h=l(3239),u=(l(3658),l(1370),l(7035),l(2916),l(184));var p=l(3967),x=l(6934),j=l(9836),m=l(3382),f=l(8745),C=l(618),Z=l(9281),g=l(6890),A=l(5855),y=l(890),b=l(68),w=l(3400),S=l(8956);function v(e){let{name:s}=e;return(0,u.jsx)(y.Z,{display:"block",variant:"h6",fontSize:"16px",fontWeight:400,children:s})}const O=(0,x.ZP)(f.Z)((e=>{let{theme:s}=e;return{["&.".concat(C.Z.head)]:{backgroundColor:"rgb(17, 25, 54)",color:"#fff",padding:"16px"},["&.".concat(C.Z.body)]:{fontSize:14}}})),T=(0,x.ZP)(A.Z)((e=>{let{theme:s}=e;return{"&:nth-of-type(odd)":{backgroundColor:s.palette.action.hover},"&:last-child td, &:last-child th":{border:0}}}));function E(e){let{filtereddata:s,onOpenEditModal:l,onOpenDeleteModal:o}=e;const[n,r]=(0,t.useState)([]),[i]=(0,t.useState)([{Header:"s.no",accessor:"sno",align:"left"},{Header:"series",accessor:"series",align:"left"},{Header:"action",accessor:"action",align:"center"}]);return(0,t.useEffect)((()=>{console.log(n)}),[n]),(0,t.useEffect)((()=>{let e=[];console.log(s),s&&null!==s&&(e=s.map(((e,s)=>({sno:(0,u.jsx)(y.Z,{color:"text",variant:"h6",fontSize:"16px",fontWeight:400,children:s+1}),series:(0,u.jsx)(v,{name:"".concat(e.name)}),action:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(b.Z,{title:"Edit",placement:"top",children:(0,u.jsx)(w.Z,{color:"primary",type:"button",onClick:()=>l(e),children:(0,u.jsx)(S.D9l,{size:"24px"})})}),(0,u.jsx)(b.Z,{title:"Delete",placement:"top",children:(0,u.jsx)(w.Z,{color:"primary",type:"button",onClick:()=>o(e),children:(0,u.jsx)(S.IT9,{size:"24px"})})})]})})))),r(e)}),[s]),(0,u.jsx)(Z.Z,{children:(0,u.jsxs)(j.Z,{sx:{minWidth:700,boxShadow:"none"},size:"small","aria-label":"customized table",children:[(0,u.jsx)(g.Z,{children:(0,u.jsxs)(A.Z,{children:[(0,u.jsx)(O,{align:"left",children:"S.No"}),(0,u.jsx)(O,{align:"left",children:"Series"}),(0,u.jsx)(O,{align:"center",children:"Action"})]})}),(0,u.jsx)(m.Z,{children:n&&n.map((e=>(0,u.jsxs)(T,{children:[(0,u.jsx)(O,{component:"th",scope:"row",align:i[0].align,children:e.sno}),(0,u.jsx)(O,{align:i[1].align,children:e.series}),(0,u.jsx)(O,{align:i[2].align,children:e.action})]},e.series)))})]})})}var z=l(6151),P=l(5289),D=l(7123),k=l(9157),M=l(5661),I=l(4554),H=l(9012),W=l(6739),q=l(2506),R=l(1724);const V=R.Ry().shape({series:R.Z_().required("Series is required")});function L(e){let{isOpen:s,onClose:l,onCloseEmpty:t}=e;return(0,u.jsxs)(P.Z,{open:s,fullWidth:!0,children:[(0,u.jsx)(M.Z,{className:"flex justify-content-between",children:(0,u.jsxs)(I.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,u.jsx)(I.Z,{padding:"8px",fontSize:18,children:"Add Series"}),(0,u.jsx)(w.Z,{onClick:t,children:(0,u.jsx)(W.Z,{})})]})}),(0,u.jsx)(q.J9,{initialValues:{series:""},validationSchema:V,onSubmit:e=>{console.log(e),l(e)},children:e=>{let{handleSubmit:s,errors:l,touched:t,setFieldValue:o}=e;return(0,u.jsxs)(q.l0,{onSubmit:s,children:[(0,u.jsx)(k.Z,{children:(0,u.jsx)(H.Z,{row:!0,style:{display:"flex",flexDirection:"column"},children:(0,u.jsx)(r.Z,{name:"series",label:"Series",variant:"outlined",error:t.series&&Boolean(l.series),helperText:t.series&&l.series,onChange:e=>{o("series",e.target.value)},focused:!0})})}),(0,u.jsx)(D.Z,{children:(0,u.jsx)(z.Z,{type:"submit",color:"primary",children:"Submit"})})]})}})]})}const N=R.Ry().shape({series:R.Z_().required("Series is required")});function F(e){let{isOpen:s,onClose:l,onCloseEmpty:t,editModalData:o}=e;const{name:n}=o,i={series:n};return(0,u.jsxs)(P.Z,{open:s,fullWidth:!0,children:[(0,u.jsx)(M.Z,{className:"flex justify-content-between",children:(0,u.jsxs)(I.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,u.jsx)(I.Z,{padding:"8px",fontSize:18,children:"Edit Series"}),(0,u.jsx)(w.Z,{onClick:t,children:(0,u.jsx)(W.Z,{})})]})}),(0,u.jsx)(q.J9,{initialValues:i,validationSchema:N,onSubmit:e=>{console.log(e),l(e)},children:e=>{let{values:s,handleSubmit:l,errors:t,touched:o,setFieldValue:n}=e;return(0,u.jsxs)(q.l0,{onSubmit:l,children:[(0,u.jsx)(k.Z,{children:(0,u.jsx)(H.Z,{row:!0,style:{display:"flex",flexDirection:"column"},children:(0,u.jsx)(r.Z,{name:"series",label:"Series",variant:"outlined",error:o.series&&Boolean(t.series),helperText:o.series&&t.series,defaultValue:s.series,onChange:e=>{n("series",e.target.value)},focused:!0})})}),(0,u.jsx)(D.Z,{children:(0,u.jsx)(z.Z,{type:"submit",color:"primary",children:"Submit"})})]})}})]})}const B=R.Ry().shape({series:R.Z_().required("Series is required")});function G(e){let{isOpen:s,onClose:l,onCloseEmpty:t,editModalData:o}=e;const{name:n}=o,i={series:n};return(0,u.jsxs)(P.Z,{open:s,fullWidth:!0,children:[(0,u.jsx)(M.Z,{className:"flex justify-content-between",children:(0,u.jsxs)(I.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,u.jsx)(I.Z,{padding:"8px",fontSize:18,children:"Confirm Delete"}),(0,u.jsx)(w.Z,{onClick:t,children:(0,u.jsx)(W.Z,{})})]})}),(0,u.jsx)(q.J9,{initialValues:i,validationSchema:B,onSubmit:e=>{console.log(e),l(e)},children:e=>{let{values:s,handleSubmit:l,errors:t,touched:o}=e;return(0,u.jsxs)(q.l0,{onSubmit:l,children:[(0,u.jsx)(k.Z,{children:(0,u.jsx)(H.Z,{row:!0,style:{display:"flex",flexDirection:"column"},children:(0,u.jsx)(r.Z,{name:"series",label:"Series",variant:"outlined",error:o.series&&Boolean(t.series),helperText:o.series&&t.series,defaultValue:s.series,disabled:!0})})}),(0,u.jsx)(D.Z,{children:(0,u.jsx)(z.Z,{type:"submit",color:"primary",children:"Delete"})})]})}})]})}var J=l(9504),U=l(4721),X=l(1979),_=l(1701);(0,X.Z)({palette:{primary:{main:"#673ab7"},secondary:{main:"rgb(33, 150, 243)"}}});const K=function(){console.log("In Series");const e=(0,p.Z)(),[s,l]=(0,t.useState)(!1),[x,j]=(0,t.useState)(!1),[m,f]=(0,t.useState)(""),[C,Z]=(0,t.useState)({}),[g,A]=(0,t.useState)(""),[v,O]=(0,t.useState)(!1),T=(0,i.I0)();(0,t.useLayoutEffect)((()=>{T(c.v.getAll())}),[]);const z=(0,i.v9)((e=>e.series.data)),P=(0,t.useMemo)((()=>{if(console.log(g),""===g.trim())return z;return z.filter((e=>e.name.toLowerCase().includes(g.trim().toLowerCase())))}),[g,z]),D=t.useRef(null),k=()=>{l(!1),f(""),Z({})},M=(0,t.useCallback)((e=>{var s;console.log(e.target.value,D,D.current),null===(s=D.current)||void 0===s||s.focus(),A(e.target.value)}));return(0,u.jsxs)(_.Z,{theme:e,children:[(0,u.jsx)(d.Z,{sx:{color:"#fff",zIndex:e=>e.zIndex.drawer+1},open:x,children:(0,u.jsx)(h.Z,{color:"inherit"})}),s&&"add"===m?(0,u.jsx)(L,{isOpen:s,onClose:async e=>{j(!0),console.log(e);try{const s=await a.Z.post("".concat("http://127.0.0.1:5000","/series/submit-form"),{...e},{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"https://app.infopublisher.in","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS","Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type","Access-Control-Allow-Credentials":"true"}});console.log(s.data),l(!1),f(""),T(c.v.getAll()),j(!1)}catch(s){j(!1),console.error(s)}},onCloseEmpty:k}):null,s&&"edit"===m?(0,u.jsx)(F,{isOpen:s,onClose:async e=>{j(!0),console.log(e,C);try{const s=await a.Z.post("".concat("http://127.0.0.1:5000","/series/submit-edit-form"),{...C,...e},{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"https://app.infopublisher.in","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS","Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type","Access-Control-Allow-Credentials":"true"}});console.log(s.data),l(!1),f(""),Z({}),T(c.v.getAll()),j(!1)}catch(s){j(!1),console.error(s)}},onCloseEmpty:k,editModalData:C}):null,s&&"delete"===m?(0,u.jsx)(G,{isOpen:s,onClose:async e=>{j(!0),console.log(e,C);try{const s=await a.Z.post("".concat("http://127.0.0.1:5000","/series/submit-delete-form"),{...C,...e},{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"https://app.infopublisher.in","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS","Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type","Access-Control-Allow-Credentials":"true"}});console.log(s.data),l(!1),f(""),Z({}),T(c.v.getAll()),j(!1)}catch(s){j(!1),console.error(s)}},onCloseEmpty:k,editModalData:C}):null,(0,u.jsx)(o.ZP,{children:(0,u.jsxs)(n.Z,{sx:{boxShadow:"none"},children:[(0,u.jsx)(J.Z,{children:(0,u.jsxs)(o.ZP,{variant:"gradient",bgcolor:"info",borderRadius:"lg",display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,u.jsx)(y.Z,{variant:"h3",fontWeight:500,color:"primary",children:"Series List"}),(0,u.jsxs)(o.ZP,{size:"small",component:"form",sx:{p:"2px 0px",display:"flex",alignItems:"center"},children:[v?(0,u.jsx)(r.Z,{sx:{ml:1,flex:1},size:"small",placeholder:"Search this table...",inputProps:{"aria-label":"search this table..."},autoFocus:!0,value:g,onChange:M,variant:"standard",label:"Search"}):null,(0,u.jsx)(b.Z,{title:"Search...",placement:"top",children:(0,u.jsx)(w.Z,{color:"primary",type:"button","aria-label":"search",onClick:()=>{O((e=>!e))},children:(0,u.jsx)(S.jVj,{size:"24px"})})}),(0,u.jsx)(b.Z,{title:"Add Series",placement:"top",children:(0,u.jsx)(w.Z,{color:"secondary","aria-label":"delete",onClick:()=>{l(!0),f("add")},children:(0,u.jsx)(S.SC9,{size:"27px"})})})]})]})}),(0,u.jsx)(U.Z,{}),(0,u.jsx)(E,{filtereddata:P,onOpenEditModal:e=>{l(!0),f("edit"),Z(e)},onOpenDeleteModal:e=>{l(!0),f("delete"),Z(e)}})]})})]})}}}]);
//# sourceMappingURL=35.a44446cc.chunk.js.map
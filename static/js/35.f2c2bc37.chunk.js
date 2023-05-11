"use strict";(self.webpackChunkinfopublishers=self.webpackChunkinfopublishers||[]).push([[35],{7035:function(e,n,r){r.d(n,{Z:function(){return p}});var t=r(1413),o=r(5987),i=r(2791),a=r(2007),l=r.n(a),s=r(4554),c=(0,r(6934).ZP)(s.Z)((function(e){var n=e.theme,r=e.ownerState,t=n.palette,o=n.functions,i=n.borders,a=n.boxShadows,l=r.variant,s=r.bgColor,c=r.color,d=r.opacity,u=r.borderRadius,h=r.shadow,p=r.coloredShadow,g=t||{},f=g.gradients,x=g.grey,m=g.white,v=(o||{}).linearGradient,Z=(i||{}).borderRadius,b=(a||{}).colored,y={"grey-100":x[100],"grey-200":x[200],"grey-300":x[300],"grey-400":x[400],"grey-500":x[500],"grey-600":x[600],"grey-700":x[700],"grey-800":x[800],"grey-900":x[900]},w=["transparent","white","black","primary","secondary","info","success","warning","error","light","dark","text","grey-100","grey-200","grey-300","grey-400","grey-500","grey-600","grey-700","grey-800","grey-900"],j=s;j="gradient"===l?["primary","secondary","info","success","warning","error","dark","light"].find((function(e){return e===s}))?v(f[s].main,f[s].state):m.main:w.find((function(e){return e===s}))?t[s]?t[s].main:y[s]:s;var C=c;w.find((function(e){return e===c}))&&(C=t[c]?t[c].main:y[c]);var S=u;["xs","sm","md","lg","xl","xxl","section"].find((function(e){return e===u}))&&(S=Z[u]);var k="none";return["xs","sm","md","lg","xl","xxl","inset"].find((function(e){return e===h}))?k=a[h]:p&&(k=b[p]?b[p]:"none"),{opacity:d,background:j,color:C,borderRadius:S,boxShadow:k}})),d=r(184),u=["variant","bgColor","color","opacity","borderRadius","shadow","coloredShadow"],h=(0,i.forwardRef)((function(e,n){var r=e.variant,i=e.bgColor,a=e.color,l=e.opacity,s=e.borderRadius,h=e.shadow,p=e.coloredShadow,g=(0,o.Z)(e,u);return(0,d.jsx)(c,(0,t.Z)((0,t.Z)({},g),{},{ref:n,ownerState:{variant:r,bgColor:i,color:a,opacity:l,borderRadius:s,shadow:h,coloredShadow:p}}))}));h.defaultProps={variant:"contained",bgColor:"transparent",color:"dark",opacity:1,borderRadius:"none",shadow:"none",coloredShadow:"none"},h.propTypes={variant:l().oneOf(["contained","gradient"]),bgColor:l().string,color:l().string,opacity:l().number,borderRadius:l().string,shadow:l().string,coloredShadow:l().oneOf(["primary","secondary","info","success","warning","error","light","dark","none"])};var p=h},1370:function(e,n,r){r.d(n,{Z:function(){return p}});var t=r(1413),o=r(9439),i=r(5987),a=r(2791),l=r(4518),s=(0,r(6934).ZP)(l.Z)((function(e){var n=e.theme,r=e.ownerState,o=n.palette,i=n.functions,a=n.borders,l=n.boxShadows,s=r.color,c=r.variant,d=r.size,u=r.circular,h=r.iconOnly,p=r.darkMode,g=o.white,f=o.text,x=o.transparent,m=o.gradients,v=o.grey,Z=i.boxShadow,b=i.linearGradient,y=i.pxToRem,w=i.rgba,j=a.borderRadius,C=l.colored;return(0,t.Z)((0,t.Z)((0,t.Z)((0,t.Z)((0,t.Z)((0,t.Z)({},"contained"===c&&function(){var e=o[s]?o[s].main:g.main,n=o[s]?o[s].focus:g.focus,r=C[s]?"".concat(Z([0,3],[3,0],o[s].main,.15),", ").concat(Z([0,3],[1,-2],o[s].main,.2),", ").concat(Z([0,1],[5,0],o[s].main,.15)):"none",t=C[s]?"".concat(Z([0,14],[26,-12],o[s].main,.4),", ").concat(Z([0,4],[23,0],o[s].main,.15),", ").concat(Z([0,8],[10,-5],o[s].main,.2)):"none",i=g.main;p||"white"!==s&&"light"!==s&&o[s]?!p||"white"!==s&&"light"!==s&&o[s]||(i=v[600]):i=f.main;var a=g.main;return"white"===s?a=f.main:"primary"!==s&&"error"!==s&&"dark"!==s||(a=g.main),{background:e,color:i,boxShadow:r,"&:hover":{backgroundColor:e,boxShadow:t},"&:focus:not(:hover)":{backgroundColor:n,boxShadow:o[s]?Z([0,0],[0,3.2],o[s].main,.5):Z([0,0],[0,3.2],g.main,.5)},"&:disabled":{backgroundColor:e,color:a}}}()),"outlined"===c&&function(){var e="white"===s?w(g.main,.1):x.main,n=o[s]?o[s].main:g.main,r=o[s]?Z([0,0],[0,3.2],o[s].main,.5):Z([0,0],[0,3.2],g.main,.5),t=o[s]?o[s].main:w(g.main,.75);return"white"===s&&(t=w(g.main,.75)),{background:e,color:n,borderColor:t,"&:hover":{background:x.main,borderColor:n},"&:focus:not(:hover)":{background:x.main,boxShadow:r},"&:active:not(:hover)":{backgroundColor:n,color:g.main,opacity:.85},"&:disabled":{color:n,borderColor:n}}}()),"gradient"===c&&function(){var e="white"!==s&&m[s]?b(m[s].main,m[s].state):g.main,n=C[s]?"".concat(Z([0,3],[3,0],o[s].main,.15),", ").concat(Z([0,3],[1,-2],o[s].main,.2),", ").concat(Z([0,1],[5,0],o[s].main,.15)):"none",r=C[s]?"".concat(Z([0,14],[26,-12],o[s].main,.4),", ").concat(Z([0,4],[23,0],o[s].main,.15),", ").concat(Z([0,8],[10,-5],o[s].main,.2)):"none",t=g.main;return"white"===s?t=f.main:"light"===s&&(t=m.dark.state),{background:e,color:t,boxShadow:n,"&:hover":{boxShadow:r},"&:focus:not(:hover)":{boxShadow:n},"&:disabled":{background:e,color:t}}}()),"text"===c&&function(){var e=o[s]?o[s].main:g.main,n=o[s]?o[s].focus:g.focus;return{color:e,"&:hover":{color:n},"&:focus:not(:hover)":{color:n}}}()),u&&{borderRadius:j.section}),h&&function(){var e=y(38);"small"===d?e=y(25.4):"large"===d&&(e=y(52));var n="".concat(y(11)," ").concat(y(11)," ").concat(y(10));return"small"===d?n=y(4.5):"large"===d&&(n=y(16)),{width:e,minWidth:e,height:e,minHeight:e,padding:n,"& .material-icons":{marginTop:0},"&:hover, &:focus, &:active":{transform:"none"}}}())})),c=r(9373),d=r(184),u=["color","variant","size","circular","iconOnly","children"],h=(0,a.forwardRef)((function(e,n){var r=e.color,a=e.variant,l=e.size,h=e.circular,p=e.iconOnly,g=e.children,f=(0,i.Z)(e,u),x=(0,c.Ad)(),m=(0,o.Z)(x,1)[0].darkMode;return(0,d.jsx)(s,(0,t.Z)((0,t.Z)({},f),{},{ref:n,color:"primary",variant:"gradient"===a?"contained":a,size:l,ownerState:{color:r,variant:a,size:l,circular:h,iconOnly:p,darkMode:m},children:g}))}));h.defaultProps={size:"medium",variant:"contained",color:"white",circular:!1,iconOnly:!1};var p=h},2916:function(e,n,r){r.d(n,{Z:function(){return p}});var t=r(1413),o=r(9439),i=r(5987),a=r(2791),l=r(890),s=(0,r(6934).ZP)(l.Z)((function(e){var n=e.theme,r=e.ownerState,o=n.palette,i=n.typography,a=n.functions,l=r.color,s=r.textTransform,c=r.verticalAlign,d=r.fontWeight,u=r.opacity,h=r.textGradient,p=r.darkMode,g=o.gradients,f=o.transparent,x=o.white,m=i.fontWeightLight,v=i.fontWeightRegular,Z=i.fontWeightMedium,b=i.fontWeightBold,y=a.linearGradient,w={light:m,regular:v,medium:Z,bold:b},j="inherit"!==l&&o[l]?o[l].main:"inherit";return!p||"inherit"!==l&&o[l]?p&&"dark"===l&&(j=x.main):j="inherit",(0,t.Z)({opacity:u,textTransform:s,verticalAlign:c,textDecoration:"none",color:j,fontWeight:w[d]&&w[d]},h&&{backgroundImage:"inherit"!==l&&"text"!==l&&"white"!==l&&g[l]?y(g[l].main,g[l].state):y(g.dark.main,g.dark.state),display:"inline-block",WebkitBackgroundClip:"text",WebkitTextFillColor:f.main,position:"relative",zIndex:1})})),c=r(9373),d=r(184),u=["color","fontWeight","textTransform","verticalAlign","textGradient","opacity","children"],h=(0,a.forwardRef)((function(e,n){var r=e.color,a=e.fontWeight,l=e.textTransform,h=e.verticalAlign,p=e.textGradient,g=e.opacity,f=e.children,x=(0,i.Z)(e,u),m=(0,c.Ad)(),v=(0,o.Z)(m,1)[0].darkMode;return(0,d.jsx)(s,(0,t.Z)((0,t.Z)({},x),{},{ref:n,ownerState:{color:r,textTransform:l,verticalAlign:h,fontWeight:a,opacity:g,textGradient:p,darkMode:v},children:f}))}));h.defaultProps={color:"dark",fontWeight:!1,textTransform:"none",verticalAlign:"unset",textGradient:!1,opacity:1};var p=h},3658:function(e,n,r){r.d(n,{Z:function(){return D}});var t=r(1413),o=r(9439),i=r(2791),a=r(1358),l=r(9836),s=r(3382),c=r(9281),d=r(5855),u=r(9875),h=r(818),p=r(7035),g=r(2916),f=r(5987),x=r(2007),m=r.n(x),v=r(295),Z=r(6934),b=(0,Z.ZP)(v.Z)((function(e){var n=e.theme,r=e.ownerState,o=n.palette,i=n.functions,a=r.error,l=r.success,s=r.disabled,c=o.grey,d=o.transparent,u=o.error,h=o.success,p=i.pxToRem;return(0,t.Z)((0,t.Z)({backgroundColor:s?"".concat(c[200]," !important"):d.main,pointerEvents:s?"none":"auto"},a&&{backgroundImage:"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23F44335' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23F44335' stroke='none'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:"right ".concat(p(12)," center"),backgroundSize:"".concat(p(16)," ").concat(p(16)),"& .Mui-focused":{"& .MuiOutlinedInput-notchedOutline, &:after":{borderColor:u.main}},"& .MuiInputLabel-root.Mui-focused":{color:u.main}}),l&&{backgroundImage:"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:"right ".concat(p(12)," center"),backgroundSize:"".concat(p(16)," ").concat(p(16)),"& .Mui-focused":{"& .MuiOutlinedInput-notchedOutline, &:after":{borderColor:h.main}},"& .MuiInputLabel-root.Mui-focused":{color:h.main}})})),y=r(184),w=["error","success","disabled"],j=(0,i.forwardRef)((function(e,n){var r=e.error,o=e.success,i=e.disabled,a=(0,f.Z)(e,w);return(0,y.jsx)(b,(0,t.Z)((0,t.Z)({},a),{},{ref:n,ownerState:{error:r,success:o,disabled:i}}))}));j.defaultProps={error:!1,success:!1,disabled:!1},j.propTypes={error:m().bool,success:m().bool,disabled:m().bool};var C=j,S=r(1370),k=(0,Z.ZP)(S.Z)((function(e){var n=e.theme,r=e.ownerState,t=n.borders,o=n.functions,i=n.typography,a=n.palette,l=r.variant,s=r.paginationSize,c=r.active,d=t.borderColor,u=o.pxToRem,h=i.fontWeightRegular,p=i.size,g=a.light,f=u(36);return"small"===s?f=u(30):"large"===s&&(f=u(46)),{borderColor:d,margin:"0 ".concat(u(2)),pointerEvents:c?"none":"auto",fontWeight:h,fontSize:p.sm,width:f,minWidth:f,height:f,minHeight:f,"&:hover, &:focus, &:active":{transform:"none",boxShadow:("gradient"!==l||"contained"!==l)&&"none !important",opacity:"1 !important"},"&:hover":{backgroundColor:g.main,borderColor:d}}})),A=["item","variant","color","size","active","children"],z=(0,i.createContext)(),T=(0,i.forwardRef)((function(e,n){var r=e.item,o=e.variant,a=e.color,l=e.size,s=e.active,c=e.children,d=(0,f.Z)(e,A),u=(0,i.useContext)(z),h=u?u.size:null,g=(0,i.useMemo)((function(){return{variant:o,color:a,size:l}}),[o,a,l]);return(0,y.jsx)(z.Provider,{value:g,children:r?(0,y.jsx)(k,(0,t.Z)((0,t.Z)({},d),{},{ref:n,variant:s?u.variant:"outlined",color:s?u.color:"secondary",iconOnly:!0,circular:!0,ownerState:{variant:o,active:s,paginationSize:h},children:c})):(0,y.jsx)(p.Z,{display:"flex",justifyContent:"flex-end",alignItems:"center",sx:{listStyle:"none"},children:c})})}));T.defaultProps={item:!1,variant:"gradient",color:"info",size:"medium",active:!1};var P=T,M=r(9373),R=["width","children","sorted","align"];function O(e){var n=e.width,r=e.children,i=e.sorted,a=e.align,l=(0,f.Z)(e,R),s=(0,M.Ad)(),c=(0,o.Z)(s,1)[0].darkMode;return(0,y.jsx)(p.Z,{component:"th",width:n,py:1.5,px:3,sx:function(e){var n=e.palette.light,r=e.borders.borderWidth;return{borderBottom:"".concat(r[1]," solid ").concat(n.main)}},children:(0,y.jsxs)(p.Z,(0,t.Z)((0,t.Z)({},l),{},{position:"relative",textAlign:a,color:c?"white":"secondary",opacity:.7,sx:function(e){var n=e.typography,r=n.size,t=n.fontWeightBold;return{fontSize:r.xxs,fontWeight:t,textTransform:"uppercase",cursor:i&&"pointer",userSelect:i&&"none"}},children:[r,i&&(0,y.jsxs)(p.Z,{position:"absolute",top:0,right:"right"!==a?"16px":0,left:"right"===a?"-5px":"unset",sx:function(e){return{fontSize:e.typography.size.lg}},children:[(0,y.jsx)(p.Z,{position:"absolute",top:-6,color:"asce"===i?"text":"secondary",opacity:"asce"===i?1:.5,children:(0,y.jsx)(u.Z,{children:"arrow_drop_up"})}),(0,y.jsx)(p.Z,{position:"absolute",top:0,color:"desc"===i?"text":"secondary",opacity:"desc"===i?1:.5,children:(0,y.jsx)(u.Z,{children:"arrow_drop_down"})})]})]}))})}O.defaultProps={width:"auto",sorted:"none",align:"left"};var E=O;function W(e){var n=e.noBorder,r=e.align,t=e.children;return(0,y.jsx)(p.Z,{component:"td",textAlign:r,py:1.5,px:3,sx:function(e){var r=e.palette.light,t=e.typography.size,o=e.borders.borderWidth;return{fontSize:t.sm,borderBottom:n?"none":"".concat(o[1]," solid ").concat(r.main)}},children:(0,y.jsx)(p.Z,{display:"inline-block",width:"max-content",color:"text",sx:{verticalAlign:"middle"},children:t})})}W.defaultProps={noBorder:!1,align:"left"};var H=W;function I(e){var n=e.entriesPerPage,r=e.canSearch,f=e.showTotalEntries,x=e.table,m=e.pagination,v=e.isSorted,Z=e.noEndBorder,b=n.defaultValue?n.defaultValue:10,w=n.entries?n.entries.map((function(e){return e.toString()})):["5","10","15","20","25"],j=(0,i.useMemo)((function(){return x.columns}),[x]),S=(0,i.useMemo)((function(){return x.rows}),[x]),k=(0,a.useTable)({columns:j,data:S,initialState:{pageIndex:0}},a.useGlobalFilter,a.useSortBy,a.usePagination),A=k.getTableProps,z=k.getTableBodyProps,T=k.headerGroups,M=k.prepareRow,R=k.rows,O=k.page,W=k.pageOptions,I=k.canPreviousPage,D=k.canNextPage,B=k.gotoPage,N=k.nextPage,G=k.previousPage,F=k.setPageSize,L=k.setGlobalFilter,q=k.state,V=q.pageIndex,_=q.pageSize,U=q.globalFilter;(0,i.useEffect)((function(){return F(b||10)}),[b]);var J,X=W.map((function(e){return(0,y.jsx)(P,{item:!0,onClick:function(){return B(Number(e))},active:V===e,children:e+1},e)})),$=W.map((function(e){return e+1})),K=(0,i.useState)(U),Q=(0,o.Z)(K,2),Y=Q[0],ee=Q[1],ne=(0,a.useAsyncDebounce)((function(e){L(e||void 0)}),100),re=function(e){return v&&e.isSorted?e.isSortedDesc?"desc":"asce":!!v&&"none"},te=0===V?V+1:V*_+1;return J=0===V?_:V===W.length-1?R.length:_*(V+1),(0,y.jsxs)(c.Z,{sx:{boxShadow:"none"},children:[n||r?(0,y.jsxs)(p.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",p:3,children:[n&&(0,y.jsxs)(p.Z,{display:"flex",alignItems:"center",children:[(0,y.jsx)(h.Z,{disableClearable:!0,value:_.toString(),options:w,onChange:function(e,n){var r;r=parseInt(n,10),F(r)},size:"small",sx:{width:"5rem"},renderInput:function(e){return(0,y.jsx)(C,(0,t.Z)({},e))}}),(0,y.jsx)(g.Z,{variant:"caption",color:"secondary",children:"\xa0\xa0entries per page"})]}),r&&(0,y.jsx)(p.Z,{width:"12rem",ml:"auto",children:(0,y.jsx)(C,{placeholder:"Search...",value:Y,size:"small",fullWidth:!0,onChange:function(e){var n=e.currentTarget;ee(Y),ne(n.value)}})})]}):null,(0,y.jsxs)(l.Z,(0,t.Z)((0,t.Z)({stickyHeader:!0},A()),{},{children:[(0,y.jsx)(p.Z,{component:"thead",children:T.map((function(e){return(0,y.jsx)(d.Z,(0,t.Z)((0,t.Z)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return(0,y.jsx)(E,(0,t.Z)((0,t.Z)({},e.getHeaderProps(v&&e.getSortByToggleProps())),{},{width:e.width?e.width:"auto",align:e.align?e.align:"left",sorted:re(e),children:e.render("Header")}))}))}))}))}),(0,y.jsx)(s.Z,(0,t.Z)((0,t.Z)({},z()),{},{children:O.map((function(e,n){return M(e),(0,y.jsx)(d.Z,(0,t.Z)((0,t.Z)({},e.getRowProps()),{},{children:e.cells.map((function(e){return(0,y.jsx)(H,(0,t.Z)((0,t.Z)({noBorder:Z&&R.length-1===n,align:e.column.align?e.column.align:"left"},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]})),(0,y.jsxs)(p.Z,{display:"flex",flexDirection:{xs:"column",sm:"row"},justifyContent:"space-between",alignItems:{xs:"flex-start",sm:"center"},p:f||1!==W.length?3:0,children:[f&&(0,y.jsx)(p.Z,{mb:{xs:3,sm:0},children:(0,y.jsxs)(g.Z,{variant:"button",color:"secondary",fontWeight:"regular",children:["Showing ",te," to ",J," of ",R.length," entries"]})}),W.length>1&&(0,y.jsxs)(P,{variant:m.variant?m.variant:"gradient",color:m.color?m.color:"info",children:[I&&(0,y.jsx)(P,{item:!0,onClick:function(){return G()},children:(0,y.jsx)(u.Z,{sx:{fontWeight:"bold"},children:"chevron_left"})}),X.length>6?(0,y.jsx)(p.Z,{width:"5rem",mx:1,children:(0,y.jsx)(C,{inputProps:{type:"number",min:1,max:$.length},value:$[V],onChange:function(e){var n=e.target;return B(Number(n.value-1))}})}):X,D&&(0,y.jsx)(P,{item:!0,onClick:function(){return N()},children:(0,y.jsx)(u.Z,{sx:{fontWeight:"bold"},children:"chevron_right"})})]})]})]})}I.defaultProps={entriesPerPage:{defaultValue:10,entries:[5,10,15,20,25]},canSearch:!1,showTotalEntries:!0,pagination:{variant:"gradient",color:"info"},isSorted:!0,noEndBorder:!1};var D=I},9035:function(e,n,r){r.r(n),r.d(n,{default:function(){return ne}});var t=r(4165),o=r(1413),i=r(5861),a=r(9439),l=r(2791),s=r(1889),c=r(7621),d=(r(9373),r(295)),u=r(9434),h=r(8001),p=r(1243),g=r(3379),f=r(3239),x=(r(3658),r(1370),r(7035),r(2916),r(184));var m=r(4942),v=r(6934),Z=r(9836),b=r(3382),y=r(8745),w=r(618),j=r(9281),C=r(6890),S=r(5855),k=r(890),A=r(68),z=r(3400),T=r(8956);function P(e){var n=e.name;return(0,x.jsx)(k.Z,{display:"block",variant:"h6",fontSize:"16px",fontWeight:400,children:n})}var M=(0,v.ZP)(y.Z)((function(e){var n;e.theme;return n={},(0,m.Z)(n,"&.".concat(w.Z.head),{backgroundColor:"rgb(17, 25, 54)",color:"#fff",padding:"16px"}),(0,m.Z)(n,"&.".concat(w.Z.body),{fontSize:14}),n})),R=(0,v.ZP)(S.Z)((function(e){return{"&:nth-of-type(odd)":{backgroundColor:e.theme.palette.action.hover},"&:last-child td, &:last-child th":{border:0}}}));function O(e){var n=e.filtereddata,r=e.onOpenEditModal,t=e.onOpenDeleteModal,o=(0,l.useState)([]),i=(0,a.Z)(o,2),s=i[0],c=i[1],d=(0,l.useState)([{Header:"s.no",accessor:"sno",align:"left"},{Header:"series",accessor:"series",align:"left"},{Header:"action",accessor:"action",align:"center"}]),u=(0,a.Z)(d,1)[0];return(0,l.useEffect)((function(){console.log(s)}),[s]),(0,l.useEffect)((function(){var e=[];console.log(n),n&&null!==n&&(e=n.map((function(e,n){return{sno:(0,x.jsx)(k.Z,{color:"text",variant:"h6",fontSize:"16px",fontWeight:400,children:n+1}),series:(0,x.jsx)(P,{name:"".concat(e.name)}),action:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(A.Z,{title:"Edit",placement:"top",children:(0,x.jsx)(z.Z,{color:"primary",type:"button",onClick:function(){return r(e)},children:(0,x.jsx)(T.D9l,{size:"24px"})})}),(0,x.jsx)(A.Z,{title:"Delete",placement:"top",children:(0,x.jsx)(z.Z,{color:"primary",type:"button",onClick:function(){return t(e)},children:(0,x.jsx)(T.IT9,{size:"24px"})})})]})}}))),c(e)}),[n]),(0,x.jsx)(j.Z,{children:(0,x.jsxs)(Z.Z,{sx:{minWidth:700,boxShadow:"none"},size:"small","aria-label":"customized table",children:[(0,x.jsx)(C.Z,{children:(0,x.jsxs)(S.Z,{children:[(0,x.jsx)(M,{align:"left",children:"S.No"}),(0,x.jsx)(M,{align:"left",children:"Series"}),(0,x.jsx)(M,{align:"center",children:"Action"})]})}),(0,x.jsx)(b.Z,{children:s&&s.map((function(e){return(0,x.jsxs)(R,{children:[(0,x.jsx)(M,{component:"th",scope:"row",align:u[0].align,children:e.sno}),(0,x.jsx)(M,{align:u[1].align,children:e.series}),(0,x.jsx)(M,{align:u[2].align,children:e.action})]},e.series)}))})]})})}var E=r(4518),W=r(5289),H=r(7123),I=r(9157),D=r(5661),B=r(4554),N=r(9012),G=r(6739),F=r(2506),L=r(132),q=L.Ry().shape({series:L.Z_().required("Series is required")});function V(e){var n=e.isOpen,r=e.onClose,t=e.onCloseEmpty;return(0,x.jsxs)(W.Z,{open:n,fullWidth:!0,children:[(0,x.jsx)(D.Z,{className:"flex justify-content-between",children:(0,x.jsxs)(B.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,x.jsx)(B.Z,{padding:"8px",children:"Add Series"}),(0,x.jsx)(z.Z,{onClick:t,children:(0,x.jsx)(G.Z,{})})]})}),(0,x.jsx)(F.J9,{initialValues:{series:""},validationSchema:q,onSubmit:function(e){console.log(e),r(e)},children:function(e){var n=e.handleSubmit,r=e.errors,t=e.touched,o=e.setFieldValue;return(0,x.jsxs)(F.l0,{onSubmit:n,children:[(0,x.jsx)(I.Z,{children:(0,x.jsx)(N.Z,{row:!0,style:{display:"flex",flexDirection:"column"},children:(0,x.jsx)(d.Z,{name:"series",label:"Series",variant:"outlined",error:t.series&&Boolean(r.series),helperText:t.series&&r.series,onChange:function(e){o("series",e.target.value)},focused:!0})})}),(0,x.jsx)(H.Z,{children:(0,x.jsx)(E.Z,{type:"submit",color:"primary",children:"Submit"})})]})}})]})}var _=L.Ry().shape({series:L.Z_().required("Series is required")});function U(e){var n=e.isOpen,r=e.onClose,t=e.onCloseEmpty,o={series:e.editModalData.name};return(0,x.jsxs)(W.Z,{open:n,fullWidth:!0,children:[(0,x.jsx)(D.Z,{className:"flex justify-content-between",children:(0,x.jsxs)(B.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,x.jsx)(B.Z,{padding:"8px",children:"Edit Series"}),(0,x.jsx)(z.Z,{onClick:t,children:(0,x.jsx)(G.Z,{})})]})}),(0,x.jsx)(F.J9,{initialValues:o,validationSchema:_,onSubmit:function(e){console.log(e),r(e)},children:function(e){var n=e.values,r=e.handleSubmit,t=e.errors,o=e.touched,i=e.setFieldValue;return(0,x.jsxs)(F.l0,{onSubmit:r,children:[(0,x.jsx)(I.Z,{children:(0,x.jsx)(N.Z,{row:!0,style:{display:"flex",flexDirection:"column"},children:(0,x.jsx)(d.Z,{name:"series",label:"Series",variant:"outlined",error:o.series&&Boolean(t.series),helperText:o.series&&t.series,defaultValue:n.series,onChange:function(e){i("series",e.target.value)},focused:!0})})}),(0,x.jsx)(H.Z,{children:(0,x.jsx)(E.Z,{type:"submit",color:"primary",children:"Submit"})})]})}})]})}var J=L.Ry().shape({series:L.Z_().required("Series is required")});function X(e){var n=e.isOpen,r=e.onClose,t=e.onCloseEmpty,o={series:e.editModalData.name};return(0,x.jsxs)(W.Z,{open:n,fullWidth:!0,children:[(0,x.jsx)(D.Z,{className:"flex justify-content-between",children:(0,x.jsxs)(B.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,x.jsx)(B.Z,{padding:"8px",children:"Confirm Delete"}),(0,x.jsx)(z.Z,{onClick:t,children:(0,x.jsx)(G.Z,{})})]})}),(0,x.jsx)(F.J9,{initialValues:o,validationSchema:J,onSubmit:function(e){console.log(e),r(e)},children:function(e){var n=e.values,r=e.handleSubmit,t=e.errors,o=e.touched;return(0,x.jsxs)(F.l0,{onSubmit:r,children:[(0,x.jsx)(I.Z,{children:(0,x.jsx)(N.Z,{row:!0,style:{display:"flex",flexDirection:"column"},children:(0,x.jsx)(d.Z,{name:"series",label:"Series",variant:"outlined",error:o.series&&Boolean(t.series),helperText:o.series&&t.series,defaultValue:n.series,disabled:!0})})}),(0,x.jsx)(H.Z,{children:(0,x.jsx)(E.Z,{type:"submit",color:"primary",children:"Delete"})})]})}})]})}var $=r(9504),K=r(4721),Q=r(1979),Y=r(1701),ee=(0,Q.Z)({palette:{primary:{main:"#673ab7"},secondary:{main:"rgb(33, 150, 243)"}}});var ne=function(){var e=(0,l.useState)(!1),n=(0,a.Z)(e,2),r=n[0],m=n[1],v=(0,l.useState)(!1),Z=(0,a.Z)(v,2),b=Z[0],y=Z[1],w=(0,l.useState)(""),j=(0,a.Z)(w,2),C=j[0],S=j[1],P=(0,l.useState)({}),M=(0,a.Z)(P,2),R=M[0],E=M[1],W=(0,l.useState)(""),H=(0,a.Z)(W,2),I=H[0],D=H[1],B=(0,l.useState)(!1),N=(0,a.Z)(B,2),G=N[0],F=N[1],L=(0,u.I0)();(0,l.useLayoutEffect)((function(){L(h.v.getAll())}),[]);var q=(0,u.v9)((function(e){return e.series.data})),_=(0,l.useMemo)((function(){return console.log(I),""===I.trim()?q:q.filter((function(e){return e.name.toLowerCase().includes(I.trim().toLowerCase())}))}),[I,q]),J=l.useRef(null),Q=function(){m(!1),S(""),E({})},ne=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(n){var r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(!0),console.log(n),e.prev=2,e.next=5,p.Z.post("".concat("http://127.0.0.1:5000","/series/submit-form"),(0,o.Z)({},n),{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS","Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type","Access-Control-Allow-Credentials":"true"}});case 5:r=e.sent,console.log(r.data),m(!1),S(""),L(h.v.getAll()),y(!1),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),y(!1),console.error(e.t0);case 17:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(n){return e.apply(this,arguments)}}(),re=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(n){var r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(!0),console.log(n,R),e.prev=2,e.next=5,p.Z.post("".concat("http://127.0.0.1:5000","/series/submit-edit-form"),(0,o.Z)((0,o.Z)({},R),n),{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS","Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type","Access-Control-Allow-Credentials":"true"}});case 5:r=e.sent,console.log(r.data),m(!1),S(""),E({}),L(h.v.getAll()),y(!1),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(2),y(!1),console.error(e.t0);case 18:case"end":return e.stop()}}),e,null,[[2,14]])})));return function(n){return e.apply(this,arguments)}}(),te=function(){var e=(0,i.Z)((0,t.Z)().mark((function e(n){var r;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(!0),console.log(n,R),e.prev=2,e.next=5,p.Z.post("".concat("http://127.0.0.1:5000","/series/submit-delete-form"),(0,o.Z)((0,o.Z)({},R),n),{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS","Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type","Access-Control-Allow-Credentials":"true"}});case 5:r=e.sent,console.log(r.data),m(!1),S(""),E({}),L(h.v.getAll()),y(!1),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(2),y(!1),console.error(e.t0);case 18:case"end":return e.stop()}}),e,null,[[2,14]])})));return function(n){return e.apply(this,arguments)}}(),oe=(0,l.useCallback)((function(e){var n;console.log(e.target.value,J,J.current),null===(n=J.current)||void 0===n||n.focus(),D(e.target.value)}));return(0,x.jsxs)(Y.Z,{theme:ee,children:[(0,x.jsx)(g.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.drawer+1}},open:b,children:(0,x.jsx)(f.Z,{color:"inherit"})}),r&&"add"===C?(0,x.jsx)(V,{isOpen:r,onClose:ne,onCloseEmpty:Q}):null,r&&"edit"===C?(0,x.jsx)(U,{isOpen:r,onClose:re,onCloseEmpty:Q,editModalData:R}):null,r&&"delete"===C?(0,x.jsx)(X,{isOpen:r,onClose:te,onCloseEmpty:Q,editModalData:R}):null,(0,x.jsx)(s.ZP,{children:(0,x.jsxs)(c.Z,{sx:{boxShadow:"none"},children:[(0,x.jsx)($.Z,{children:(0,x.jsxs)(s.ZP,{variant:"gradient",bgcolor:"info",borderRadius:"lg",display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,x.jsx)(k.Z,{variant:"h6",fontWeight:500,color:"primary",children:"Series List"}),(0,x.jsxs)(s.ZP,{size:"small",component:"form",sx:{p:"2px 0px",display:"flex",alignItems:"center"},children:[G?(0,x.jsx)(d.Z,{sx:{ml:1,flex:1},size:"small",placeholder:"Search this table...",inputProps:{"aria-label":"search this table..."},autoFocus:!0,value:I,onChange:oe,variant:"standard",label:"Search"}):null,(0,x.jsx)(A.Z,{title:"Search...",placement:"top",children:(0,x.jsx)(z.Z,{color:"primary",type:"button","aria-label":"search",onClick:function(){F((function(e){return!e}))},children:(0,x.jsx)(T.jVj,{size:"24px"})})}),(0,x.jsx)(A.Z,{title:"Add Series",placement:"top",children:(0,x.jsx)(z.Z,{color:"secondary","aria-label":"delete",onClick:function(){m(!0),S("add")},children:(0,x.jsx)(T.SC9,{size:"27px"})})})]})]})}),(0,x.jsx)(K.Z,{}),(0,x.jsx)(O,{filtereddata:_,onOpenEditModal:function(e){m(!0),S("edit"),E(e)},onOpenDeleteModal:function(e){m(!0),S("delete"),E(e)}})]})})]})}},8745:function(e,n,r){var t=r(4942),o=r(3366),i=r(7462),a=r(2791),l=r(8182),s=r(865),c=r(2065),d=r(4036),u=r(6646),h=r(829),p=r(3736),g=r(6934),f=r(618),x=r(184),m=["align","className","component","padding","scope","size","sortDirection","variant"],v=(0,g.ZP)("td",{name:"MuiTableCell",slot:"Root",overridesResolver:function(e,n){var r=e.ownerState;return[n.root,n[r.variant],n["size".concat((0,d.Z)(r.size))],"normal"!==r.padding&&n["padding".concat((0,d.Z)(r.padding))],"inherit"!==r.align&&n["align".concat((0,d.Z)(r.align))],r.stickyHeader&&n.stickyHeader]}})((function(e){var n=e.theme,r=e.ownerState;return(0,i.Z)({},n.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===n.palette.mode?(0,c.$n)((0,c.Fq)(n.palette.divider,1),.88):(0,c._j)((0,c.Fq)(n.palette.divider,1),.68)),textAlign:"left",padding:16},"head"===r.variant&&{color:n.palette.text.primary,lineHeight:n.typography.pxToRem(24),fontWeight:n.typography.fontWeightMedium},"body"===r.variant&&{color:n.palette.text.primary},"footer"===r.variant&&{color:n.palette.text.secondary,lineHeight:n.typography.pxToRem(21),fontSize:n.typography.pxToRem(12)},"small"===r.size&&(0,t.Z)({padding:"6px 16px"},"&.".concat(f.Z.paddingCheckbox),{width:24,padding:"0 12px 0 16px","& > *":{padding:0}}),"checkbox"===r.padding&&{width:48,padding:"0 0 0 4px"},"none"===r.padding&&{padding:0},"left"===r.align&&{textAlign:"left"},"center"===r.align&&{textAlign:"center"},"right"===r.align&&{textAlign:"right",flexDirection:"row-reverse"},"justify"===r.align&&{textAlign:"justify"},r.stickyHeader&&{position:"sticky",top:0,zIndex:2,backgroundColor:n.palette.background.default})})),Z=a.forwardRef((function(e,n){var r,t=(0,p.Z)({props:e,name:"MuiTableCell"}),c=t.align,g=void 0===c?"inherit":c,Z=t.className,b=t.component,y=t.padding,w=t.scope,j=t.size,C=t.sortDirection,S=t.variant,k=(0,o.Z)(t,m),A=a.useContext(u.Z),z=a.useContext(h.Z),T=z&&"head"===z.variant;r=b||(T?"th":"td");var P=w;!P&&T&&(P="col");var M=S||z&&z.variant,R=(0,i.Z)({},t,{align:g,component:r,padding:y||(A&&A.padding?A.padding:"normal"),size:j||(A&&A.size?A.size:"medium"),sortDirection:C,stickyHeader:"head"===M&&A&&A.stickyHeader,variant:M}),O=function(e){var n=e.classes,r=e.variant,t=e.align,o=e.padding,i=e.size,a={root:["root",r,e.stickyHeader&&"stickyHeader","inherit"!==t&&"align".concat((0,d.Z)(t)),"normal"!==o&&"padding".concat((0,d.Z)(o)),"size".concat((0,d.Z)(i))]};return(0,s.Z)(a,f.U,n)}(R),E=null;return C&&(E="asc"===C?"ascending":"descending"),(0,x.jsx)(v,(0,i.Z)({as:r,ref:n,className:(0,l.Z)(O.root,Z),"aria-sort":E,scope:P,ownerState:R},k))}));n.Z=Z},618:function(e,n,r){r.d(n,{U:function(){return o}});var t=r(9076);function o(e){return(0,t.Z)("MuiTableCell",e)}var i=(0,r(9046).Z)("MuiTableCell",["root","head","body","footer","sizeSmall","sizeMedium","paddingCheckbox","paddingNone","alignLeft","alignCenter","alignRight","alignJustify","stickyHeader"]);n.Z=i},6890:function(e,n,r){r.d(n,{Z:function(){return v}});var t=r(7462),o=r(3366),i=r(2791),a=r(8182),l=r(865),s=r(829),c=r(3736),d=r(6934),u=r(9076);function h(e){return(0,u.Z)("MuiTableHead",e)}(0,r(9046).Z)("MuiTableHead",["root"]);var p=r(184),g=["className","component"],f=(0,d.ZP)("thead",{name:"MuiTableHead",slot:"Root",overridesResolver:function(e,n){return n.root}})({display:"table-header-group"}),x={variant:"head"},m="thead",v=i.forwardRef((function(e,n){var r=(0,c.Z)({props:e,name:"MuiTableHead"}),i=r.className,d=r.component,u=void 0===d?m:d,v=(0,o.Z)(r,g),Z=(0,t.Z)({},r,{component:u}),b=function(e){var n=e.classes;return(0,l.Z)({root:["root"]},h,n)}(Z);return(0,p.jsx)(s.Z.Provider,{value:x,children:(0,p.jsx)(f,(0,t.Z)({as:u,className:(0,a.Z)(b.root,i),ref:n,role:u===m?null:"rowgroup",ownerState:Z},v))})}))}}]);
//# sourceMappingURL=35.f2c2bc37.chunk.js.map
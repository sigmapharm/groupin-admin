(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"0d470c17268ab7cf11bd":function(e,t,n){"use strict";var r=n("8af190b70a6bc55c6f1b"),o=n.n(r),i=(n("8a2d1b95e05b6a321e74"),n("5e98cee1846dbfd41421")),l=n("d7dd51e1bf6bfc2c9c3d"),a=n("7249cdbd7b9d8c561d7d"),f={isAuthenticated:function(){var e=a.a.get();return null!==e&&""!==e&&void 0!==e&&"undefined"!==e}},c=n("a72b40110d9c31c9b5c5");function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=p(e);if(t){var o=p(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===u(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return m(e)}(this,n)}}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.a=function(e){var t=function(t){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(u,o.a.Component);var n,r,l,a=b(u);function u(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return y(m(e=a.call.apply(a,[this].concat(n))),"componentWillMount",function(){f.isAuthenticated()||i.a.location.pathname.startsWith("/register")?e.props.dispatch(Object(c.o)()):i.a.push("/login")}),e}return n=u,(r=[{key:"render",value:function(){return f.isAuthenticated()?o.a.createElement(e,this.props):null}}])&&s(n.prototype,r),l&&s(n,l),Object.defineProperty(n,"prototype",{writable:!1}),u}();y(t,"WrappedComponent",e);return Object(l.connect)(null,function(e){return{dispatch:e}})(t)}},10:function(e,t){},11:function(e,t){},12:function(e,t){},13:function(e,t){},14:function(e,t){},15:function(e,t){},16:function(e,t){},17:function(e,t){},2:function(e,t){},"23dea4c27d0b4357b944":function(e,t,n){"use strict";n.r(t);var r,o=n("8af190b70a6bc55c6f1b"),i=n.n(o),l=(n("8a2d1b95e05b6a321e74"),n("ab4cb61bcb2dc161defb")),a=n("6938d226fd372a75cbf9"),f=n("a28fc3c963a1d4d1a2e5"),c=n("d7dd51e1bf6bfc2c9c3d"),u=n("b27e083e7741c2dccb3f"),s=n.n(u),d=(n("5e98cee1846dbfd41421"),n("921c0b8c557fe6ba5da8")),b=n.n(d),m=n("0d470c17268ab7cf11bd"),p=n("9f46370a0b127bd3f4f9"),y=n("7c9faaf1acda361595df"),v=(n("892cb41534be8f335068"),n("4b091868236b651f9c1b"),n("ded16ab4624f4ef14dfc"),n("0d939196e59ed73c94e6")),h=(n("b903d14db0bb03f8ed44"),n("3dde4251a4e36fb3d2d7")),g=n.n(h),S=n("d92d468851cb84e1fe31"),w=n.n(S),x=n("8c15e3241ab0c51afd40"),j=n.n(x),A=n("b15eaa86766eaf9ec6c8"),O=n.n(A),k=n("52c96d1228d4068abba1"),T=n.n(k),C=n("3f935c253d9c7ef47e52"),N=n.n(C),z=n("711f9393a7bdb8588a8c"),P=n("3079e0665f8295af8336"),L=n.n(P);function M(e,t,n,o){r||(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=o;else if(l>1){for(var a=new Array(l),f=0;f<l;f++)a[f]=arguments[f+3];t.children=a}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],l=!0,a=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);l=!0);}catch(e){a=!0,o=e}finally{try{l||null==n.return||n.return()}finally{if(a)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return E(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return E(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function R(e){return console.log(e),N()(Number(e))?T()(Number(e),15e3,2e4)?"orange":O()(Number(e),2e4)?"green":j()(Number(e),15e3)?"red":null:null}var $,D=function(e){var t=e.rows;console.log("rows",t);var n=Object(o.useMemo)(function(){var e=L()(t||[],"nom");return Object.entries(e).map(function(e,t){var n=_(e,2);return{label:n[0],data:n[1].map(function(e,t){return{total:e.ca?e.ca.toFixed(2):null,quantity:e.nbr_co,mois:e.mois}})}})},[t]);return console.log(n),M(v.TableBody,{},void 0,n.map(function(e,t){var n,r=e.data;return M(v.TableRow,{style:{backgroundColor:(n=t,n%2>0?"#e2e8f0":void 0)}},t,M(v.TableCell,{style:{padding:3,borderLeft:"1px solid black",textAlign:"center"}},void 0,e.label),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 1===e.mois})[0]&&r.filter(function(e){return 1===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15}})," :"," ",r.filter(function(e){return 1===e.mois})[0]?r.filter(function(e){return 1===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 2===e.mois})[0]&&r.filter(function(e){return 2===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 2===e.mois})[0]?r.filter(function(e){return 2===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 3===e.mois})[0]&&r.filter(function(e){return 3===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 3===e.mois})[0]?r.filter(function(e){return 3===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 4===e.mois})[0]&&r.filter(function(e){return 4===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 4===e.mois})[0]?r.filter(function(e){return 4===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 5===e.mois})[0]&&r.filter(function(e){return 5===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 5===e.mois})[0]?r.filter(function(e){return 5===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 6===e.mois})[0]&&r.filter(function(e){return 6===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 6===e.mois})[0]?r.filter(function(e){return 6===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 7===e.mois})[0]&&r.filter(function(e){return 7===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 7===e.mois})[0]?r.filter(function(e){return 7===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 8===e.mois})[0]&&r.filter(function(e){return 8===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 8===e.mois})[0]?r.filter(function(e){return 8===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 9===e.mois})[0]&&r.filter(function(e){return 9===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 9===e.mois})[0]?r.filter(function(e){return 9===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 10===e.mois})[0]&&r.filter(function(e){return 10===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 10===e.mois})[0]?r.filter(function(e){return 10===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 11===e.mois})[0]&&r.filter(function(e){return 11===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 11===e.mois})[0]?r.filter(function(e){return 11===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:R(r.filter(function(e){return 12===e.mois})[0]&&r.filter(function(e){return 12===e.mois})[0].total)}},void 0,M("div",{style:{display:"flex"}},void 0,M(z.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 12===e.mois})[0]?r.filter(function(e){return 12===e.mois})[0].total:"------")),M(v.TableCell,{style:{padding:0,borderLeft:"1px solid black"}},void 0,M("div",{style:{display:"flex"}},void 0,w()(g()(r,function(e){return Number(e.total)})).toFixed(2))))}))};function F(e,t,n,r){$||($="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var l=new Array(i),a=0;a<i;a++)l[a]=arguments[a+3];t.children=l}if(t&&o)for(var f in o)void 0===t[f]&&(t[f]=o[f]);else t||(t=o||{});return{$$typeof:$,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var I,B=function(e){var t=e.cols,n=e.list,r=e.classes;i.a.useRef();return F(v.Paper,{className:r.root},void 0,F(v.Table,{className:r.table},void 0,F(v.TableHead,{className:r.tableHead},void 0,F(v.TableRow,{},void 0,t.map(function(e,t){var n=e.colName,r=e.label;return F(v.TableCell,{style:{width:70,padding:0,color:"#fff",borderLeft:"1px solid #fff",textAlign:"center"}},n,r)}))),F(D,{rows:n})))},U=n("2862a523e031319710f7"),q=n("d430dc12a1665f4e5905"),H=n("e5410e082f7c0e08fb6a");function W(e){return function(e){if(Array.isArray(e))return J(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return J(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return J(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var Y,G=function(e){var t=e.apiData,n=e.fileName,r=(e.callback,e.dispatch);return function(e,t,n,r){I||(I="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var l=new Array(i),a=0;a<i;a++)l[a]=arguments[a+3];t.children=l}if(t&&o)for(var f in o)void 0===t[f]&&(t[f]=o[f]);else t||(t=o||{});return{$$typeof:I,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}(H.a,{onClick:function(e){r(Object(y.i)({callback:function(e,r){!function(e,n){var r=[],o={};W(new Set(t.map(function(e){return e.nom}))).forEach(function(e){o[e]={nom:e,janvier:0,"f\xe9vrier":0,mars:0,avril:0,mai:0,juin:0,juillet:0,"ao\xfbt":0,septembre:0,octobre:0,novembre:0,"d\xe9cembre":0,total:0}}),t.forEach(function(e){var t={1:"janvier",2:"f\xe9vrier",3:"mars",4:"avril",5:"mai",6:"juin",7:"juillet",8:"ao\xfbt",9:"septembre",10:"octobre",11:"novembre",12:"d\xe9cembre"}[e.mois];t&&o[e.nom]&&(o[e.nom][t]=Number(e.ca).toFixed(2),o[e.nom].total+=Number(e.ca))}),Object.values(o).forEach(function(e){e.total=Number(e.total).toFixed(2),r.push(e)}),r.sort(function(e,t){return e.nom.localeCompare(t.nom)}),console.log(t),t=r;var i={Sheets:{data:q.utils.json_to_sheet(t)},SheetNames:["data"]},l=q.write(i,{bookType:"xlsx",type:"array"}),a=new Blob([l],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});U.saveAs(a,n+".xlsx")}(0,n)}}))}})};function K(e){return(K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Q(e,t,n,r){Y||(Y="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var l=new Array(i),a=0;a<i;a++)l[a]=arguments[a+3];t.children=l}if(t&&o)for(var f in o)void 0===t[f]&&(t[f]=o[f]);else t||(t=o||{});return{$$typeof:Y,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function X(e,t){return(X=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function Z(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=te(e);if(t){var o=te(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(e,t){if(t&&("object"===K(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return ee(e)}(this,n)}}function ee(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function te(e){return(te=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function ne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"UsersList",function(){return re});var re=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&X(e,t)}(l,i.a.PureComponent);var t,n,r,o=Z(l);function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),ne(ee(t=o.call(this,e)),"handleChangePage",function(e,n){t.setState({page:n}),t.props.dispatch(Object(y.g)({page:n}))}),ne(ee(t),"handleChangeRowsPerPage",function(e){}),ne(ee(t),"handlePrint",function(e){t.props.dispatch(Object(y.i)({callback:function(e,n){t.setState({printData:e})}}))}),t.state={page:0,rowsPerPage:10,printData:[],from:"2022-01-01",to:"2022-12-30",cols:[{label:"Labo Nom",colName:"nom",selected:!1},{label:"janvier",selected:!1,colName:"janvier"},{label:"f\xe9vrier",colName:"pharmacy",selected:!1},{label:"mars",colName:"role",selected:!1},{label:"avril",colName:"quantityCmd",selected:!1},{label:"mai",colName:"quantityCmd",selected:!1},{label:"juin",colName:"totalAmount",selected:!1},{label:"juillet",colName:"totalAmount",selected:!1},{label:"ao\xfbt",colName:"totalAmount",selected:!1},{label:"septembre",colName:"totalAmount",selected:!1},{label:"octobre",colName:"totalAmount",selected:!1},{label:"novembre",colName:"totalAmount",selected:!1},{label:"d\xe9cembre",colName:"totalAmount",selected:!1},{label:"total",colName:"Total",selected:!1}]},t}return t=l,(n=[{key:"componentDidMount",value:function(){this.props.dispatch(Object(y.g)({page:0,from:"2022-01-01",to:"2022-12-30"}))}},{key:"render",value:function(){var e=this,t=this.props,n=t.classes,r=(t.list,this.state.cols);return Q("div",{},void 0,Q(b.a,{component:"h1",variant:"h4",className:n.root,style:{overflow:"hidden"}},void 0,"labos analytique"),Q(s.a,{variant:"middle",className:n.root}),Q("div",{style:{marginLeft:30}},void 0,Q(G,{dispatch:this.props.dispatch,apiData:this.props.list,fileName:"".concat(Date.now(),"-labos-statique")}),Q("select",{value:"".concat(this.state.from,"/").concat(this.state.to),name:"",id:"",style:{border:"1px solid black",width:200,padding:10,borderRadius:11,marginLeft:20},onChange:function(t){var n=t.target.value.split("/");e.setState({from:n[0],to:n[1]}),e.props.dispatch(Object(y.g)({page:0,from:n[0],to:n[1]}))}},void 0,Array.from({length:(new Date).getFullYear()-2020+1},function(e,t){var n=2020+t;return Q("option",{value:"".concat(n,"-01-01/").concat(n,"-12-30")},n,n)}))),Q(s.a,{variant:"middle",className:n.root}),Q(B,{cols:r,list:this.props.list,classes:n}))}}])&&V(t.prototype,n),r&&V(t,r),Object.defineProperty(t,"prototype",{writable:!1}),l}(),oe=Object(f.b)({list:Object(p.b)()}),ie=Object(c.connect)(oe,function(e){return{dispatch:e}});re.defaultProps={};t.default=Object(l.compose)(m.a,ie,Object(a.withStyles)(function(e){return{root:{marginTop:3*e.spacing.unit,marginBottom:3*e.spacing.unit,maxWidth:"1200px",width:"100%",margin:"20px auto",overflow:"auto"},table:{minWidth:700,height:500,overflow:"auto"},addUserButton:{position:"fixed",bottom:2*e.spacing.unit,right:2*e.spacing.unit},tableHead:{backgroundColor:e.palette.primary.main}}}))(re)},3:function(e,t){},4:function(e,t){},"4b091868236b651f9c1b":function(e,t,n){"use strict";n.d(t,"a",function(){return b});n("8af190b70a6bc55c6f1b");var r,o=n("2862a523e031319710f7"),i=n("d430dc12a1665f4e5905"),l=n("7c9faaf1acda361595df"),a=n("e5410e082f7c0e08fb6a");function f(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach(function(t){d(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(e){var t=e.apiData,n=e.fileName,c=(e.callback,e.dispatch);return function(e,t,n,o){r||(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=o;else if(l>1){for(var a=new Array(l),f=0;f<l;f++)a[f]=arguments[f+3];t.children=a}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}(a.a,{onClick:function(e){c(Object(l.j)({callback:function(e,r){!function(e,n){var r=[],l={};t=t.map(function(e){return s(s({},e),{},{nom:e.denomination})}),f(new Set(t.map(function(e){return e.nom}))).forEach(function(e){l[e]={nom:e,janvier:0,"f\xe9vrier":0,mars:0,avril:0,mai:0,juin:0,juillet:0,"ao\xfbt":0,septembre:0,octobre:0,novembre:0,"d\xe9cembre":0,total:0}}),t.forEach(function(e){var t={1:"janvier",2:"f\xe9vrier",3:"mars",4:"avril",5:"mai",6:"juin",7:"juillet",8:"ao\xfbt",9:"septembre",10:"octobre",11:"novembre",12:"d\xe9cembre"}[e.mois];t&&l[e.nom]&&(l[e.nom][t]=Number(e.ca).toFixed(2),l[e.nom].total+=Number(e.ca))}),Object.values(l).forEach(function(e){e.total=Number(e.total).toFixed(2),r.push(e)}),r.sort(function(e,t){return e.nom.localeCompare(t.nom)}),console.log(t),t=r;var a={Sheets:{data:i.utils.json_to_sheet(t)},SheetNames:["data"]},c=i.write(a,{bookType:"xlsx",type:"array"}),u=new Blob([c],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});o.saveAs(u,n+".xlsx")}(0,n)}}))}})}},5:function(e,t){},6:function(e,t){},7:function(e,t){},8:function(e,t){},9:function(e,t){},"9f46370a0b127bd3f4f9":function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return l});var r=n("a28fc3c963a1d4d1a2e5"),o=function(e){return e.get("pharmaciesAnalytics")},i=function(){return Object(r.a)(o,function(e){return e.get("list").toJS()})},l=function(){return Object(r.a)(o,function(e){return e.get("labosAnalyticsList").toJS()})}},b903d14db0bb03f8ed44:function(e,t,n){"use strict";n.d(t,"a",function(){return O});var r,o=n("3dde4251a4e36fb3d2d7"),i=n.n(o),l=n("d92d468851cb84e1fe31"),a=n.n(l),f=n("8c15e3241ab0c51afd40"),c=n.n(f),u=n("b15eaa86766eaf9ec6c8"),s=n.n(u),d=n("52c96d1228d4068abba1"),b=n.n(d),m=n("3f935c253d9c7ef47e52"),p=n.n(m),y=n("8af190b70a6bc55c6f1b"),v=n("0d939196e59ed73c94e6"),h=n("711f9393a7bdb8588a8c"),g=n("3079e0665f8295af8336"),S=n.n(g);function w(e,t,n,o){r||(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=o;else if(l>1){for(var a=new Array(l),f=0;f<l;f++)a[f]=arguments[f+3];t.children=a}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],l=!0,a=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);l=!0);}catch(e){a=!0,o=e}finally{try{l||null==n.return||n.return()}finally{if(a)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function A(e){return p()(Number(e))?b()(Number(e),15e3,2e4)?"orange":s()(Number(e),2e4)?"green":c()(Number(e),15e3)?"red":null:null}var O=function(e){var t=e.rows,n=Object(y.useMemo)(function(){var e=S()(t||[],"denomination");return Object.entries(e).map(function(e,t){var n=x(e,2);return{label:n[0],data:n[1].map(function(e,t){return{total:e.ca?e.ca.toFixed(2):null,quantity:e.nbr_co,mois:e.mois}})}})},[t]);return w(v.TableBody,{},void 0,n.map(function(e,t){var n,r=e.data;return w(v.TableRow,{style:{backgroundColor:(n=t,n%2>0?"#e2e8f0":void 0)}},t,w(v.TableCell,{style:{padding:3,borderLeft:"1px solid black",textAlign:"center"}},void 0,e.label),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 1===e.mois})[0]&&r.filter(function(e){return 1===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15}})," :"," ",r.filter(function(e){return 1===e.mois})[0]?r.filter(function(e){return 1===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 2===e.mois})[0]&&r.filter(function(e){return 2===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 2===e.mois})[0]?r.filter(function(e){return 2===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 3===e.mois})[0]&&r.filter(function(e){return 3===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 3===e.mois})[0]?r.filter(function(e){return 3===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 4===e.mois})[0]&&r.filter(function(e){return 4===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 4===e.mois})[0]?r.filter(function(e){return 4===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 5===e.mois})[0]&&r.filter(function(e){return 5===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 5===e.mois})[0]?r.filter(function(e){return 5===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 6===e.mois})[0]&&r.filter(function(e){return 6===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 6===e.mois})[0]?r.filter(function(e){return 6===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 7===e.mois})[0]&&r.filter(function(e){return 7===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 7===e.mois})[0]?r.filter(function(e){return 7===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 8===e.mois})[0]&&r.filter(function(e){return 8===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 8===e.mois})[0]?r.filter(function(e){return 8===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 9===e.mois})[0]&&r.filter(function(e){return 9===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 9===e.mois})[0]?r.filter(function(e){return 9===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 10===e.mois})[0]&&r.filter(function(e){return 10===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 10===e.mois})[0]?r.filter(function(e){return 10===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 11===e.mois})[0]&&r.filter(function(e){return 11===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 11===e.mois})[0]?r.filter(function(e){return 11===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black",color:A(r.filter(function(e){return 12===e.mois})[0]&&r.filter(function(e){return 12===e.mois})[0].total)}},void 0,w("div",{style:{display:"flex"}},void 0,w(h.AttachMoney,{style:{fontSize:15},fontSize:"small"})," :"," ",r.filter(function(e){return 12===e.mois})[0]?r.filter(function(e){return 12===e.mois})[0].total:"------")),w(v.TableCell,{style:{padding:0,borderLeft:"1px solid black"}},void 0,w("div",{style:{display:"flex"}},void 0,a()(i()(r,function(e){return Number(e.total)})).toFixed(2))))}))}},ded16ab4624f4ef14dfc:function(e,t,n){"use strict";var r,o=n("0d939196e59ed73c94e6"),i=n("8af190b70a6bc55c6f1b"),l=n.n(i),a=n("b903d14db0bb03f8ed44");function f(e,t,n,o){r||(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=o;else if(l>1){for(var a=new Array(l),f=0;f<l;f++)a[f]=arguments[f+3];t.children=a}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}t.a=function(e){var t=e.cols,n=e.list,r=e.classes;l.a.useRef();return f(o.Paper,{className:r.root},void 0,f(o.Table,{className:r.table},void 0,f(o.TableHead,{className:r.tableHead},void 0,f(o.TableRow,{},void 0,t.map(function(e,t){var n=e.colName,r=e.label;return f(o.TableCell,{style:{width:70,padding:0,color:"#fff",borderLeft:"1px solid #fff",textAlign:"center"}},n,r)}))),f(a.a,{rows:n})))}},e5410e082f7c0e08fb6a:function(e,t,n){"use strict";var r,o=n("0d939196e59ed73c94e6"),i=n("711f9393a7bdb8588a8c");n("8af190b70a6bc55c6f1b");function l(e,t,n,o){r||(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,l=arguments.length-3;if(t||0===l||(t={children:void 0}),1===l)t.children=o;else if(l>1){for(var a=new Array(l),f=0;f<l;f++)a[f]=arguments[f+3];t.children=a}if(t&&i)for(var c in i)void 0===t[c]&&(t[c]=i[c]);else t||(t=i||{});return{$$typeof:r,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}var a=l(i.Print,{});t.a=function(e){var t=e.className,n=e.onClick,r=e.type;return l(o.Fab,{color:"primary",className:t,onClick:n,type:r},void 0,a)}}}]);
(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{139:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),c=n(11),r=n.n(c),o=(n(87),n(188)),l=n(21),s=n(178),u=n(190),d=n(183),b=n(16),j=n(73),h=n(180),f=n(184),p=n(182),O=n(185),g=n(62),m=(n(89),n(63)),x=n.n(m),v=["video/webm","video/mpeg","audio/wav","audio/x-flac","audio/mpeg","audio/midi","audio/webm","application/ogg"],w=n(7),k=function(e){var t=e.split("/");return function(e){return e.split("?width")[0]}(t[t.length-1])},C=Object(s.a)({root:{height:"fit-content",margin:16,"& .MuiCardContent-root":{padding:8},"& .MuiCardActions-root":{padding:4}},title:{maxWidth:"fit-content",wordBreak:"break-all",fontSize:b.isMobile?12:14},media:{"& img":{objectFit:"cover !important"},"& img:hover":{cursor:"zoom-in !important"}},desc:{maxWidth:"fit-content",fontSize:b.isMobile?10:12}}),S=function(e){var t,n,i=e.data,a=i.thumb,c=i.fileLabel,r=i.file,o=i.encoding,l=i.fileOrig,s=e.onClick,u=void 0===s?function(){}:s,j=C();return Object(w.jsxs)(h.a,{className:j.root,children:[Object(w.jsx)("div",{className:j.media,children:v.includes(o.value)?Object(w.jsx)(x.a,{controls:!0,url:l.value,height:b.isMobile?94:169,width:b.isMobile?125:225}):Object(w.jsx)(g.LazyLoadImage,{onClick:u,alt:r.value,effect:"blur",src:a.value,height:b.isMobile?94:169,width:b.isMobile?125:225})}),Object(w.jsxs)(p.a,{children:[Object(w.jsx)(d.a,{className:j.title,gutterBottom:!0,children:(n=k(l.value),n.length>50?"".concat(n.substr(0,50),"..."):n)}),(null===c||void 0===c?void 0:c["xml:lang"])&&Object(w.jsx)(d.a,{color:"textSecondary",className:j.desc,children:(t=c.value,t.length>150?"".concat(t.substr(0,50),"..."):t)})]}),Object(w.jsx)(f.a,{children:Object(w.jsx)(O.a,{size:"small",color:"primary",href:r.value,target:"_blank",children:"Learn More"})})]})},y=n(34),M=n(68),E=n.n(M),I=n(189),A=n(191),L=n(187),q=n(69),F=n(70),N=function(){function e(t){Object(q.a)(this,e),this.endpoint=t}return Object(F.a)(e,[{key:"query",value:function(e){var t="".concat(this.endpoint,"?query=").concat(encodeURIComponent(e));return fetch(t,{headers:{Accept:"application/sparql-results+json"}}).then((function(e){return e.json()}))}}]),e}(),P=function(e){var t=e.onClick,n=e.option;return Object(w.jsxs)(u.a,{display:"flex",flexDirection:"column",onClick:t,children:[Object(w.jsx)(d.a,{children:n.label}),Object(w.jsx)(d.a,{variant:"caption",children:n.description})]})},R=E()({instance:"https://www.wikidata.org",sparqlEndpoint:"https://query.wikidata.org/sparql"}),z=function(e){var t=e.setNoResults,n=e.setEntityMediaResults,a=Object(i.useState)(!1),c=Object(l.a)(a,2),r=c[0],o=c[1],s=Object(i.useState)(null),d=Object(l.a)(s,2),j=d[0],h=d[1],f=Object(i.useState)(""),p=Object(l.a)(f,2),O=p[0],g=p[1],m=Object(i.useState)([]),x=Object(l.a)(m,2),v=x[0],k=x[1],C=Object(i.useRef)(null);return Object(i.useEffect)((function(){if(""!==O)return C.current&&clearTimeout(C.current),C.current=setTimeout((function(){o(!0);var e=R.searchEntities(O);fetch(e).then((function(e){return e.json()})).then((function(e){k(e.search),o(!1)}))}),500),!0;t(!1)}),[O,t]),Object(w.jsx)(u.a,{maxWidth:500,width:"100%",children:Object(w.jsx)(A.a,{clearOnBlur:!1,autoHighlight:!0,options:v,renderOption:function(e){return Object(w.jsx)(P,{option:e})},getOptionSelected:function(e,t){return e.title===t.title},getOptionLabel:function(e){return e.label},loading:r,filterOptions:function(e){return e},value:j,onChange:function(e,i){if(h(i),!i)return!1;n([]);var a="\n      SELECT ?file ?thumb ?fileOrig ?fileLabel ?encoding WHERE {\n        ?file wdt:P180 wd:".concat(i.id,' .\n        ?file schema:contentUrl ?url .\n        ?file schema:encodingFormat ?encoding .\n        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }\n        bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)), "?width=').concat(b.isMobile?100:200,'")) AS ?thumb)\n        bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)))) AS ?fileOrig)\n      } limit ').concat(1e3,"\n    ");return new N("https://wcqs-beta.wmflabs.org/sparql").query(a).then((function(e){0===e.results.bindings.length?t(!0):(n(e.results.bindings),t(!1))})),!0},onInputChange:function(e,t){g(t)},renderInput:function(e){return Object(w.jsx)(I.a,Object(y.a)(Object(y.a)({},e),{},{label:"Search Wikimedia Commons",margin:"normal",variant:"outlined",InputProps:Object(y.a)(Object(y.a)({},e.InputProps),{},{endAdornment:Object(w.jsxs)(w.Fragment,{children:[r?Object(w.jsx)(L.a,{color:"inherit",size:20}):null,v.length>0?e.InputProps.endAdornment:null]})})}))}})})},T=Object(s.a)({root:{padding:b.isMobile?"10px":"25px 50px",display:"flex",flexDirection:"column",alignItems:"center"}});var U=function(){var e=T(),t=Object(i.useState)([]),n=Object(l.a)(t,2),a=n[0],c=n[1],r=Object(i.useState)(!1),o=Object(l.a)(r,2),s=o[0],b=o[1],h=Object(i.useState)(!1),f=Object(l.a)(h,2),p=f[0],O=f[1];return console.log(a,"entityMediaResults"),Object(w.jsxs)("div",{className:e.root,children:[Object(w.jsx)(z,{setNoResults:b,setEntityMediaResults:c}),a.length>0&&Object(w.jsx)(u.a,{display:"flex",flexWrap:"wrap",justifyContent:"center",children:i.Children.toArray(a.map((function(e){return Object(w.jsx)(S,{data:e,onClick:function(){return O(e)}})})))}),s&&Object(w.jsx)(d.a,{children:"No results..."}),p&&Object(w.jsx)(j.a,{large:p.fileOrig.value,alt:p.file.value,onClose:function(){O(!1)}})]})},W=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,194)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),i(e),a(e),c(e),r(e)}))};r.a.render(Object(w.jsxs)(a.a.StrictMode,{children:[Object(w.jsx)(o.a,{}),Object(w.jsx)(U,{})]}),document.getElementById("root")),W()},87:function(e,t,n){}},[[139,1,2]]]);
//# sourceMappingURL=main.fbbee655.chunk.js.map
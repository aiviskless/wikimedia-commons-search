(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{139:function(e,t,n){"use strict";n.r(t);var i=n(0),c=n.n(i),a=n(11),o=n.n(a),r=(n(87),n(188)),l=n(34),s=n(26),u=n(62),d=n.n(u),b=n(189),j=n(191),h=n(181),f=n(190),p=n(187),O=n(179),m=n(20),g=n(73),x=n(63),v=n(64),w=function(){function e(t){Object(x.a)(this,e),this.endpoint=t}return Object(v.a)(e,[{key:"query",value:function(e){var t="".concat(this.endpoint,"?query=").concat(encodeURIComponent(e));return fetch(t,{headers:{Accept:"application/sparql-results+json"}}).then((function(e){return e.json()}))}}]),e}(),k=n(7),C=function(e){var t=e.onClick,n=e.option;return Object(k.jsxs)(f.a,{display:"flex",flexDirection:"column",onClick:t,children:[Object(k.jsx)(O.a,{children:n.label}),Object(k.jsx)(O.a,{variant:"caption",children:n.description})]})},S=n(182),y=n(184),M=n(183),E=n(185),I=n(69),A=(n(119),n(70)),L=n.n(A),q=["video/webm","video/mpeg","audio/wav","audio/x-flac","audio/mpeg","audio/midi","audio/webm","application/ogg"],F=function(e){var t=e.split("/");return function(e){return e.split("?width")[0]}(t[t.length-1])},P=Object(h.a)({root:{height:"fit-content",margin:16,"& .MuiCardContent-root":{padding:8},"& .MuiCardActions-root":{padding:4}},title:{maxWidth:"fit-content",wordBreak:"break-all",fontSize:m.isMobile?12:14},media:{"& img":{objectFit:"cover !important"},"& img:hover":{cursor:"zoom-in !important"}},desc:{maxWidth:"fit-content",fontSize:m.isMobile?10:12}}),N=function(e){var t,n,i=e.data,c=i.thumb,a=i.fileLabel,o=i.file,r=i.encoding,l=i.fileOrig,s=e.onClick,u=void 0===s?function(){}:s,d=P();return Object(k.jsxs)(S.a,{className:d.root,children:[Object(k.jsx)("div",{className:d.media,children:q.includes(r.value)?Object(k.jsx)(L.a,{controls:!0,url:l.value,height:m.isMobile?94:169,width:m.isMobile?125:225}):Object(k.jsx)(I.LazyLoadImage,{onClick:u,alt:o.value,effect:"blur",src:c.value,height:m.isMobile?94:169,width:m.isMobile?125:225})}),Object(k.jsxs)(M.a,{children:[Object(k.jsx)(O.a,{className:d.title,gutterBottom:!0,children:(n=F(l.value),n.length>50?"".concat(n.substr(0,50),"..."):n)}),(null===a||void 0===a?void 0:a["xml:lang"])&&Object(k.jsx)(O.a,{color:"textSecondary",className:d.desc,children:(t=a.value,t.length>150?"".concat(t.substr(0,50),"..."):t)})]}),Object(k.jsx)(y.a,{children:Object(k.jsx)(E.a,{size:"small",color:"primary",href:o.value,target:"_blank",children:"Learn More"})})]})},z=Object(h.a)({root:{padding:m.isMobile?"10px":"25px 50px",display:"flex",flexDirection:"column",alignItems:"center"}}),T=d()({instance:"https://www.wikidata.org",sparqlEndpoint:"https://query.wikidata.org/sparql"});var U=function(){var e=z(),t=Object(i.useState)(null),n=Object(s.a)(t,2),c=n[0],a=n[1],o=Object(i.useState)(""),r=Object(s.a)(o,2),u=r[0],d=r[1],h=Object(i.useState)([]),x=Object(s.a)(h,2),v=x[0],S=x[1],y=Object(i.useState)([]),M=Object(s.a)(y,2),E=M[0],I=M[1],A=Object(i.useState)(!1),L=Object(s.a)(A,2),q=L[0],F=L[1],P=Object(i.useState)(!1),U=Object(s.a)(P,2),W=U[0],R=U[1],B=Object(i.useState)(!1),D=Object(s.a)(B,2),G=D[0],J=D[1],_=Object(i.useRef)(null);return console.log(E,"entityMediaResults",v),Object(i.useEffect)((function(){if(""!==u)return _.current&&clearTimeout(_.current),_.current=setTimeout((function(){F(!0);var e=T.searchEntities(u);fetch(e).then((function(e){return e.json()})).then((function(e){S(e.search),F(!1)}))}),500),!0;R(!1)}),[u]),Object(k.jsxs)("div",{className:e.root,children:[Object(k.jsx)(f.a,{maxWidth:500,width:"100%",children:Object(k.jsx)(j.a,{id:"autocomplete",options:v,renderOption:function(e){return Object(k.jsx)(f.a,{width:"100%",children:Object(k.jsx)(C,{onClick:function(){return function(e){I([]);var t="\n      SELECT ?file ?thumb ?fileOrig ?fileLabel ?encoding WHERE {\n        ?file wdt:P180 wd:".concat(e,' .\n        ?file schema:contentUrl ?url .\n        ?file schema:encodingFormat ?encoding .\n        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }\n        bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)), "?width=').concat(m.isMobile?100:200,'")) AS ?thumb)\n        bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)))) AS ?fileOrig)\n      } limit ').concat(1e3,"\n    ");new w("https://wcqs-beta.wmflabs.org/sparql").query(t).then((function(e){0===e.results.bindings.length?R(!0):(I(e.results.bindings),R(!1))}))}(e.id)},option:e})})},getOptionSelected:function(e,t){return e.title===t.title},getOptionLabel:function(e){return e.label},loading:q,filterOptions:function(e){return e},value:c,onChange:function(e,t){a(t)},onInputChange:function(e,t){d(t)},renderInput:function(e){return Object(k.jsx)(b.a,Object(l.a)(Object(l.a)({},e),{},{label:"Search Wikimedia Commons",margin:"normal",variant:"outlined",InputProps:Object(l.a)(Object(l.a)({},e.InputProps),{},{endAdornment:Object(k.jsxs)(k.Fragment,{children:[q?Object(k.jsx)(p.a,{color:"inherit",size:20}):null,v.length>0?e.InputProps.endAdornment:null]})})}))}})}),E.length>0&&Object(k.jsx)(f.a,{display:"flex",flexWrap:"wrap",justifyContent:"center",children:i.Children.toArray(E.map((function(e){return Object(k.jsx)(N,{data:e,onClick:function(){return J(e)}})})))}),W&&Object(k.jsx)(O.a,{children:"No results..."}),G&&Object(k.jsx)(g.a,{large:G.fileOrig.value,alt:G.file.value,onClose:function(){J(!1)}})]})},W=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,194)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),i(e),c(e),a(e),o(e)}))};o.a.render(Object(k.jsxs)(c.a.StrictMode,{children:[Object(k.jsx)(r.a,{}),Object(k.jsx)(U,{})]}),document.getElementById("root")),W()},87:function(e,t,n){}},[[139,1,2]]]);
//# sourceMappingURL=main.380d520a.chunk.js.map
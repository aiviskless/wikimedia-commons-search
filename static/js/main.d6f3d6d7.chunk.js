(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{117:function(t,e,n){"use strict";n.r(e);var i=n(0),a=n.n(i),c=n(11),r=n.n(c),o=(n(83),n(168)),l=n(34),s=n(69),u=n(30),d=(n(84),n(59)),j=n.n(d),h=n(169),b=n(171),p=n(170),f=n(167),m=n(172),O=n(60),g=n(61),v=function(){function t(e){Object(O.a)(this,t),this.endpoint=e}return Object(g.a)(t,[{key:"query",value:function(t){var e="".concat(this.endpoint,"?query=").concat(encodeURIComponent(t));return fetch(e,{headers:{Accept:"application/sparql-results+json"}}).then((function(t){return t.json()}))}}]),t}(),x=n(159),w=n(7),k=function(t){var e=t.onClick,n=t.option;return Object(w.jsxs)(p.a,{display:"flex",flexDirection:"column",onClick:function(){return e(n.id)},children:[Object(w.jsx)(p.a,{children:n.label}),Object(w.jsx)(x.a,{variant:"caption",children:n.description})]})},y=n(162),C=n(164),S=n(163),A=n(165),E=n(161),q=n(68),I=function(t){return t.split("?width")[0]},L=function(t){var e=t.split("/");return I(e[e.length-1])},P=Object(E.a)({root:{width:"fit-content",height:"fit-content",margin:16},title:{maxWidth:"fit-content",wordBreak:"break-all"},media:{textAlign:"center",height:255,"& img":{height:"100%",width:"auto"},"& img:hover":{cursor:"zoom-in !important"},"& div:first-child":{height:"100%"}},desc:{maxWidth:"fit-content"}}),F=function(t){var e,n,i=t.data,a=i.image,c=i.fileLabel,r=i.file,o=P();return Object(w.jsxs)(y.a,{className:o.root,children:[Object(w.jsx)("div",{className:o.media,children:Object(w.jsx)(q.a,{small:a.value,large:I(a.value),alt:r.value})}),Object(w.jsxs)(S.a,{children:[Object(w.jsx)(x.a,{gutterBottom:!0,component:"p",className:o.title,children:(n=L(a.value),n.length>50?"".concat(n.substr(0,50),"..."):n)}),(null===c||void 0===c?void 0:c["xml:lang"])&&Object(w.jsx)(x.a,{variant:"body2",color:"textSecondary",component:"p",className:o.desc,children:(e=c.value,e.length>150?"".concat(e.substr(0,50),"..."):e)})]}),Object(w.jsx)(C.a,{children:Object(w.jsx)(A.a,{size:"small",color:"primary",href:r.value,target:"_blank",children:"Learn More"})})]})};var N=function(){var t=Object(i.useState)(""),e=Object(u.a)(t,2),n=e[0],a=e[1],c=Object(i.useState)([]),r=Object(u.a)(c,2),o=r[0],d=r[1],O=Object(i.useState)([]),g=Object(u.a)(O,2),x=g[0],y=g[1],C=Object(i.useState)(!1),S=Object(u.a)(C,2),A=S[0],E=S[1],q=Object(i.useState)(1),I=Object(u.a)(q,2),L=I[0],P=I[1],N=Object(i.useRef)(null),T=j()({instance:"https://www.wikidata.org",sparqlEndpoint:"https://query.wikidata.org/sparql"}),R=function(t){var e,i;return a(t.target.value),!((null===t||void 0===t||null===(e=t.target)||void 0===e||null===(i=e.value)||void 0===i?void 0:i.length)<2)&&(N.current&&clearTimeout(N.current),N.current=setTimeout((function(){E(!0);var t=T.searchEntities(n);fetch(t).then((function(t){return t.json()})).then((function(t){d(t.search),E(!1)}))}),500),!0)};console.log(x,"entityMediaResults");var U=8*L,W=U-8;return Object(w.jsxs)("div",{className:"App",children:[Object(w.jsx)(p.a,{width:500,children:Object(w.jsx)(b.a,{freeSolo:!0,options:Object(s.a)(o),renderOption:function(t){return Object(w.jsx)(k,{onClick:function(){return function(t){y([]),P(1);var e="\n      SELECT ?file ?image ?fileLabel ?thumb WHERE {\n        ?file wdt:P180 wd:".concat(t,' .\n        ?file schema:contentUrl ?url .\n        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }\n        bind(iri(concat("http://commons.wikimedia.org/wiki/Special:FilePath/", wikibase:decodeUri(substr(str(?url),53)), "?width=350")) AS ?image)\n      } limit ').concat(100,"\n    ");new v("https://wcqs-beta.wmflabs.org/sparql").query(e).then((function(t){return y(t.results.bindings)}))}(t.id)},option:t})},getOptionLabel:function(t){return t.label},loading:A,filterOptions:function(t){return t},renderInput:function(t){return Object(w.jsx)(h.a,Object(l.a)(Object(l.a)({},t),{},{onChange:R,value:n,label:"Search Wikimedia Commons",margin:"normal",variant:"outlined",InputProps:Object(l.a)(Object(l.a)({},t.InputProps),{},{endAdornment:Object(w.jsxs)(w.Fragment,{children:[A?Object(w.jsx)(f.a,{color:"inherit",size:20}):null,t.InputProps.endAdornment]})})}))}})}),x.length&&Object(w.jsx)(p.a,{display:"flex",flexWrap:"wrap",justifyContent:"center",children:i.Children.toArray(x.slice(W,U).map((function(t){return Object(w.jsx)(F,{data:t})})))}),x.length&&Object(w.jsx)(m.a,{count:Math.ceil(x.length/8),page:L,onChange:function(t,e){P(e)},size:"large"})]})},T=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,174)).then((function(e){var n=e.getCLS,i=e.getFID,a=e.getFCP,c=e.getLCP,r=e.getTTFB;n(t),i(t),a(t),c(t),r(t)}))};r.a.render(Object(w.jsxs)(a.a.StrictMode,{children:[Object(w.jsx)(o.a,{}),Object(w.jsx)(N,{})]}),document.getElementById("root")),T()},83:function(t,e,n){},84:function(t,e,n){}},[[117,1,2]]]);
//# sourceMappingURL=main.d6f3d6d7.chunk.js.map
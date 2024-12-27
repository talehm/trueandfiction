"use strict";(self.webpackChunkvue_wordpress=self.webpackChunkvue_wordpress||[]).push([[635],{3986:(t,e,s)=>{s.d(e,{D_:()=>h,LN:()=>l,T2:()=>o});var r=s(1011);const{url:i}=__VUE_WORDPRESS__.routing,a=r.A.create({baseURL:`${i}/wp-json/wp/v2/`,headers:{Accept:"application/json","Content-Type":"application/json"}}),n={};const o=({type:t,id:e,batch:s=!1})=>s?(function(t,e){n[t]?n[t].ids.includes(e)||n[t].ids.push(e):(n[t]={},n[t].ids=[e],n[t].request=new Promise(((e,s)=>{setTimeout((()=>{e(function(t){return a.get(`/${t}/`,{params:{include:n[t].ids,per_page:100}})}(t)),n[t]=null}),100)})))}(t,e),n[t].request):a.get(`/${t}/${e}`),h=({type:t,params:e={}})=>a.get(`/${t}/`,{params:e}),l=({type:t,params:e={}})=>a.get(`/${t}/`,{params:e})},645:(t,e,s)=>{var r=s(5471),i=function(){var t=this,e=t._self._c;return e("v-app",[e("v-app-bar",{attrs:{absolute:""}},[e("div",{staticClass:"site-branding",on:{click:function(e){return t.$router.push("/")}}},[e("img",{staticClass:"logo",attrs:{src:this.site.url+"/wp-content/uploads/2024/09/logo.png",alt:""}})]),t._v(" "),e("Theme")],1),t._v(" "),e("router-view",{key:t.$route.path}),t._v(" "),e("Footer")],1)};i._withStripped=!0;var a=s(6181),n=s(3726),o=s(1990),h=s(9507),l=s(4972);const u={components:{NavMenu:a.A,SiteLoading:n.A,CategoryList:o.A,Theme:h.A,Footer:l.A},data(){return{links:["Dashboard","Messages","Profile","Updates"],site:this.$store.state.site}},computed:{loading(){return this.$store.state.site.loading},logo(){if(this.site.logo)return this.$store.getters.singleById({type:"media",id:this.site.logo})}},methods:{getLinkEl(t){for(;t.parentNode;){if("A"===t.tagName)return t;t=t.parentNode}},handleClicks(t){const e=this.getLinkEl(t.target);if(e&&e.href.includes(this.site.url)){const{altKey:s,ctrlKey:r,metaKey:i,shiftKey:a,button:n,defaultPrevented:o}=t;if(e.className.includes("no-router"))return;if(i||s||r||a)return;if(o)return;if(void 0!==n&&0!==n)return;if(e.target&&e.target.includes("_blank"))return;let h=new URL(e.href,window.location.href);if(h&&h.pathname===window.location.pathname)return void(h.hash===window.location.hash&&t.preventDefault());t.preventDefault();let l=e.href.replace(this.site.url,"");this.$router.push(l)}},updateScroll(){window.scroll(0,0)}}};var p=s(5072),d=s.n(p),g=s(7825),c=s.n(g),m=s(7659),y=s.n(m),f=s(5056),A=s.n(f),v=s(540),_=s.n(v),w=s(1113),b=s.n(w),P=s(2912),$={};$.styleTagTransform=b(),$.setAttributes=A(),$.insert=y().bind(null,"head"),$.domAPI=c(),$.insertStyleElement=_(),d()(P.A,$),P.A&&P.A.locals&&P.A.locals;const q=(0,s(4486).A)(u,i,[],!1,null,null,null).exports;var S=s(1789),T=s(1402),C=s(4021),k=s(5384);const R={fn:{open(t,e=!0){window.open(t,e?"_blank":null)}}};new r.Ay({el:"#app",vuetify:k.A,render:t=>t(q),router:S.A,store:T.A,compontent:{Theme:h.A},data:()=>({tools:C.A,helpers:R,screenWidth:window.innerWidth,screenHeight:window.innerHeight}),methods:{toggleTheme(){const t=this.$vuetify.theme.dark;this.$vuetify.theme.dark=!t,document.documentElement.setAttribute("data-theme",this.$vuetify.theme.dark?"dark":"light"),localStorage.setItem("theme",this.$vuetify.theme.dark?"dark":"light")},updateWindowSize(){this.screenWidth=window.innerWidth,this.screenHeight=window.innerHeight}},computed:{isMobile(){return this.screenWidth<768},isTablet(){return this.screenWidth>=768&&this.screenWidth<=1024}},mounted(){const t=localStorage.getItem("theme")||"light";this.$vuetify.theme.dark="dark"===t,document.documentElement.setAttribute("data-theme",t),window.addEventListener("resize",this.updateWindowSize)},beforeDestroy(){window.removeEventListener("resize",this.updateWindowSize)}})},2912:(t,e,s)=>{s.d(e,{A:()=>o});var r=s(1601),i=s.n(r),a=s(6314),n=s.n(a)()(i());n.push([t.id,"\n.site-branding {\n\tdisplay: inline-block;\n\tpadding: 1rem 0;\n\tcursor: pointer;\n}\n.logo {\n\tdisplay: inline-block;\n\tvertical-align: middle;\n\theight: 4rem;\n\twidth: auto;\n\tmargin: 0 0.4rem 0 0;\n}\n.site-branding>span {\n\tvertical-align: middle;\n\tfont-size: 2.4rem;\n\tfont-weight: bold;\n}\n.main-menu {\n\tposition: sticky;\n\ttop: -1px;\n\tz-index: 2;\n\tdisplay: flex;\n\tflex-flow: row wrap;\n\tjustify-content: flex-start;\n\tbackground: #fff;\n\tpadding: 1rem 0;\n\tborder-top: 1px solid rgba(0, 0, 0, 0.05);\n\tborder-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.main-menu>a {\n\tmargin-right: 2%;\n}\n\n/* Vue transition classes\n-------------------------------------------- */\n.fade-enter-active {\n\ttransition: opacity 0.4s cubic-bezier(0.4, 0, 0, 1);\n}\n.fade-leave-active {\n\ttransition: opacity 0.2s cubic-bezier(0.4, 0, 0, 1);\n}\n.fade-enter-to,\n.fade-leave {\n\topacity: 1;\n}\n.fade-enter,\n.fade-leave-to {\n\topacity: 0;\n}\n",""]);const o=n},8283:(t,e,s)=>{s.d(e,{A:()=>a});var r=function(){var t=this,e=t._self._c;return e("main",[e("h1",[t._v(t._s(t.title))]),t._v(" "),e("p",[t._v(t._s(t.message))])])};r._withStripped=!0;const i={data:()=>({title:"404 - Page Not Found",message:"Apparently nothing exists at this location."}),created(){this.$store.dispatch("updateDocTitle",{parts:["Page not found",this.$store.state.site.name]})}},a=(0,s(4486).A)(i,r,[],!1,null,null,null).exports},2021:(t,e,s)=>{s.d(e,{A:()=>o});var r=function(){var t=this,e=t._self._c;return e("main",[e("header",[e("h1",[t._v(t._s(t.title))])]),t._v(" "),t.posts?e("section",[t._l(t.posts,(function(t){return e("post-item",{key:t.id,attrs:{post:t}})})),t._v(" "),t.totalPages>1?e("pagination",{attrs:{total:t.totalPages,current:t.page}}):t._e()],2):t._e()])};r._withStripped=!0;var i=s(4227),a=s(3801);const n={name:"AuthorArchive",components:{PostItem:i.A,Pagination:a.A},props:{page:{type:Number,required:!0},slug:{type:String,required:!1}},data(){return{authorRequest:{type:"users",slug:this.slug},postsRequest:{type:"posts",params:{per_page:this.$store.state.site.posts_per_page,page:this.page,author:null},showLoading:!0},totalPages:0}},computed:{author(){return this.$store.getters.singleBySlug(this.authorRequest)},posts(){if(this.author)return this.$store.getters.requestedItems(this.postsRequest)},title(){return`Posts by ${this.author?this.author.name:""}`}},methods:{getAuthor(){return this.$store.dispatch("getSingleBySlug",this.authorRequest).then((()=>{this.setAuthorParam(),this.$store.dispatch("updateDocTitle",{parts:[this.author.name,this.$store.state.site.name]})}))},getPosts(){return this.$store.dispatch("getItems",this.postsRequest)},setAuthorParam(){this.postsRequest.params.author=this.author.id},setTotalPages(){this.totalPages=this.$store.getters.totalPages(this.postsRequest)}},created(){this.getAuthor().then((()=>this.getPosts())).then((()=>this.setTotalPages()))}},o=(0,s(4486).A)(n,r,[],!1,null,null,null).exports},8808:(t,e,s)=>{s.d(e,{A:()=>h});var r=function(){var t=this,e=t._self._c;return e("tile",{attrs:{type:"list",items:t.posts,title:t.title,cardItems:t.tileCardItems},scopedSlots:t._u([{key:"list",fn:function({item:t}){return[e("post-item",{key:t.id,attrs:{post:t}})]}}])})};r._withStripped=!0;var i=s(4227),a=s(3801),n=s(8661);const o={name:"CategoryArchive",components:{PostItem:i.A,Pagination:a.A,tile:n.A},props:{page:{type:Number,required:!0},slug:{type:String,required:!0}},data(){return{subcategories:[],postsRequest:{type:"posts",params:{per_page:10,page:this.page,categories:null},showLoading:!0},categoryRequest:{type:"categories",slug:this.slug},subcatRequest:null,totalPages:0}},computed:{category(){return this.$store.getters.singleBySlug(this.categoryRequest)},posts(){if(this.category)return this.$store.getters.requestedItems(this.postsRequest)},title(){return`${this.category?this.category.name:""}`},isModePost(){return this.posts&&this.posts.length},tileCardItems(){return{right:[{title:"Other Categories",items:this.subcategories},{title:"Other Categories",items:this.subcategories}]}}},methods:{getCategory(){return this.$store.dispatch("getSingleBySlug",this.categoryRequest).then((()=>{this.setPostsRequestParams(),this.$store.dispatch("updateDocTitle",{parts:[this.category.name,this.$store.state.site.name]})}))},getPosts(){return this.$store.dispatch("getItems",this.postsRequest)},setPostsRequestParams(){this.postsRequest.params.categories=this.category.id},setTotalPages(){this.totalPages=this.$store.getters.totalPages(this.postsRequest)},getSubCategories(){return console.log(this.isModePost),this.subcatRequest={type:"categories",params:{parent:this.isModePost?3:this.category.id}},this.$store.dispatch("getItems",this.subcatRequest)},open(t){window.open(t)}},created(){this.getCategory().then((()=>this.getPosts())).then((()=>this.getSubCategories())).then((()=>{this.subcategories=this.$store.getters.requestedItems(this.subcatRequest).filter((t=>t.id!=this.category.id))})).then((()=>this.getPosts())).then((()=>this.setTotalPages()))},watch:{category:{handler(t){if(t){const e={type:"categories",parent:t.id};this.subcategories=this.$store.getters.requestedItems(e)}}}}},h=(0,s(4486).A)(o,r,[],!1,null,null,null).exports},1990:(t,e,s)=>{s.d(e,{A:()=>a});var r=function(){var t=this,e=t._self._c;return e("v-list",{attrs:{dense:""}},t._l(t.items,(function(s,r){return e("v-list-item",{key:r},[s.subs&&s.subs.length?e("v-list",{attrs:{"no-action":""}},[[e("v-list-item-title",{on:{click:function(e){return t.helpers.fn.open(s.link)}}},[t._v(" "+t._s("-".repeat(t.level)+" "+s.name)+"\n\t\t\t\t")])],t._v(" "),e("CategoryList",{attrs:{items:s.subs,isNested:"",level:t.level+1}})],2):e("v-list-item-content",[e("v-list-item-title",{on:{click:function(e){return t.helpers.fn.open(s.link)}}},[t._v("\n\t\t\t\t"+t._s("-".repeat(t.level)+" "+s.name)+"\n\t\t\t")])],1)],1)})),1)};r._withStripped=!0;const i={name:"CategoryList",mixins:[s(3284).A],props:{items:{type:Array,required:!0},isNested:{type:Boolean},level:{type:Number,default:()=>0}},computed:{}},a=(0,s(4486).A)(i,r,[],!1,null,null,null).exports},4402:(t,e,s)=>{s.d(e,{A:()=>o});var r=function(){var t=this,e=t._self._c;return e("main",[e("header",[e("h1",[t._v(t._s(t.title))])]),t._v(" "),t.posts?e("section",[t._l(t.posts,(function(t){return e("post-item",{key:t.id,attrs:{post:t}})})),t._v(" "),t.totalPages>1?e("pagination",{attrs:{total:t.totalPages,current:t.page}}):t._e()],2):t._e()])};r._withStripped=!0;var i=s(4227),a=s(3801);const n={name:"DateArchive",components:{PostItem:i.A,Pagination:a.A},props:{page:{type:Number,required:!0},year:{type:String,required:!0},month:{type:String,required:!1},day:{type:String,required:!1}},data(){return{totalPages:0,request:{type:"posts",params:{per_page:this.$store.state.site.posts_per_page,page:this.page,after:this.after,before:this.before},showLoading:!0}}},computed:{before(){let t=new Date(this.after);return this.day?t.setUTCDate(t.getUTCDate()+1):this.month?t.setUTCMonth(t.getUTCMonth()+1):t.setUTCFullYear(t.getUTCFullYear()+1),t.toISOString()},after(){return`${this.year}${this.month?"-"+this.month:"-01"}${this.day?"-"+this.day:"-01"}T00:00:00.000Z`},posts(){return this.$store.getters.requestedItems(this.request)},title(){let t={year:"numeric"};return this.month&&(t.month="long",this.day&&(t.day="numeric")),`Archive for ${new Date(this.after.replace("T0","T1")).toLocaleDateString("en-US",t)}`}},methods:{getPosts(){return this.$store.dispatch("getItems",this.request)},setAfterParam(){this.request.params.after=`${this.year}${this.month?"-"+this.month:"-01"}${this.day?"-"+this.day:"-01"}T00:00:00.000Z`},setBeforeParam(){let t=new Date(this.request.params.after);this.day?t.setUTCDate(t.getUTCDate()+1):this.month?t.setUTCMonth(t.getUTCMonth()+1):t.setUTCFullYear(t.getUTCFullYear()+1),this.request.params.before=t.toISOString()},setTotalPages(){this.totalPages=this.$store.getters.totalPages(this.request)}},created(){this.setAfterParam(),this.setBeforeParam(),this.getPosts().then((()=>this.setTotalPages()))}},o=(0,s(4486).A)(n,r,[],!1,null,null,null).exports},8824:t=>{t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC"}}]);
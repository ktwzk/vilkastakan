document.addEventListener("DOMContentLoaded",()=>{new MastodonApi({container_id:"mt-timeline",container_body_id:"mt-body",instance_uri:"https://mas.to",user_id:"112947290924251437",profile_name:"@vilk",toots_limit:5,btn_see_more:"see more news"})});let MastodonApi=function(t){this.INSTANCE_URI=t.instance_uri,this.USER_ID=t.user_id,this.PROFILE_NAME=t.profile_name,this.TOOTS_LIMIT=t.toots_limit||20,this.BTN_SEE_MORE=t.btn_see_more||"see more",this.mtIdContainer=document.getElementById(t.container_id),this.mtBodyContainer=document.getElementById(t.container_body_id),this.getToots()};function removeSpinner(t){let e="loading-spinner",i=t.closest("."+e);i&&i.classList.remove(e)}MastodonApi.prototype.getToots=function(){let t=this;fetch(this.INSTANCE_URI+"/api/v1/accounts/"+this.USER_ID+"/statuses?limit="+this.TOOTS_LIMIT,{method:"get"}).then(t=>t.json()).then(i=>{for(let o in this.mtBodyContainer.innerHTML="",i)"public"==i[o].visibility&&e.call(t,i[o]);let n=document.querySelectorAll("#mt-timeline .hashtag");for(let s=0;s<n.length;s++)n[s].target="_blank",n[s].rel="tag noopener noreferrer";this.mtBodyContainer.insertAdjacentHTML("beforeend",'<div class="mt-seeMore" ><a href="'+t.INSTANCE_URI+"/"+t.PROFILE_NAME+'" class="btn" target="_blank" rel="noopener noreferrer">'+t.BTN_SEE_MORE+"</a></div>")}).catch(t=>{this.mtBodyContainer.innerHTML='<div class="d-flex h-100"><div class="w-100 my-auto text-center">✖️<br/>Request Failed:<br/>'+t+"</div></div>"});let e=function(t){let e,i;i=t.url,e=""!=t.spoiler_text?'<div class="toot-text">'+t.spoiler_text+" [show more...]</div>":t.reblog&&""!=t.reblog.content?'<div class="toot-text">'+t.reblog.content+"</div>":'<div class="toot-text">'+t.content+"</div>";let o="";if(t.media_attachments.length>0)for(let n in t.media_attachments)o=this.replaceMedias(t.media_attachments[n],t.sensitive);if(t.reblog&&t.reblog.media_attachments.length>0)for(let s in t.reblog.media_attachments)o=this.replaceMedias(t.reblog.media_attachments[s],t.sensitive);let r="",l="";if(t.poll){for(let a in t.poll.options)l+="<li>"+t.poll.options[a].title+"</li>";r='<div class="toot-poll"><ul>'+l+"</ul></div>"}let d='<div class="mt-toot border-bottom" data-location="'+i+'">'+e+o+r+"</div>";this.mtBodyContainer.insertAdjacentHTML("beforeend",d)}},MastodonApi.prototype.replaceMedias=function(t,e){return'<div class="toot-media '+(e?"toot-media-spoiler":"")+' img-ratio14_7 loading-spinner"><img onload="removeSpinner(this)" onerror="removeSpinner(this)" src="'+t.preview_url+'" alt="" loading="lazy" /></div>'};
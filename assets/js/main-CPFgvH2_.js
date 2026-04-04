(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e=document){return Array.from(e.querySelectorAll(`[data-tabs]`))}function t(e){return Array.from(e.querySelectorAll(`[role="tab"]`))}function n(e){return Array.from(e.querySelectorAll(`[role="tabpanel"]`))}function r(e,r,{moveFocus:i=!1}={}){let a=t(e),o=n(e);a.forEach(e=>{let t=e===r,n=e.getAttribute(`aria-controls`);if(e.setAttribute(`aria-selected`,String(t)),e.setAttribute(`tabindex`,t?`0`:`-1`),!n)return;let i=o.find(e=>e.id===n);i&&(i.hidden=!t)}),i&&r.focus()}function i(e){let n=e.currentTarget,i=n.closest(`[data-tabs]`);if(!i)return;let a=t(i),o=a.indexOf(n);if(o===-1)return;let s=o;switch(e.key){case`ArrowRight`:case`ArrowDown`:s=(o+1)%a.length;break;case`ArrowLeft`:case`ArrowUp`:s=(o-1+a.length)%a.length;break;case`Home`:s=0;break;case`End`:s=a.length-1;break;default:return}e.preventDefault(),r(i,a[s],{moveFocus:!0})}function a(n=document){e(n).forEach(e=>{let n=t(e);if(!n.length)return;let a=n.find(e=>e.getAttribute(`aria-selected`)===`true`)||n[0];n.forEach(t=>{t.addEventListener(`click`,()=>r(e,t)),t.addEventListener(`keydown`,i)}),r(e,a)})}function o(e=document){return Array.from(e.querySelectorAll(`[data-carousel]`))}var s=[`a[href]`,`button`,`input`,`select`,`textarea`,`[tabindex]`,`[contenteditable="true"]`].join(`, `);function c(e){return{viewport:e.querySelector(`[data-carousel-viewport]`)||e.querySelector(`.carousel__viewport`),track:e.querySelector(`[data-carousel-track]`),slides:Array.from(e.querySelectorAll(`[data-carousel-slide]`)),prev:e.querySelector(`[data-carousel-prev]`),next:e.querySelector(`[data-carousel-next]`),status:e.querySelector(`[data-carousel-status]`),dots:Array.from(e.querySelectorAll(`[data-carousel-dot]`))}}function l(e,t){let n=Array.from(e.querySelectorAll(s));e.setAttribute(`aria-hidden`,String(!t)),e.tabIndex=t?0:-1,n.forEach(n=>{if(n!==e){if(!t){if(!n.hasAttribute(`data-carousel-tabindex`)){let e=n.getAttribute(`tabindex`);n.setAttribute(`data-carousel-tabindex`,e??``)}n.setAttribute(`tabindex`,`-1`)}else if(n.hasAttribute(`data-carousel-tabindex`)){let e=n.getAttribute(`data-carousel-tabindex`);e?n.setAttribute(`tabindex`,e):n.removeAttribute(`tabindex`),n.removeAttribute(`data-carousel-tabindex`)}}})}function u(e){let{viewport:t,track:n,slides:r}=c(e);if(!t||!n||!r.length)return null;let i=Math.max(0,n.scrollWidth-t.clientWidth),a=r.map(e=>Math.min(e.offsetLeft,i)),o=a.findIndex(e=>e>=i);return{viewport:t,track:n,slides:r,maxOffset:i,offsets:a,maxIndex:o===-1?Math.max(0,r.length-1):o}}function d(e,t){let n=u(e),{prev:r,next:i,status:a,dots:o}=c(e);if(!n)return;let{viewport:s,track:d,slides:f,offsets:p,maxIndex:m}=n,h=Math.max(0,Math.min(t,m)),g=p[h]||0;e.dataset.carouselIndex=String(h),d.style.transform=`translateX(-${g}px)`,f.forEach((e,t)=>{let n=e.offsetLeft,r=n+e.offsetWidth,i=n<g+s.clientWidth&&r>g;e.dataset.carouselVisible=String(i),e.dataset.carouselCurrent=String(t===h),l(e,i)}),o.forEach((e,t)=>{let n=t===h;e.setAttribute(`aria-current`,String(n)),e.disabled=n}),r&&(r.disabled=h===0),i&&(i.disabled=h===m),a&&(a.textContent=`${h+1} / ${m+1}`)}function f(e,t){d(e,Number(e.dataset.carouselIndex||0)+t)}function p(e){let t=e.currentTarget;switch(e.key){case`ArrowLeft`:e.preventDefault(),f(t,-1);break;case`ArrowRight`:e.preventDefault(),f(t,1);break;case`Home`:e.preventDefault(),d(t,0);break;case`End`:{e.preventDefault();let{slides:n}=c(t);d(t,n.length-1);break}default:break}}function m(e=document){o(e).forEach(e=>{if(e.dataset.carouselReady===`true`)return;let{slides:t,prev:n,next:r,dots:i}=c(e);t.length&&(e.dataset.carouselReady=`true`,e.tabIndex=e.hasAttribute(`tabindex`)?e.tabIndex:0,e.addEventListener(`keydown`,p),n&&n.addEventListener(`click`,()=>f(e,-1)),r&&r.addEventListener(`click`,()=>f(e,1)),i.forEach((t,n)=>{t.addEventListener(`click`,()=>d(e,n))}),window.addEventListener(`resize`,()=>d(e,Number(e.dataset.carouselIndex||0))),d(e,Number(e.dataset.carouselIndex||0)))})}var h=``+new URL(`../images/woman-reading-emeil-newsletter.svg`,import.meta.url).href,g=`https://assets.mailerlite.com/jsonp/2241312/forms/183676980906952679/subscribe`,_=`https://assets.mailerlite.com/jsonp/2241312/forms/183676980906952679/takel`,v=`https://groot.mailerlite.com/js/w/webforms.min.js?v95037e5bac78f29ed026832ca21a7c7b`,y=`ml_webform_success_39383671`,b=null,x=!1,S=null;function C(e=document){e.querySelectorAll(`.site-nav`).forEach((e,t)=>{if(e.dataset.navReady===`true`)return;let n=e.querySelector(`.nav-toggle`),r=e.querySelector(`.nav-close`),i=e.querySelector(`.nav-drawer`),a=e.querySelector(`.nav-overlay`);if(!n||!r||!i||!a)return;let o=i.id||`site-nav-drawer-${t+1}`;i.id=o,n.setAttribute(`aria-controls`,o);let s=t=>{e.classList.toggle(`is-open`,t),document.body.classList.toggle(`nav-open`,t),n.setAttribute(`aria-expanded`,String(t)),i.setAttribute(`aria-hidden`,String(!t)),a.setAttribute(`aria-hidden`,String(!t))},c=()=>{s(!0),r.focus()},l=({returnFocus:t=!1}={})=>{let r=e.classList.contains(`is-open`);s(!1),t&&r&&n.focus()};n.addEventListener(`click`,()=>{if(e.classList.contains(`is-open`)){l({returnFocus:!0});return}c()}),r.addEventListener(`click`,()=>l({returnFocus:!0})),a.addEventListener(`click`,()=>l({returnFocus:!0})),e.addEventListener(`keydown`,t=>{t.key!==`Escape`||!e.classList.contains(`is-open`)||(t.preventDefault(),l({returnFocus:!0}))}),e.querySelectorAll(`a, [data-subscribe-trigger]`).forEach(e=>{e.addEventListener(`click`,()=>{window.matchMedia(`(max-width: 840px)`).matches&&l()})}),window.addEventListener(`resize`,()=>{window.innerWidth>840&&l()}),e.dataset.navReady=`true`,s(!1)})}function w(){if(b)return b;let e=document.querySelector(`script[data-mailerlite-webforms="true"]`);return e?(b=e.dataset.loaded===`true`?Promise.resolve():new Promise((t,n)=>{e.addEventListener(`load`,()=>t(),{once:!0}),e.addEventListener(`error`,()=>n(Error(`MailerLite script failed to load.`)),{once:!0})}).catch(()=>void 0),b):(b=new Promise((e,t)=>{let n=document.createElement(`script`);n.src=v,n.async=!0,n.dataset.mailerliteWebforms=`true`,n.addEventListener(`load`,()=>{n.dataset.loaded=`true`,e()},{once:!0}),n.addEventListener(`error`,()=>{n.dataset.loaded=`false`,t(Error(`MailerLite script failed to load.`))},{once:!0}),document.head.append(n)}).catch(()=>void 0),b)}function T(){x||(x=!0,fetch(_,{mode:`no-cors`}).catch(()=>void 0))}function E(e,t){if(!e)return;let n=e.querySelector(`.ml-form-embedSubmit .primary`),r=e.querySelector(`.ml-form-embedSubmit .loading`);e.dataset.mailerliteState=t?`submitting`:`idle`,n&&(n.disabled=t,n.setAttribute(`aria-busy`,String(t))),r&&(r.hidden=!t,r.disabled=!t,r.setAttribute(`aria-hidden`,String(!t)))}function D(e,t){if(!e)return;let n=e.querySelector(`.row-form`),r=e.querySelector(`.row-success`);n&&(n.hidden=t),r&&(r.hidden=!t)}function O(){typeof window>`u`||typeof window[y]==`function`||(window[y]=()=>{let e=S||document.querySelector(`[data-mailerlite-wrapper][data-mailerlite-state="submitting"]`);e&&(E(e,!1),D(e,!0),e.querySelector(`form`)?.reset(),S=null)})}function k(e=document){let t=e.querySelectorAll(`[data-newsletter-form]`);t.length&&(w(),T(),O(),t.forEach(e=>{if(e.dataset.newsletterReady===`true`)return;let t=e.closest(`[data-mailerlite-wrapper]`)||e,n=e.querySelector(`input[type="email"]`),r=e.querySelector(`[data-newsletter-consent]`);n&&(n.required=!0,n.autocomplete=`email`),r&&(r.required=!0),e.addEventListener(`submit`,e=>{if(n&&!n.reportValidity()){e.preventDefault();return}if(r&&!r.reportValidity()){e.preventDefault();return}S=t,D(t,!1),E(t,!0),window.setTimeout(()=>{t.dataset.mailerliteState===`submitting`&&E(t,!1)},1e4)}),e.dataset.newsletterReady=`true`,E(t,!1),D(t,!1)}))}function A(e,{url:t,title:n}){switch(e){case`facebook`:return`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(t)}`;case`x`:return`https://twitter.com/intent/tweet?url=${encodeURIComponent(t)}&text=${encodeURIComponent(n)}`;case`linkedin`:return`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(t)}`;case`whatsapp`:return`https://api.whatsapp.com/send?text=${encodeURIComponent(`${n} ${t}`)}`;default:return``}}async function j(e){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(e);return}let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`absolute`,t.style.left=`-9999px`,document.body.append(t),t.select(),document.execCommand(`copy`),t.remove()}function M(e=document){e.querySelectorAll(`[data-share-group]`).forEach(e=>{if(e.dataset.shareReady===`true`)return;let t=e.dataset.shareUrl||window.location.href,n=e.dataset.shareTitle||document.title,r=e.querySelector(`[data-share-status]`),i=e.querySelector(`[data-share-copy]`);e.querySelectorAll(`[data-share-platform]`).forEach(e=>{let r=e.dataset.sharePlatform,i=A(r,{url:t,title:n});i&&(e.href=i,e.target=`_blank`,e.rel=`noopener noreferrer`)}),i&&i.addEventListener(`click`,async()=>{try{await j(t),r&&(r.textContent=`Link copied.`)}catch{r&&(r.textContent=`Unable to copy link.`)}window.setTimeout(()=>{r&&(r.textContent=``)},2200)}),e.dataset.shareReady=`true`})}function N(e=document){let t=e.querySelectorAll(`[data-subscribe-trigger]`);if(!t.length)return;let n=document.querySelector(`[data-subscribe-modal]`),r=null;n||(n=document.createElement(`dialog`),n.className=`subscribe-modal`,n.dataset.subscribeModal=`true`,n.setAttribute(`aria-labelledby`,`subscribe-modal-title`),n.innerHTML=`
      <div class="subscribe-modal__surface">
        <button class="subscribe-modal__close" type="button" aria-label="Close subscribe modal" data-subscribe-close>
          <span aria-hidden="true">×</span>
        </button>
        <div class="subscribe-modal__media">
          <img src="${h}" alt="Woman reading a weekly positivity newsletter email" />
        </div>
        <div class="subscribe-modal__content">
          <div class="ml-subscribe-form ml-subscribe-form-39383671" data-mailerlite-wrapper data-mailerlite-context="modal">
            <div class="row-form subscribe-modal__body">
              <span class="card-kicker">Updates</span>
              <h2 id="subscribe-modal-title" class="display-s">Subscribe for thoughtful updates</h2>
              <p class="subscribe-modal__copy">
                I&apos;ll send the best essays, notes, and useful project updates to your inbox. Calm signal, not noise.
              </p>
              <form
                class="subscribe-modal__form ml-block-form"
                action="${g}"
                data-code=""
                data-newsletter-form
                data-mailerlite-form
                method="post"
                target="_blank"
              >
                <div class="ml-form-formContent">
                  <div class="ml-form-fieldRow ml-last-item">
                    <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                      <label class="newsletter-form__field">
                        <span class="field-label">Email</span>
                        <input
                          class="input"
                          aria-label="Email"
                          aria-required="true"
                          autocomplete="email"
                          name="fields[email]"
                          placeholder="Your email address"
                          type="email"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="newsletter-form__legal">
                  <p class="field-hint">You can unsubscribe anytime. For more details, review our Privacy Policy.</p>
                </div>
                <div class="ml-form-checkboxRow newsletter-form__consent ml-validate-required">
                  <label class="checkbox">
                    <input aria-label="Opt in to receive news and updates" data-newsletter-consent type="checkbox" />
                    <span class="label-description">Opt in to receive news and updates.</span>
                  </label>
                </div>
                <input type="hidden" name="ml-submit" value="1" />
                <input type="hidden" name="anticsrf" value="true" />
                <div class="subscribe-modal__actions">
                  <div class="ml-form-embedSubmit">
                    <button class="btn primary" type="submit">Join updates</button>
                    <button class="btn loading" disabled hidden type="button" aria-hidden="true">Joining...</button>
                  </div>
                  <button class="btn subscribe-modal__button--secondary" type="button" data-subscribe-close>Not now</button>
                </div>
              </form>
            </div>
            <div class="ml-form-successBody row-success subscribe-modal__success" hidden>
              <span class="card-kicker">You&apos;re in</span>
              <h2 class="display-s">Thank you for subscribing</h2>
              <p class="subscribe-modal__copy">
                Your email is on the list. New essays and thoughtful notes will land in your inbox soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    `,document.body.append(n),k(n),n.querySelectorAll(`[data-subscribe-close]`).forEach(e=>{e.addEventListener(`click`,()=>n.close())}),n.addEventListener(`close`,()=>{document.body.classList.remove(`modal-open`),r&&=(r.focus(),null)}),n.addEventListener(`click`,e=>{let t=n.getBoundingClientRect();t.top<=e.clientY&&e.clientY<=t.bottom&&t.left<=e.clientX&&e.clientX<=t.right||n.close()})),t.forEach(e=>{e.dataset.subscribeReady!==`true`&&(e.addEventListener(`click`,t=>{t.preventDefault(),r=e,document.body.classList.add(`modal-open`),n.showModal(),n.querySelector(`input[type="email"]`)?.focus()}),e.dataset.subscribeReady=`true`)})}a(),m(),C(),k(),M(),N();
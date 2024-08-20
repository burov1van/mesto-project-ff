(()=>{"use strict";function e(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),10),document.addEventListener("keydown",r),e.addEventListener("click",n)}function t(e){e.classList.remove("popup_is-opened"),setTimeout((function(){e.classList.remove("popup_is-animated")}),600),document.removeEventListener("keydown",r),e.removeEventListener("click",n)}function r(e){if("Escape"===e.key){var r=document.querySelector(".popup_is-opened");r&&t(r)}}function n(e){e.target.classList.contains("popup")&&t(e.target)}var o={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-20",headers:{authorization:"72ad478c-52e8-4a52-86e7-e878c04e7c49","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},a=function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then(c)},u=function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers}).then(c)};function i(r){var n=r.target.closest(".card"),a=n.dataset.cardId;e(document.querySelector(".popup_type_delete-card"));var u=document.querySelector(".popup__confirm");function i(){(function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers}).then(c)})(a).then((function(){n.remove(),t(document.querySelector(".popup_type_delete-card"))})).catch((function(e){console.error(e)})).finally((function(){u.removeEventListener("click",i)}))}u.removeEventListener("click",i),u.addEventListener("click",i)}function l(e){var t=e.target,r=t.closest(".card"),n=r.dataset.cardId,o=r.querySelector(".card__like-count");(t.classList.contains("card__like-button_is-active")?u:a)(n).then((function(e){t.classList.toggle("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.error(e)}))}function s(e,t,r,n,o){var c=document.querySelector("#card-template").content.cloneNode(!0),a=c.querySelector(".card"),u=c.querySelector(".card__image"),i=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-count");u.src=e.link,u.alt=e.name,u.addEventListener("click",n),c.querySelector(".card__title").textContent=e.name,a.dataset.cardId=e._id,l.textContent=e.likes.length;var s=c.querySelector(".card__like-button");return e.likes.some((function(e){return e._id===o}))&&s.classList.add("card__like-button_is-active"),s.addEventListener("click",r),e.owner._id!==o?i.remove():i.addEventListener("click",t),c}function d(e,t){e.setCustomValidity(""),e.validity.valid?p(e,t):(e.validity.patternMismatch?e.setCustomValidity(e.dataset.error):e.setCustomValidity(e.validationMessage),function(e,t){var r=document.querySelector(".".concat(e.name,"-input-error"));r.textContent=e.validationMessage,e.classList.add(t.inputErrorClass),r.classList.add(t.errorClass)}(e,t))}function p(e,t){var r=document.querySelector(".".concat(e.name,"-input-error"));r.textContent="",e.classList.remove(t.inputErrorClass),r.classList.remove(t.errorClass)}function _(e,t){var r=e.querySelector(t.submitButtonSelector);r.disabled=!e.checkValidity(),r.disabled?r.classList.add(t.inactiveButtonClass):r.classList.remove(t.inactiveButtonClass)}function f(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(e){e.setCustomValidity(""),e.classList.remove("input-interacted"),p(e,t)})),_(e,t)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var y,v=document.querySelector(".places__list"),h=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup_type_image"),E=L.querySelector(".popup__image"),k=L.querySelector(".popup__caption"),g=document.querySelectorAll(".popup__close"),C=document.querySelector(".profile__edit-avatar-button"),A=document.querySelector(".popup_type_avatar"),x=document.querySelector(".popup_type_avatar .popup__form"),U=document.querySelector(".popup__input_type_avatar-link"),T=document.querySelector(".profile__title"),w=document.querySelector(".profile__description");function I(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?n:r}x.addEventListener("submit",(function(e){e.preventDefault();var r,n=U.value,a=x.querySelector(".popup__button");I(!0,a),(r=n,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:r})}).then(c)).then((function(e){document.querySelector(".profile__image").style.backgroundImage="url(".concat(e.avatar,")"),x.reset(),t(A)})).catch((function(e){console.error(e)})).finally((function(){I(!1,a)}))})),Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then(c),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then(c)]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,r)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],c=n[1];T.textContent=o.name,w.textContent=o.about,document.querySelector(".profile__image").style.backgroundImage="url(".concat(o.avatar,")"),y=o._id,c.forEach((function(e){var t=s(e,i,l,M,y);v.append(t)}))})).catch((function(e){console.error(e)}));var j=document.querySelector(".popup_type_edit .popup__form"),O=document.querySelector(".popup__input_type_name"),P=document.querySelector(".popup__input_type_description"),B=document.querySelector(".popup_type_new-card .popup__form"),D=document.querySelector(".popup__input_type_card-name"),V=document.querySelector(".popup__input_type_url");function M(t){var r=t.target;E.src=r.src,E.alt=r.alt,k.textContent=r.alt,e(L)}h.addEventListener("click",(function(){O.value=T.textContent,P.value=w.textContent,f(j,J),e(b)})),C.addEventListener("click",(function(){x.reset(),f(x,J),e(A)})),S.addEventListener("click",(function(){B.reset(),f(B,J),e(q)})),g.forEach((function(e){e.addEventListener("click",(function(){t(e.closest(".popup"))}))})),j.addEventListener("submit",(function(e){e.preventDefault();var r,n,a=O.value,u=P.value,i=j.querySelector(".popup__button");I(!0,i),(r=a,n=u,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:r,about:n})}).then(c)).then((function(e){T.textContent=e.name,w.textContent=e.about,t(b)})).catch((function(e){console.error(e)})).finally((function(){I(!1,i)}))})),B.addEventListener("submit",(function(e){e.preventDefault();var r,n,a=D.value,u=V.value,d=B.querySelector(".popup__button");I(!0,d),(r=a,n=u,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:r,link:n})}).then(c)).then((function(e){var r=s(e,i,l,M,y);v.prepend(r),B.reset(),t(q)})).catch((function(e){console.error(e)})).finally((function(){I(!1,d)}))}));var N,J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};N=J,Array.from(document.querySelectorAll(N.formSelector)).forEach((function(e){!function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(r){r.addEventListener("input",(function(){r.classList.add("input-interacted"),d(r,t),_(e,t)})),r.addEventListener("blur",(function(){r.classList.add("input-interacted"),d(r,t)}))})),_(e,t)}(e,N)}))})();
const header=document.querySelector(".header"),headerWrapper=document.querySelector(".header__wrapper");function checkHeader(){pageYOffset>=headerWrapper.offsetHeight+headerWrapper.offsetTop-20?(header.classList.add("fixed-item"),header.classList.add("header--sticky"),headerWrapper.classList.add("header__wrapper--sticky")):(header.classList.remove("fixed-item"),header.classList.remove("header--sticky"),headerWrapper.classList.remove("header__wrapper--sticky"))}window.addEventListener("load",checkHeader),window.addEventListener("resize",checkHeader),window.addEventListener("scroll",checkHeader);let fixedItem=[];function bodyLock(){const e=window.innerWidth-document.body.offsetWidth+"px";fixedItem=document.querySelectorAll(".fixed-item"),document.body.style.overflow="hidden",document.body.style.marginRight=e,fixedItem.forEach(t=>t.style.paddingRight=e)}function bodyUnlock(){document.body.style.overflow="",document.body.style.marginRight="",fixedItem.forEach(e=>e.style.paddingRight="")}const hamburger=document.querySelector(".hamburger"),hamburgerWrapper=document.querySelector(".hamburger__wrapper"),hamburgerButton=document.querySelector(".hamburger__button"),hamburgerWrapperTransitionProperty="transform";let hamburgerOpen=!1;function openHamburger(){hamburgerOpen||(bodyLock(),hamburger.classList.add("hamburger--open"),hamburgerWrapper.classList.add("hamburger__wrapper--open"))}function closeHamburger(e=null){(null==e||hamburgerOpen&&e.target==hamburger)&&hamburgerWrapper.classList.remove("hamburger__wrapper--open")}function hamburgerTransitionend(e){e.target==hamburgerWrapper&&"transform"==e.propertyName&&(hamburgerOpen?(hamburger.classList.remove("hamburger--open"),hamburgerOpen=!1,bodyUnlock()):hamburgerOpen=!0)}null!=hamburgerButton&&hamburgerButton.addEventListener("click",openHamburger),window.addEventListener("click",e=>closeHamburger(e)),hamburgerWrapper.addEventListener("transitionend",e=>hamburgerTransitionend(e)),window.addEventListener("keydown",e=>{"Escape"==e.key&&hamburgerOpen&&closeHamburger()});const numberAnimation=document.querySelectorAll(".number-animation");let numberAnimationValue=[],numberAnimationValueBool=[],tempNumber=[];for(let e=0;e<numberAnimation.length;e++)numberAnimationValue[e]=numberAnimation[e].textContent,numberAnimationValue[e].includes("M")&&(numberAnimationValue[e]=1e6*parseInt(numberAnimationValue[e]),numberAnimationValueBool[e]=!0);let animationStarted=!1;const numberAnimationOffset=150,numberIncrementTotalTicks=500,numberIncrementTickInterval=0;function numberAnimationCheck(){if(!animationStarted&&pageYOffset>=numberAnimation[0].offsetTop+150-window.innerHeight){animationStarted=!0;for(let e=0;e<numberAnimation.length;e++)tempNumber[e]=0,numberAnimation[e].classList.remove("number-animation"),numberAnimate(e)}}function numberAnimate(e){tempNumber[e]=Math.floor(tempNumber[e]+numberAnimationValue[e]/500),numberAnimation[e].textContent=tempNumber[e],tempNumber[e]>=numberAnimationValue[e]?(tempNumber[e]=numberAnimationValue[e],numberAnimation[e].textContent=tempNumber[e],numberAnimationValueBool[e]&&(numberAnimation[e].textContent=tempNumber[e]/1e6+"M")):setTimeout(()=>numberAnimate(e),0)}window.addEventListener("load",numberAnimationCheck),window.addEventListener("resize",numberAnimationCheck),window.addEventListener("scroll",numberAnimationCheck);class Slider{constructor(e){if("string"==typeof e.sliderClass){this.sliderClass=e.sliderClass,this.slider=document.querySelectorAll("."+this.sliderClass),this.sliderWrapper=document.querySelectorAll(`.${this.sliderClass}__wrapper`),this.sliderImg=document.querySelectorAll(`.${this.sliderClass}__img`),this.sliderLink=document.querySelectorAll(`.${this.sliderClass}__link`),this.sliderPrevBtn=document.querySelectorAll(`.${this.sliderClass}__prev`),this.sliderNextBtn=document.querySelectorAll(`.${this.sliderClass}__next`),this.sliderWrapperPos=[],this.sliderWrapperDragOffset=[],this.sliderButton=[],this.sliderItem=[],this.visibleItems=[],this.currentSlide=[],this.expectedSlide=[],this.sliderDisabled=[],this.autoplayTimer=[],this.transitioning=[],this.tabFocused=!0,this.adaptiveHeight=!0,this.autoplay=!1,this.autoplayInterval=5e3,this.clonedItems=0,this.currentSlideCentered=!1,this.disableOnEdges=!1,this.disableUnsuitable=!0,this.draggable=!0,this.draggableWithMouse=!0,this.dragMoveCoefficient=.2,this.infinite=!1,this.initialSlide=0,this.interruptible=!0,"boolean"==typeof e.adaptiveHeight&&(this.adaptiveHeight=e.adaptiveHeight),"boolean"==typeof e.autoplay&&(this.autoplay=e.autoplay),Number.isInteger(e.autoplayInterval)&&e.autoplayInterval>=100&&(this.autoplayInterval=e.autoplayInterval),Number.isInteger(e.clonedItems)&&e.clonedItems>=0&&(this.clonedItems=e.clonedItems),"boolean"==typeof e.currentSlideCentered&&(this.currentSlideCentered=e.currentSlideCentered),"boolean"==typeof e.disableOnEdges&&(this.disableOnEdges=e.disableOnEdges),"boolean"==typeof e.disableUnsuitable&&(this.disableUnsuitable=e.disableUnsuitable),"boolean"==typeof e.draggable&&(this.draggable=e.draggable),"boolean"==typeof e.draggableWithMouse&&(this.draggableWithMouse=e.draggableWithMouse),"number"==typeof e.dragMoveCoefficient&&e.dragMoveCoefficient>0&&e.dragMoveCoefficient<1&&(this.dragMoveCoefficient=e.dragMoveCoefficient),"boolean"==typeof e.infinite&&(this.infinite=e.infinite),Number.isInteger(e.initialSlide)&&e.initialSlide>=0&&(this.initialSlide=e.initialSlide),"boolean"==typeof e.interruptible&&(this.interruptible=e.interruptible);for(let e=0;e<this.slider.length;e++){this.sliderWrapperPos[e]=0,this.sliderWrapperDragOffset[e]=0,this.sliderItem[e]=Array.from(this.slider[e].querySelectorAll(`.${this.sliderClass}__item`)),this.currentSlide[e]=this.initialSlide,null==this.sliderItem[e][this.currentSlide[e]]&&(this.currentSlide[e]=this.sliderItem[e].length-1);for(let t=1;t<=this.clonedItems;t++){const i=this.sliderItem[e][this.sliderItem[e].length-t].cloneNode(!0);i.classList.add(this.sliderClass+"__item-clone");for(let e of i.querySelectorAll("*"))e.tabIndex=-1;this.sliderWrapper[e].insertBefore(i,this.sliderItem[e][0]),this.sliderItem[e].unshift(i)}for(let t=1;t<=this.clonedItems;t++){const i=this.sliderItem[e][this.clonedItems+t-1].cloneNode(!0);i.classList.add(this.sliderClass+"__item-clone");for(let e of i.querySelectorAll("*"))e.tabIndex=-1;this.sliderWrapper[e].appendChild(i),this.sliderItem[e].push(i)}this.sliderButton[e]=this.slider[e].querySelectorAll(`.${this.sliderClass}__button`);for(let t=0;t<this.sliderButton[e].length;t++)this.sliderButton[e][t].addEventListener("click",e=>this.sliderSwitch(e));null!=this.sliderButton[e][0]&&this.sliderButton[e][0].classList.add(this.sliderClass+"__button--active"),this.visibleItemsCount(e),this.sliderToggle(e),this.autoplay&&(this.autoplayTimer[e]=setInterval(()=>this.sliderNext(e),this.autoplayInterval),this.slider[e].addEventListener("mouseenter",()=>this.sliderAutoplayUnpause(e)),this.slider[e].addEventListener("mouseleave",()=>this.sliderAutoplayPause(e))),null!=this.sliderNextBtn[e]&&this.sliderNextBtn[e].addEventListener("click",()=>this.sliderNext(e)),null!=this.sliderPrevBtn[e]&&this.sliderPrevBtn[e].addEventListener("click",()=>this.sliderPrev(e)),this.sliderWrapper[e].addEventListener("transitionend",t=>this.sliderMoveTransitionend(t,e)),addEventListener("focus",()=>this.tabFocusIn()),addEventListener("blur",()=>this.tabFocusOut()),this.slider[e].addEventListener("focusin",t=>this.sliderFocus(t,e)),this.sliderItem[e][this.currentSlide[e]+this.clonedItems].style.transition="0s",this.sliderMoveInstantly(e),this.sliderItem[e][this.currentSlide[e]+this.clonedItems].style.transition=""}this.sliderHeight(),window.addEventListener("load",()=>this.sliderHeight()),this.sliderImg.forEach(e=>e.addEventListener("load",()=>this.sliderHeight())),window.addEventListener("resize",()=>this.sliderResize()),this.sliderDragged=!1,this.sliderDragPos=0,this.dragThresholdReached=!1,this.draggedSlider,this.dragOffsetThreshold=5;for(let e=0;e<this.slider.length;e++)this.slider[e].addEventListener("mousedown",t=>this.sliderDragStart(t,e)),this.slider[e].addEventListener("touchstart",t=>this.sliderDragStart(t,e)),this.slider[e].addEventListener("mouseleave",()=>this.sliderDragEnd());window.addEventListener("mousemove",e=>this.sliderDragMove(e)),window.addEventListener("touchmove",e=>this.sliderDragMove(e)),window.addEventListener("mouseup",()=>this.sliderDragEnd()),window.addEventListener("touchend",()=>this.sliderDragEnd()),this.sliderLinkDragged,this.dragInitialPos,this.sliderLink.forEach(e=>e.addEventListener("click",e=>this.sliderLinkClick(e))),window.addEventListener("click",()=>{this.sliderLinkDragged=!1}),this.scrollY,this.scrollXEnabled,this.scrollYEnabled,window.addEventListener("touchstart",e=>this.scrollStart(e)),window.addEventListener("touchmove",e=>this.scrollMove(e),{passive:!1})}}sliderNext(e){if(this.sliderDisabled[e])return;if(!this.interruptible&&this.transitioning[e])return;this.sliderMoveSilently(e);const t=this.sliderItem[e].length-2*this.clonedItems;if(!this.infinite&&this.currentSlide[e]>=t-this.visibleItems[e]||this.infinite&&this.currentSlide[e]>=t-1){if(this.disableOnEdges)return;this.infinite?(this.currentSlide[e]++,this.expectedSlide[e]=0):this.currentSlide[e]=0,this.transitioning[e]=!0,this.sliderMove(e)}else this.currentSlide[e]++,this.transitioning[e]=!0,this.sliderMove(e)}sliderPrev(e){if(this.sliderDisabled[e])return;if(!this.interruptible&&this.transitioning[e])return;this.sliderMoveSilently(e);const t=this.sliderItem[e].length-2*this.clonedItems;if(0==this.currentSlide[e]){if(this.disableOnEdges)return;this.infinite?(this.currentSlide[e]--,this.expectedSlide[e]=t-1):this.currentSlide[e]=t-this.visibleItems[e],this.transitioning[e]=!0,this.sliderMove(e)}else this.currentSlide[e]--,this.transitioning[e]=!0,this.sliderMove(e)}sliderSwitch(e){for(let t=0;t<this.slider.length;t++)for(let i=0;i<this.sliderButton[t].length;i++)if(e.target.closest(`.${this.sliderClass}__button`)==this.sliderButton[t][i])return this.currentSlide[t]=i,this.expectedSlide[t]=null,void this.sliderMove(t)}tabFocusIn(){setTimeout(()=>this.tabFocused=!0,0)}tabFocusOut(){setTimeout(()=>this.tabFocused=!1,0)}sliderFocus(e,t){if(this.tabFocused)for(let i=0;i<this.sliderItem[t].length;i++)this.sliderItem[t][i]==e.target.closest("."+this.sliderClass+"__item")&&(this.currentSlide[t]=i-this.clonedItems,this.slider[t].scrollLeft=0,this.sliderDragEnd(),this.sliderMove(t))}sliderMove(e){const t=this.currentSlide[e]+this.clonedItems;let i,s=0;this.currentSlideCentered&&(s=(this.sliderWrapper[e].offsetWidth-this.sliderWrapper[e].offsetWidth/this.visibleItems[e])/2),this.sliderWrapperPos[e]=t*(-1*this.sliderWrapper[e].offsetWidth/this.visibleItems[e])+s,this.sliderWrapper[e].style.transform="translateX("+this.sliderWrapperPos[e]+"px)";for(let t of this.sliderItem[e])t.classList.remove(this.sliderClass+"__item--current");null!=this.sliderItem[e][t]&&this.sliderItem[e][t].classList.add(this.sliderClass+"__item--current"),null!=this.expectedSlide[e]&&this.sliderItem[e][this.expectedSlide[e]+this.clonedItems].classList.add(this.sliderClass+"__item--current"),this.sliderButton[e].forEach(e=>e.classList.remove(this.sliderClass+"__button--active")),i=null!=this.expectedSlide[e]?this.expectedSlide[e]:this.currentSlide[e],null!=this.sliderButton[e][i]&&this.sliderButton[e][i].classList.add(this.sliderClass+"__button--active"),this.sliderHeight()}sliderMoveInstantly(e){this.sliderWrapper[e].style.transitionDuration="0s",this.sliderMove(e);document.body.scrollHeight;this.sliderWrapper[e].style.transitionDuration="",this.transitioning[e]=!1}sliderMoveToExpected(e){null!=this.expectedSlide[e]&&(this.currentSlide[e]=this.expectedSlide[e],this.expectedSlide[e]=null,this.sliderMoveInstantly(e))}sliderMoveTransitionend(e,t){e.target==this.sliderWrapper[t]&&"transform"==e.propertyName&&(this.transitioning[t]=!1,this.sliderMoveToExpected(t))}sliderMoveSilently(e){if(null!=this.expectedSlide[e]){const t=getComputedStyle(this.sliderWrapper[e]).transform.match(/matrix.*\((.+)\)/)[1].split(", "),i=parseInt(t[4]);this.sliderWrapper[e].style.transitionDuration="0s",this.sliderWrapper[e].style.transform="translateX("+i+"px)";const s=-1*this.sliderWrapper[e].offsetWidth/this.visibleItems[e];this.currentSlide[e]<0?this.sliderWrapper[e].style.transform="translateX("+(i+s*(this.sliderItem[e].length-2*this.clonedItems))+"px)":this.sliderWrapper[e].style.transform="translateX("+(i-s*this.currentSlide[e])+"px)";document.body.scrollHeight;this.sliderWrapper[e].style.transitionDuration="",this.currentSlide[e]=this.expectedSlide[e],this.expectedSlide[e]=null}}visibleItemsCount(e){const t=window.getComputedStyle(this.sliderItem[e][0]);this.visibleItems[e]=Math.round(this.sliderWrapper[e].offsetWidth/(this.sliderItem[e][0].offsetWidth+parseInt(t.marginRight)+parseInt(t.marginRight)))}sliderResize(){for(let e=0;e<this.slider.length;e++){this.visibleItemsCount(e);let t=this.sliderItem[e].length-this.visibleItems[e];if(this.currentSlide[e]>t){for(;t<0;)t++;this.currentSlide[e]=t}this.sliderMove(e),this.sliderToggle(e)}}sliderHeight(){if(this.adaptiveHeight)for(let e=0;e<this.slider.length;e++)null!=this.sliderItem[e][this.currentSlide[e]+this.clonedItems]&&(this.sliderWrapper[e].style.maxHeight=this.sliderItem[e][this.currentSlide[e]+this.clonedItems].offsetHeight+"px")}sliderToggle(e){this.disableUnsuitable&&this.sliderItem[e].length-2*this.clonedItems<=this.visibleItems[e]?(this.sliderDisabled[e]=!0,this.slider[e].classList.add(this.sliderClass+"--disabled"),this.sliderWrapper[e].classList.add(this.sliderClass+"__wrapper--disabled"),this.sliderButton[e].forEach(e=>e.classList.add(this.sliderClass+"__button--disabled")),null!=this.sliderNextBtn[e]&&this.sliderNextBtn[e].classList.add(this.sliderClass+"__next--disabled"),null!=this.sliderPrevBtn[e]&&this.sliderPrevBtn[e].classList.add(this.sliderClass+"__prev--disabled")):(this.sliderDisabled[e]=!1,this.slider[e].classList.remove(this.sliderClass+"--disabled"),this.sliderWrapper[e].classList.remove(this.sliderClass+"__wrapper--disabled"),this.sliderButton[e].forEach(e=>e.classList.remove(this.sliderClass+"__button--disabled")),null!=this.sliderNextBtn[e]&&this.sliderNextBtn[e].classList.remove(this.sliderClass+"__next--disabled"),null!=this.sliderPrevBtn[e]&&this.sliderPrevBtn[e].classList.remove(this.sliderClass+"__prev--disabled"))}sliderAutoplayPause(e){this.autoplayTimer[e]=setInterval(()=>this.sliderNext(e),this.autoplayInterval)}sliderAutoplayUnpause(e){clearInterval(this.autoplayTimer[e])}sliderLinkClick(e){this.sliderLinkDragged&&e.preventDefault()}sliderDragStart(e,t){if(this.sliderDisabled[t])return;if(!this.interruptible&&this.transitioning[t])return;if(!this.draggable)return;if(!this.draggableWithMouse&&"touchstart"!=e.type)return;if(null!=e.target.closest(`.${this.sliderClass}__button`)||null!=e.target.closest(`.${this.sliderClass}__next`)||null!=e.target.closest(`.${this.sliderClass}__prev`))return;let i=e.clientX;"touchstart"==e.type&&(i=e.touches[0].clientX),this.draggedSlider=t,this.dragThresholdReached=!1,this.sliderDragged=!0;const s=getComputedStyle(this.sliderWrapper[t]).transform.match(/matrix.*\((.+)\)/)[1].split(", "),r=parseInt(s[4]);this.slider[t].classList.add(this.sliderClass+"--dragged"),this.sliderWrapper[t].classList.add(this.sliderClass+"__wrapper--dragged"),this.sliderWrapper[t].style.transform="translateX("+r+"px)",this.dragInitialPos=i,i==e.clientX&&(e.preventDefault(),this.sliderLinkDragged=!1),this.sliderWrapperDragOffset[t]=r,this.sliderWrapperPos[t]=r}sliderDragMove(e){if(this.sliderDragged){let t=e.clientX;"touchmove"==e.type&&(t=e.touches[0].clientX);const i=Math.abs(this.dragInitialPos-t);if(!this.dragThresholdReached&&i>this.dragOffsetThreshold){this.dragThresholdReached=!0,this.sliderDragPos=t,this.scrollYEnabled=!1;let i=[];for(let e of this.sliderItem[this.draggedSlider])i.push(e.offsetHeight);this.adaptiveHeight&&(this.sliderWrapper[this.draggedSlider].style.maxHeight=Math.max(...i)+"px"),t==e.clientX&&(this.sliderLinkDragged=!0);for(let e of this.sliderItem[this.draggedSlider])e.classList.add(this.sliderClass+"__item--current")}if(!this.dragThresholdReached)return;let s;s=t-this.sliderDragPos,this.sliderDragPos=t,this.sliderWrapperDragOffset[this.draggedSlider]+=s,this.sliderWrapper[this.draggedSlider].style.transform="translateX("+this.sliderWrapperDragOffset[this.draggedSlider]+"px)",this.sliderDragCheck()}}sliderDragCheck(){const e=this.sliderWrapper[this.draggedSlider].offsetWidth/this.visibleItems[this.draggedSlider];this.sliderWrapperPos[this.draggedSlider]<0?this.sliderWrapperPos[this.draggedSlider]+-1*this.sliderWrapperDragOffset[this.draggedSlider]<=e*-this.dragMoveCoefficient?(this.sliderDragEnd(),this.sliderPrev(this.draggedSlider)):this.sliderWrapperPos[this.draggedSlider]+-1*this.sliderWrapperDragOffset[this.draggedSlider]>=e*this.dragMoveCoefficient&&(this.sliderDragEnd(),this.sliderNext(this.draggedSlider)):this.sliderWrapperPos[this.draggedSlider]-this.sliderWrapperDragOffset[this.draggedSlider]<=e*-this.dragMoveCoefficient?(this.sliderDragEnd(),this.sliderPrev(this.draggedSlider)):this.sliderWrapperPos[this.draggedSlider]-this.sliderWrapperDragOffset[this.draggedSlider]>=e*this.dragMoveCoefficient&&(this.sliderDragEnd(),this.sliderNext(this.draggedSlider))}sliderDragEnd(){this.sliderDragged&&(this.sliderDragged=!1,this.slider[this.draggedSlider].classList.remove(this.sliderClass+"--dragged"),this.sliderWrapper[this.draggedSlider].classList.remove(this.sliderClass+"__wrapper--dragged"),this.sliderMove(this.draggedSlider))}scrollStart(e){this.scrollY=e.touches[0].clientY,this.scrollXEnabled=!0,this.scrollYEnabled=!0}scrollMove(e){this.scrollXEnabled&&this.scrollYEnabled&&Math.abs(this.scrollY-e.touches[0].clientY)>this.dragOffsetThreshold&&(this.scrollXEnabled=!1),this.scrollYEnabled?this.scrollXEnabled||this.sliderDragEnd():e.preventDefault()}}const slider=new Slider({adaptiveHeight:!1,clonedItems:1,sliderClass:"slider"}),submenu=document.querySelectorAll(".submenu"),submenuButton=document.querySelectorAll(".submenu__button");for(let e=0;e<submenu.length;e++)submenuButton[e].addEventListener("click",()=>submenuToggle(e));function submenuToggle(e){submenuButton[e].classList.contains("submenu__button--open")?submenuClose(e):submenuOpen(e)}function submenuOpen(e){submenu[e].classList.add("submenu--open"),submenuButton[e].classList.add("submenu__button--open")}function submenuClose(e){submenu[e].classList.remove("submenu--open"),submenuButton[e].classList.remove("submenu__button--open")}window.addEventListener("click",e=>{for(let t=0;t<submenu.length;t++)e.target.closest(".submenu")!=submenu[t]&&e.target.closest(".submenu__button")!=submenuButton[t]&&submenuClose(t)});const anchors=document.querySelectorAll('a[href^="#"]');let hash;for(let e of anchors)e.addEventListener("click",t=>anchorClicked(t,e.getAttribute("href")));function anchorClicked(e,t){e.preventDefault(),slider.sliderLinkDragged||"#"!=t&&(null==document.querySelector(t)&&(window.location.href="index"+t),hamburger.click(),scrollToAnchor(t))}function anchorWindowLoaded(){""!=hash&&null!=document.querySelector(""+hash)&&scrollToAnchor(hash)}function scrollToAnchor(e,t="smooth"){document.querySelector(""+e).scrollIntoView({behavior:t,block:"start"})}window.addEventListener("load",anchorWindowLoaded),window.location.href.indexOf("#")>-1&&(hash=window.location.hash,""!=hash&&("index"==document.querySelector(hash)&&(window.location.href="index"+hash),null!=document.querySelector(""+hash)&&(scrollToAnchor(hash,"auto"),history.replaceState("",document.title,window.location.pathname+window.location.search))));
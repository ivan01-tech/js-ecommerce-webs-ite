class Slider {

    static  sliderUp( element, duration){
           element.style.height = element.offsetHeight+'px'
   
           element.style.transitionProperty = 'height margin padding'
           element.style.transitionDuration = `${duration}ms`
           element.style.height = '0px'
           element.style.paddingTop = '0px'
           element.style.paddingBottom = '0px'
           element.style.marginTop = '0px'
           element.style.marginBottom = '0px'
           element.style.overflow = 'hidden'
           
           window.setTimeout(function(){
               element.style.display = 'none'
               element.style.removeProperty('height')
               element.style.removeProperty('margin-top')
               element.style.removeProperty('margin-bottom')
               element.style.removeProperty('padding-top')
               element.style.removeProperty('padding-bottom')
               element.style.removeProperty('transition-property')
               element.style.removeProperty('transition-duration')
               element.style.removeProperty('overflow')
   
           },duration)
   
       }
   
       static  sliderDown( element, duration){
   
           element.style.display = 'block'
           const height = element.offsetHeight
           element.style.height = '0px'
           element.style.paddingTop = '0px'
           element.style.paddingBottom = '0px'
           element.style.marginTop = '0px'
           element.style.marginBottom = '0px'
           element.style.overflow = 'hidden'
   
           element.offsetHeight //Pour Obliger le redessin par le navigateur
           
           element.style.transitionProperty = 'height padding margin'
           element.style.transitionDuration = `${duration}ms`
           element.style.height = height+'px'
   
           element.style.removeProperty('margin-top')
           element.style.removeProperty('margin-bottom')
           element.style.removeProperty('padding-top')
           element.style.removeProperty('padding-bottom')
   
           window.setTimeout(function(){
               element.style.removeProperty('padding-bottom')
               element.style.removeProperty('transition-property')
               element.style.removeProperty('transition-duration')
               element.style.removeProperty('overflow')
   
           },duration)
   
       }
   
   }
   

   
   let visible = true
   document.getElementById('slider').addEventListener('click', function(){
       if(visible){
           Slider.sliderUp(document.getElementById('article'), 600)
       }else{
           Slider.sliderDown(document.getElementById('article'), 600)
       }
       visible = !visible
       document.body.style.transitionProperty
   })
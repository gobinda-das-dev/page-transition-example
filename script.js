const $ = (e, p = document) => p.querySelector(e);
const $$ = (e, p = document) => p.querySelectorAll(e);


const enterBtn = $('.enter-btn');
const exitBtn = $('.exit-btn');
const overlayPath = $('.overlay__path');

let isAnimating = false;

const paths = {
   step1: {
      unfilled: 'M 0 100 V 100 Q 50 100 100 100 V 100 z',
      inBetween: {
         curve1: 'M 0 100 V 50 Q 50 0 100 50 V 100 z',
         curve2: 'M 0 100 V 50 Q 50 100 100 50 V 100 z'
      },
      filled: 'M 0 100 V 0 Q 50 0 100 0 V 100 z',
   },
   step2: {
      filled: 'M 0 0 V 100 Q 50 100 100 100 V 0 z',
      inBetween: {
         curve1: 'M 0 0 V 50 Q 50 0 100 50 V 0 z',
         curve2: 'M 0 0 V 50 Q 50 100 100 50 V 0 z'
      },
      unfilled: 'M 0 0 V 0 Q 50 0 100 0 V 0 z',
   }
};

const reveal = () => {

   if (isAnimating) return;
   isAnimating = true;

   page = 2;

   gsap.timeline({
      onComplete: () => isAnimating = false
   })
      .set(overlayPath, {
         attr: { d: paths.step1.unfilled }
      })
      .to(overlayPath, {
         duration: 0.8,
         ease: 'power4.in',
         attr: { d: paths.step1.inBetween.curve1 }
      }, 0)
      .to(overlayPath, {
         duration: 0.2,
         ease: 'power1',
         attr: { d: paths.step1.filled },
         //? --- Page change occurs here ---
      })

      .set(overlayPath, {
         attr: { d: paths.step2.filled }
      })

      .to(overlayPath, {
         duration: 0.2,
         ease: 'sine.in',
         attr: { d: paths.step2.inBetween.curve1 }
      })
      .to(overlayPath, {
         duration: 1,
         ease: 'power4',
         attr: { d: paths.step2.unfilled }
      });
}

const unreveal = () => {

   if (isAnimating) return;
   isAnimating = true;

   page = 1;

   gsap.timeline({
      onComplete: () => isAnimating = false
   })
      .set(overlayPath, {
         attr: { d: paths.step2.unfilled }
      })
      .to(overlayPath, {
         duration: 0.8,
         ease: 'power4.in',
         attr: { d: paths.step2.inBetween.curve2 }
      }, 0)
      .to(overlayPath, {
         duration: 0.2,
         ease: 'power1',
         attr: { d: paths.step2.filled },
         //? --- Page change occurs here ---
      })
      // now reveal
      .set(overlayPath, {
         attr: { d: paths.step1.filled }
      })
      .to(overlayPath, {
         duration: 0.2,
         ease: 'sine.in',
         attr: { d: paths.step1.inBetween.curve2 }
      })
      .to(overlayPath, {
         duration: 1,
         ease: 'power4',
         attr: { d: paths.step1.unfilled }
      });
}



enterBtn.onclick = reveal;
exitBtn.onclick = unreveal;
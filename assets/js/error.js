const pixelType = {
    blank: 0,
    fill: 1,
    fillFade: 2,
    fade: 3
};

const pixelGrid = [
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 2, 2, 2, 1, 1, 1, 1, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 2, 1, 0, 0, 1, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 2, 1, 1, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 2, 2, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 3, 0, 1, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 3, 3, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0]
];

const $errorContainer = document.querySelector('.error-404');

for (const line of pixelGrid) {
    for (const pixel of line) {
        const $pix = document.createElement('i');
        
        switch(pixel) {
            default:
            case pixelType.blank:
                $pix.classList.add('blank')
                break;
            case pixelType.fill:
                break;
            case pixelType.fillFade:
                $pix.classList.add('nf');
                break;
            case pixelType.fade:
                $pix.classList.add('blank', 'nf');
                break;
        }
        
        $errorContainer.appendChild($pix);
    }
}

const pixels = $('.error-404 i');
const filled = pixels.not('.blank');
const filledCount = filled.length;

let timeout = null;
let count = 0;

filled.attr('data-delay', () => Math.floor(Math.random() * filledCount));

window.addEventListener('load', function() {

    filled.each(function() {

        const pixel = $(this);
        const delay = parseInt(pixel.data('delay'), 10);

        timeout = setTimeout(function() {

            count++;
            pixel.stop().animate({
                opacity: 1
            }, 600);

            if (count === filledCount) {
                clearTimeout(timeout);
                setTimeout(function() {

                    pixels.each(function(index) {

                        if (this.className === 'blank nf') {
                            this.setAttribute('data-delay', index);
                        }

                        const pixel = $(this);
                        const delay = parseInt(pixel.data('delay'), 10);

                        setTimeout(function() {

                            if (pixel.hasClass('nf')) {
                                pixel.addClass('nf-text').stop().animate({
                                    opacity: 1
                                }, 800);
                            } else {
                                pixel.stop().animate({
                                    opacity: 0.02
                                }, 800);
                            }

                        }, delay * 30); // 25 or even 15

                    });

                }, 3000);
            }

        }, delay * 50); // 25

    });

});

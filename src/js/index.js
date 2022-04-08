$(document).ready(Core);

function Core()
{
    SetTabSwitcher();
    SetModal();
    InitOwlCarousel();
    InitLightbox();
    InitMask();
    ShowMenu();
    CloseMenu();
}

function InitMask()
{
    $('#form-callback .phone input').mask("+7(999)999-99-99", {placeholder:"+7(___)___-__-__"});
}

function InitLightbox()
{
    $('.licenses-carousel .carousel-item a').simpleLightbox();
}

function InitOwlCarousel()
{
    var main_carousel = $(".main-carousel").owlCarousel(
        {
            items: 1,
            loop: true,
            dots: true,
            autoplay: true,
            smartSpeed: 1000
        }
    );

    $('.btn-next.btn-main-carousel').click(function() {
        main_carousel.trigger('next.owl.carousel');
    });
    $('.btn-prev.btn-main-carousel').click(function() {
        main_carousel.trigger('prev.owl.carousel');
    });

    var licenses_carousel = $(".licenses-carousel").owlCarousel(
        {
            items: 4,
            loop: true,
            dots: false,
            autoplay: true,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1024: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        }
    );

    var clients_carousel = $(".clients-carousel").owlCarousel(
        {
            items: 5,
            loop: true,
            dots: false,
            autoplay: true,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 2
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1024: {
                    items: 4
                },
                1200:{
                    items: 5
                }
            }
        }
    );
}

function SetTabSwitcher()
{
    $('.btn__tab__switch').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active'))
        {
            return;
        }

        $('.btn__tab__switch').removeClass('active');
        $(this).addClass('active');

        let targetTab = $(this).attr('target');

        SwitchTab(targetTab)
    })
}

function SwitchTab(target)
{
    
    $('.tab.active').animate({
        opacity: 0
    }, 500, function() {
        $('.tab.active').removeClass('active');

        $(`[tab-name="${target}"]`).css('opacity', 0);
        $(`[tab-name="${target}"]`).addClass('active');
        
        let tabHeight = $(`[tab-name="${target}"]`)[0].clientHeight;
        $(`[tab-name="${target}"]`).closest('.tab__viewer').css('height', `${tabHeight}px`)

        $(`[tab-name="${target}"]`).animate({
            opacity: 1
        }, 500)
    })
}

function SetModal()
{
    $('[modal]').on('click', function()
    {
        let modalId = $(this).attr('modal');
        ShowModal(`#${modalId}`);
    });

    $('.modal__dialog').on('click', function(e) {
        e.stopPropagation();
    });

    $('.modal').on('click', function() {
        HideModal(`#${$(this).attr('id')}`);
    });

    $('.btn__modal__close').on('click', function ()
    {
        let modalId = $(this).closest('.modal').attr('id');
        HideModal(`#${modalId}`);
    });
}

function ShowModal(modalId)
{
    $(modalId + ' .modal__dialog').off('animationend');
    $(modalId).addClass('active');
    $('body').addClass('lock');
    $(modalId + ' .modal__dialog').addClass('fadeInDownBig')
    
    $('body').append('<div class="modal__backdrop"></div>');
    setTimeout(function() {
        $('.modal__backdrop').addClass('active');
    }, 50)
}

function HideModal(modalId)
{
    $(modalId + ' .modal__dialog').removeClass('fadeInDownBig');
    $(modalId + ' .modal__dialog').addClass('fadeOutDownBig');
    $('.modal__backdrop').removeClass('active');
    $('body').removeClass('lock');
    $(modalId + ' .modal__dialog').on('animationend', function() {
        if (!$(modalId).hasClass('active'))
        {
            return;
        }
        $(modalId).removeClass('active');
        $(modalId + ' .modal__dialog').removeClass('fadeOutDownBig');
        $('.modal__backdrop').remove();
    });
}

function ShowMenu()
{
    $('.btn__menu').on('click', function(e) {
        e.preventDefault();
        if ($('.navbar').hasClass('active'))
        {
            return;
        }
        $('.navbar').addClass('active');
    })
}

function CloseMenu()
{
    $('.btn-close-menu').on('click', function(e) {
        e.preventDefault();
        if ($('.navbar').hasClass('active'))
        {
            $('.navbar').removeClass('active');
        }
    })
}
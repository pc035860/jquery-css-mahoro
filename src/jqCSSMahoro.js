import cssTime from 'css-time';
import reqTimeout from 'nk-request-timeout';

const getAnimDuration = ($elm) => $elm.css('animation-duration') || '0s';

const getAnimDelay = ($elm) => $elm.css('animation-delay') || '0s';

const showElm = ($elm, opt) => {
  $elm.css('display', typeof opt === 'string' ? opt : 'block');
};

const hideElm = ($elm, opt) => $elm.css('display', 'none');

export default function (jQuery) {
  const $ = jQuery;

  const EVT_ANIMATIONEND = 'animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd';

  $.fn.cssMahoro = function (animClass, options) {
    const promises = [];

    this.each(function () {
      promises.push(
        runCSSAnimation($(this), animClass, options)
      );
    });

    return $.when(...promises);
  };

  function runCSSAnimation($elm, animClass, options = {}) {
    const dfd = $.Deferred();

    if (options.show) {
      showElm($elm, options.show);
    }
    $elm.on(EVT_ANIMATIONEND, onAnimationend).addClass(animClass);

    const duration = cssTime.from(getAnimDuration($elm));
    const delay = cssTime.from(getAnimDelay($elm));
    const timeoutMs = duration + delay;
    const timeoutHandle = reqTimeout(timeoutMs, onAnimationend);

    return dfd.promise();

    function onAnimationend($evt) {
      $elm.removeClass(animClass).off(EVT_ANIMATIONEND, onAnimationend);
      reqTimeout.clear(timeoutHandle);
      if (options.hide) {
        hideElm($elm, options.hide);
      }
      dfd.resolve($elm[0]);
    }
  }
}

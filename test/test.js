/* eslint
  prefer-arrow-callback: 0,
  no-unused-expressions: 0,
  max-len: 0
*/
/* global
  describe, it, beforeEach,
  expect,
  $,
  __html__
*/

const template = __html__['test/template.html'];

const className = {
  in: 'fadeIn',
  out: 'fadeOut',
  duration: 'duration-0s',
  delay: 'delay-100ms'
};
const timeoutOffset = 50;

const resetDOM = () => {
  document.body.innerHTML = template;
};

describe('environment', function () {
  it('should have template properly retrieved', function () {
    expect(template).to.be.a('string');
  });

  it('jQuery is presented', function () {
    expect($).to.be.a('function');
    expect($.fn).to.be.an('object');
    expect($.fn.jquery).to.be.a('string');
  });

  describe('template', function () {
    beforeEach(function () {
      resetDOM();
    });

    it('should properly get into DOM', function () {
      const $elm = $('.test');
      expect($elm.length).to.equal(1);
    });

    it('should have animation properties with animation class', function () {
      const $elm = $('.test');
      $elm.addClass(className.in);
      expect($elm.css('animation-duration')).to.equal('0.1s');
    });
  });
});

describe('$(...).cssMahoro', function () {
  it('should be defined', function () {
    const cssMahoro = $.fn.cssMahoro;

    expect($.isFunction(cssMahoro)).to.be.true;
  });

  describe('runtime', function () {
    beforeEach(function () {
      resetDOM();
    });

    describe('basic', function () {
      it('should return promise when called', function () {
        const $elm = $('.test');
        const promise = $elm.cssMahoro(className.in);

        expect(promise).to.be.an('object');
        expect(promise.then).to.be.a('function');
      });

      it('should have animation class on element', function () {
        const $elm = $('.test');
        $elm.cssMahoro(className.in);

        expect($elm.hasClass(className.in)).to.be.true;
      });

      it('should have animation class on element before finish', function (done) {
        this.timeout(50 + timeoutOffset);

        const $elm = $('.test');
        $elm.cssMahoro(className.in);
        setTimeout(() => {
          expect($elm.hasClass(className.in)).to.be.true;
          done();
        }, 50);
      });

      it('should have animation class removed on finish', function (done) {
        this.timeout(100 + timeoutOffset);

        const $elm = $('.test');
        $elm.cssMahoro(className.in)
        .then(function () {
          expect($elm.hasClass(className.in)).to.be.false;
          done();
        });
      });
    });

    describe('promise', function () {
      it('should be chainable', function (done) {
        this.timeout(200 + timeoutOffset);

        const $elm = $('.test');
        $elm.cssMahoro(className.in)
        .then(() => {
          const p = $elm.cssMahoro(className.out);

          expect($elm.hasClass(className.out)).to.be.true;

          setTimeout(() => {
            expect($elm.hasClass(className.out)).to.be.true;
          }, 50);

          return p;
        })
        .then(() => {
          expect($elm.hasClass(className.out)).to.be.false;
          done();
        });
      });

      it('should be able to run in parallel', function (done) {
        this.timeout(100 + timeoutOffset);

        const parallelPromise = $('.test, .test2').cssMahoro('fadeIn');

        expect($('.test').hasClass(className.in)).to.be.true;
        expect($('.test2').hasClass(className.in)).to.be.true;

        parallelPromise.then(() => {
          expect($('.test').hasClass(className.in)).to.be.false;
          expect($('.test2').hasClass(className.in)).to.be.false;
          done();
        });
      });
    });

    describe('options', function () {
      describe('show', function () {
        it('should set `display` to `block` before start when given `true`', function (done) {
          this.timeout(100 + timeoutOffset);

          const $elm = $('.test').css('display', 'none');

          expect($elm.css('display')).to.equal('none');

          const promise = $elm.cssMahoro(className.in, { show: true });

          expect($elm.css('display')).to.equal('block');

          promise.then(() => {
            expect($elm.css('display')).to.equal('block');
            expect($elm.hasClass(className.in)).to.be.false;
            done();
          });
        });

        ['inline', 'inline-block', 'block'].forEach(function (display) {
          it(`should set \`display\` to \`${display}\` before start when given \`${display}\``, function (done) {
            this.timeout(100 + timeoutOffset);

            const $elm = $('.test').css('display', 'none');

            expect($elm.css('display')).to.equal('none');

            const promise = $elm.cssMahoro(className.in, { show: display });

            expect($elm.css('display')).to.equal(display);

            promise.then(() => {
              expect($elm.css('display')).to.equal(display);
              expect($elm.hasClass(className.in)).to.be.false;
              done();
            });
          });
        });
      });
      describe('hide', function () {
        it('should set `display` to `none` after finish when given `true`', function (done) {
          this.timeout(100 + timeoutOffset);

          const $elm = $('.test');

          expect($elm.css('display')).to.not.equal('none');

          const promise = $elm.cssMahoro(className.out, { hide: true });

          expect($elm.css('display')).to.not.equal('none');

          promise.then(() => {
            expect($elm.css('display')).to.equal('none');
            expect($elm.hasClass(className.out)).to.be.false;
            done();
          });
        });
      });
    });
  });
});

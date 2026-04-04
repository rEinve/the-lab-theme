(function () {
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-subscribe-trigger]"));

    if (!triggers.length) {
        return;
    }

    var currentScript = document.currentScript;
    var imageUrl = currentScript
        ? new URL("../images/woman-reading-emeil-newsletter.svg", currentScript.src).href
        : "./assets/images/woman-reading-emeil-newsletter.svg";
    var formAction = "https://assets.mailerlite.com/jsonp/2241312/forms/183676980906952679/subscribe";
    var modal = document.querySelector("[data-subscribe-modal]");
    var lastTrigger = null;

    if (!modal) {
        modal = document.createElement("dialog");
        modal.className = "subscribe-modal";
        modal.dataset.subscribeModal = "true";
        modal.setAttribute("aria-labelledby", "subscribe-modal-title");
        modal.innerHTML = [
            '<div class="subscribe-modal__surface">',
            '  <button class="subscribe-modal__close" type="button" aria-label="Close subscribe modal" data-subscribe-close>',
            '    <span aria-hidden="true">×</span>',
            "  </button>",
            '  <div class="subscribe-modal__media">',
            '    <img src="' + imageUrl + '" alt="Woman reading a weekly positivity newsletter email" />',
            "  </div>",
            '  <div class="subscribe-modal__content">',
            '    <div class="ml-subscribe-form ml-subscribe-form-39383671" data-mailerlite-wrapper data-mailerlite-context="modal">',
            '      <div class="row-form subscribe-modal__body">',
            '        <span class="card-kicker">Updates</span>',
            '        <h2 id="subscribe-modal-title" class="display-s">Subscribe for thoughtful updates</h2>',
            '        <p class="subscribe-modal__copy">I&apos;ll send the best essays, notes, and useful project updates to your inbox. Calm signal, not noise.</p>',
            '        <form class="subscribe-modal__form ml-block-form" action="' + formAction + '" data-code="" data-newsletter-form data-mailerlite-form method="post" target="_blank">',
            '          <div class="ml-form-formContent">',
            '            <div class="ml-form-fieldRow ml-last-item">',
            '              <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">',
            '                <label class="newsletter-form__field">',
            '                  <span class="field-label">Email</span>',
            '                  <input class="input" aria-label="Email" aria-required="true" autocomplete="email" name="fields[email]" placeholder="Your email address" type="email" />',
            "                </label>",
            "              </div>",
            "            </div>",
            "          </div>",
            '          <div class="newsletter-form__legal">',
            '            <p class="field-hint">You can unsubscribe anytime. For more details, review our Privacy Policy.</p>',
            "          </div>",
            '          <div class="ml-form-checkboxRow newsletter-form__consent ml-validate-required">',
            '            <label class="checkbox">',
            '              <input aria-label="Opt in to receive news and updates" data-newsletter-consent type="checkbox" />',
            '              <span class="label-description">Opt in to receive news and updates.</span>',
            "            </label>",
            "          </div>",
            '          <input type="hidden" name="ml-submit" value="1" />',
            '          <input type="hidden" name="anticsrf" value="true" />',
            '          <div class="subscribe-modal__actions">',
            '            <div class="ml-form-embedSubmit">',
            '              <button class="btn primary" type="submit">Join updates</button>',
            '              <button class="btn loading" disabled hidden type="button" aria-hidden="true">Joining...</button>',
            "            </div>",
            '            <button class="btn subscribe-modal__button--secondary" type="button" data-subscribe-close>Not now</button>',
            "          </div>",
            "        </form>",
            "      </div>",
            '      <div class="ml-form-successBody row-success subscribe-modal__success" hidden>',
            '        <span class="card-kicker">You&apos;re in</span>',
            '        <h2 class="display-s">Thank you for subscribing</h2>',
            '        <p class="subscribe-modal__copy">Your email is on the list. New essays and thoughtful notes will land in your inbox soon.</p>',
            "      </div>",
            "    </div>",
            "  </div>",
            "</div>"
        ].join("");
        document.body.appendChild(modal);
    }

    if (modal.dataset.subscribeManaged === "true") {
        return;
    }

    function focusFirstInput() {
        var input = modal.querySelector('input[type="email"]');

        if (input) {
            window.setTimeout(function () {
                input.focus();
            }, 0);
        }
    }

    function openModal(trigger) {
        lastTrigger = trigger || null;
        document.body.classList.add("modal-open");

        if (typeof modal.showModal === "function") {
            if (!modal.open) {
                modal.showModal();
            }
        } else {
            modal.setAttribute("open", "");
        }

        focusFirstInput();
    }

    function closeModal() {
        if (typeof modal.close === "function" && modal.open) {
            modal.close();
            return;
        }

        modal.removeAttribute("open");
        document.body.classList.remove("modal-open");

        if (lastTrigger) {
            lastTrigger.focus();
            lastTrigger = null;
        }
    }

    modal.querySelectorAll("[data-subscribe-close]").forEach(function (button) {
        button.addEventListener("click", function () {
            closeModal();
        });
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    modal.addEventListener("cancel", function () {
        document.body.classList.remove("modal-open");
    });

    modal.addEventListener("close", function () {
        document.body.classList.remove("modal-open");

        if (lastTrigger) {
            lastTrigger.focus();
            lastTrigger = null;
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.hasAttribute("open")) {
            closeModal();
        }
    });

    triggers.forEach(function (trigger) {
        trigger.dataset.subscribeReady = "true";
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            openModal(trigger);
        });
    });

    modal.dataset.subscribeManaged = "true";
})();

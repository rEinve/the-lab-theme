(function () {
    var previewChoiceKey = "publii-preview-cookie-choice";
    var privacyPolicyUrl = "https://themeshak.com/privacy-policy/";

    function hasStoredConsent() {
        try {
            for (var index = 0; index < window.localStorage.length; index += 1) {
                var key = window.localStorage.key(index);

                if (key && key.indexOf("publii-gdpr-allowed-cookies") === 0) {
                    return true;
                }
            }
        } catch (error) {
            return false;
        }

        return false;
    }

    function isFilePreview() {
        return window.location.protocol === "file:";
    }

    function hasPreviewChoice() {
        try {
            return window.sessionStorage.getItem(previewChoiceKey) === "done";
        } catch (error) {
            return false;
        }
    }

    function markPreviewChoice() {
        try {
            window.sessionStorage.setItem(previewChoiceKey, "done");
        } catch (error) {
            /* ignore preview storage failures */
        }
    }

    function toggleClass(element, className, shouldHaveClass) {
        if (!element) {
            return;
        }

        if (shouldHaveClass && !element.classList.contains(className)) {
            element.classList.add(className);
        }

        if (!shouldHaveClass && element.classList.contains(className)) {
            element.classList.remove(className);
        }
    }

    function setAriaHidden(element, value) {
        if (!element) {
            return;
        }

        if (element.getAttribute("aria-hidden") !== value) {
            element.setAttribute("aria-hidden", value);
        }
    }

    function setHiddenAttribute(element, shouldHide) {
        if (!element) {
            return;
        }

        if (shouldHide) {
            if (!element.hasAttribute("hidden")) {
                element.setAttribute("hidden", "");
            }

            return;
        }

        if (element.hasAttribute("hidden")) {
            element.removeAttribute("hidden");
        }
    }

    function initCookieBanner() {
        var wrapper = document.querySelector(".pcb");
        var banner = wrapper ? wrapper.querySelector(".pcb__banner") : null;
        var acceptButton = banner ? banner.querySelector(".pcb__btn--accept") : null;
        var rejectButton = banner ? banner.querySelector(".pcb__btn--reject") : null;
        var configureButton = banner ? banner.querySelector(".pcb__btn--configure") : null;
        var privacyLink = banner ? banner.querySelector(".pcb__txt a") : null;

        if (!wrapper || !banner) {
            return;
        }

        if (privacyLink) {
            privacyLink.href = privacyPolicyUrl;
            privacyLink.textContent = "Privacy Policy";
        }

        if (acceptButton) {
            acceptButton.textContent = "Accept cookies";
        }

        function forcePreviewBanner() {
            toggleClass(banner, "is-visible", true);
            setAriaHidden(banner, "false");
            toggleClass(wrapper, "pcb--active", true);
            setHiddenAttribute(wrapper, false);
        }

        function syncBannerState() {
            var isVisible = banner.classList.contains("is-visible");
            var consentWasSaved = hasStoredConsent();

            if (isFilePreview() && !hasPreviewChoice()) {
                forcePreviewBanner();
                return;
            }

            toggleClass(wrapper, "pcb--active", isVisible);

            if (consentWasSaved && !isVisible) {
                setHiddenAttribute(wrapper, true);
                return;
            }

            setHiddenAttribute(wrapper, false);
        }

        var observer = new MutationObserver(syncBannerState);
        observer.observe(banner, {
            attributes: true,
            attributeFilter: ["class", "aria-hidden"]
        });

        [acceptButton, rejectButton, configureButton].forEach(function (button) {
            if (!button) {
                return;
            }

            button.addEventListener("click", function () {
                if (isFilePreview()) {
                    markPreviewChoice();
                }
            });
        });

        window.addEventListener("load", function () {
            window.setTimeout(syncBannerState, 120);
        });

        window.addEventListener("storage", syncBannerState);
        syncBannerState();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCookieBanner, { once: true });
    } else {
        initCookieBanner();
    }
})();

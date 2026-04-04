(function () {
    var navs = Array.prototype.slice.call(document.querySelectorAll(".site-nav"));

    if (!navs.length) {
        return;
    }

    navs.forEach(function (nav, index) {
        if (nav.dataset.navReady === "true") {
            return;
        }

        var toggle = nav.querySelector(".nav-toggle");
        var close = nav.querySelector(".nav-close");
        var drawer = nav.querySelector(".nav-drawer");
        var overlay = nav.querySelector(".nav-overlay");

        if (!toggle || !close || !drawer || !overlay) {
            return;
        }

        var drawerId = drawer.id || ("site-nav-drawer-" + (index + 1));
        drawer.id = drawerId;
        toggle.setAttribute("aria-controls", drawerId);

        function setOpenState(isOpen) {
            nav.classList.toggle("is-open", isOpen);
            document.body.classList.toggle("nav-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
            drawer.setAttribute("aria-hidden", String(!isOpen));
            overlay.setAttribute("aria-hidden", String(!isOpen));
        }

        function openDrawer() {
            setOpenState(true);
            close.focus();
        }

        function closeDrawer(returnFocus) {
            var wasOpen = nav.classList.contains("is-open");

            setOpenState(false);

            if (returnFocus && wasOpen) {
                toggle.focus();
            }
        }

        toggle.addEventListener("click", function () {
            if (nav.classList.contains("is-open")) {
                closeDrawer(true);
                return;
            }

            openDrawer();
        });

        close.addEventListener("click", function () {
            closeDrawer(true);
        });

        overlay.addEventListener("click", function () {
            closeDrawer(true);
        });

        nav.addEventListener("keydown", function (event) {
            if (event.key !== "Escape" || !nav.classList.contains("is-open")) {
                return;
            }

            event.preventDefault();
            closeDrawer(true);
        });

        Array.prototype.slice.call(nav.querySelectorAll("a, [data-subscribe-trigger]")).forEach(function (target) {
            target.addEventListener("click", function () {
                if (window.matchMedia("(max-width: 840px)").matches) {
                    closeDrawer(false);
                }
            });
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 840) {
                closeDrawer(false);
            }
        });

        nav.dataset.navReady = "true";
        setOpenState(false);
    });
})();

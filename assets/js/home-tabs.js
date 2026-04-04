(function () {
    function getGroups(root) {
        return Array.prototype.slice.call(root.querySelectorAll("[data-home-tabs]"));
    }

    function getTabs(group) {
        return Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    }

    function getPanels(group) {
        return Array.prototype.slice.call(group.querySelectorAll('[role="tabpanel"]'));
    }

    function activate(group, nextTab, moveFocus) {
        var tabs = getTabs(group);
        var panels = getPanels(group);

        tabs.forEach(function (tab) {
            var isSelected = tab === nextTab;
            var controlsId = tab.getAttribute("aria-controls");
            var panel = controlsId
                ? panels.find(function (candidate) {
                      return candidate.id === controlsId;
                  })
                : null;

            tab.setAttribute("aria-selected", String(isSelected));
            tab.setAttribute("tabindex", isSelected ? "0" : "-1");

            if (panel) {
                panel.hidden = !isSelected;
            }
        });

        if (moveFocus) {
            nextTab.focus();
        }
    }

    function onKeydown(event) {
        var currentTab = event.currentTarget;
        var group = currentTab.closest("[data-home-tabs]");

        if (!group) {
            return;
        }

        var tabs = getTabs(group);
        var currentIndex = tabs.indexOf(currentTab);

        if (currentIndex === -1) {
            return;
        }

        var nextIndex = currentIndex;

        switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
                nextIndex = (currentIndex + 1) % tabs.length;
                break;
            case "ArrowLeft":
            case "ArrowUp":
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                break;
            case "Home":
                nextIndex = 0;
                break;
            case "End":
                nextIndex = tabs.length - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        activate(group, tabs[nextIndex], true);
    }

    function init(root) {
        getGroups(root).forEach(function (group) {
            if (group.dataset.homeTabsReady === "true") {
                return;
            }

            var tabs = getTabs(group);

            if (!tabs.length) {
                return;
            }

            var initialTab =
                tabs.find(function (tab) {
                    return tab.getAttribute("aria-selected") === "true";
                }) || tabs[0];

            tabs.forEach(function (tab) {
                tab.addEventListener("click", function () {
                    activate(group, tab, false);
                });
                tab.addEventListener("keydown", onKeydown);
            });

            activate(group, initialTab, false);
            group.dataset.homeTabsReady = "true";
        });
    }

    init(document);
})();

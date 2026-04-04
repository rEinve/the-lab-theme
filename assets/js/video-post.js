(function () {
    function toEmbedUrl(rawUrl) {
        if (!rawUrl) {
            return '';
        }

        var value = String(rawUrl).trim();

        if (!value) {
            return '';
        }

        try {
            var parsed = new URL(value);
            var host = parsed.hostname.replace(/^www\./, '');
            var videoId = '';

            if (host === 'youtu.be') {
                videoId = parsed.pathname.replace(/^\/+/, '').split('/')[0];
            } else if (host === 'youtube.com' || host === 'm.youtube.com') {
                if (parsed.pathname === '/watch') {
                    videoId = parsed.searchParams.get('v') || '';
                } else if (parsed.pathname.indexOf('/embed/') === 0) {
                    videoId = parsed.pathname.split('/embed/')[1] || '';
                } else if (parsed.pathname.indexOf('/shorts/') === 0) {
                    videoId = parsed.pathname.split('/shorts/')[1] || '';
                } else if (parsed.pathname.indexOf('/live/') === 0) {
                    videoId = parsed.pathname.split('/live/')[1] || '';
                }
            }

            videoId = videoId.split(/[?&/]/)[0];

            if (!videoId) {
                return '';
            }

            return 'https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?rel=0';
        } catch (error) {
            return '';
        }
    }

    function slugify(value) {
        return String(value || '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }

    function hydrateVideoPlayers(scope) {
        var roots = Array.from(scope.querySelectorAll('[data-video-embed-root]'));

        roots.forEach(function (root) {
            if (root.dataset.videoReady === 'true') {
                return;
            }

            var embedUrl = toEmbedUrl(root.dataset.videoEmbedUrl);

            if (!embedUrl) {
                root.dataset.videoReady = 'false';
                return;
            }

            var iframe = document.createElement('iframe');
            iframe.src = embedUrl;
            iframe.title = root.dataset.videoEmbedTitle || 'YouTube video player';
            iframe.loading = 'eager';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.allowFullscreen = true;

            root.innerHTML = '';
            root.appendChild(iframe);
            root.dataset.videoReady = 'true';
        });
    }

    function buildEpisodeNav(scope) {
        var content = scope.querySelector('[data-episode-content]');
        var nav = scope.querySelector('[data-episode-nav]');
        var navLinks = scope.querySelector('[data-episode-nav-links]');

        if (!content || !nav || !navLinks || nav.dataset.navReady === 'true') {
            return;
        }

        var headings = Array.from(content.querySelectorAll('h2'));

        if (!headings.length) {
            nav.hidden = true;
            nav.dataset.navReady = 'true';
            return;
        }

        navLinks.innerHTML = '';

        headings.forEach(function (heading, index) {
            var text = (heading.textContent || '').trim();

            if (!text) {
                return;
            }

            if (!heading.id) {
                heading.id = slugify(text) || 'episode-section-' + (index + 1);
            }

            var link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = text;
            navLinks.appendChild(link);
        });

        nav.hidden = navLinks.childElementCount === 0;
        nav.dataset.navReady = 'true';
    }

    function init(scope) {
        var root = scope || document;

        hydrateVideoPlayers(root);

        Array.from(root.querySelectorAll('.video-post')).forEach(function (post) {
            buildEpisodeNav(post);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            init(document);
        }, { once: true });
    } else {
        init(document);
    }
})();

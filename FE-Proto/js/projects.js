/**
 * ibzie.dev — Projects page
 * Loads projects from API, renders cards, infinite scroll.
 */
(function () {
  'use strict';

  var grid = document.getElementById('projects-grid');
  var sentinel = document.getElementById('scroll-sentinel');
  if (!grid || !sentinel) return;

  var offset = 0;
  var loading = false;
  var done = false;

  function renderCard(p) {
    var card = document.createElement('article');
    card.className = 'project-card reveal';

    var tagsHtml = (p.tags || [p.lang]).map(function (t) {
      return '<span class="tag">' + t + '</span>';
    }).join('');

    var linksHtml = '<a href="' + (p.githubUrl || '#') + '" target="_blank" rel="noopener">Repo &#8599;</a>';
    if (p.demoUrl) {
      linksHtml += '<a href="' + p.demoUrl + '" target="_blank" rel="noopener">Demo &#8599;</a>';
    }

    var badgeHtml = p.featured ? '<span class="featured-badge">Featured</span>' : '';

    card.innerHTML =
      '<h3>' + badgeHtml + p.name + '</h3>' +
      '<p class="desc">' + p.desc + '</p>' +
      '<div class="tags">' + tagsHtml + '</div>' +
      '<div class="card-links">' + linksHtml + '</div>';

    return card;
  }

  function appendCards(cards) {
    cards.forEach(function (p, i) {
      var card = renderCard(p);
      card.classList.add('reveal-delay-' + Math.min(i % 4, 4));
      grid.appendChild(card);

      requestAnimationFrame(function () {
        card.classList.add('revealed');
      });
    });
  }

  function loadMore() {
    if (loading || done) return;
    loading = true;

    IbzApi.fetchProjects(offset).then(function (data) {
      var projects = data.projects;
      if (projects && projects.length) {
        appendCards(projects);
        offset += projects.length;
      }
      if (!data.hasMore) {
        done = true;
        sentinel.style.display = 'none';
      }
      loading = false;
    }).catch(function () {
      sentinel.innerHTML = '<p class="load-error">Failed to load. <button class="retry-btn" onclick="location.reload()">Retry</button></p>';
      loading = false;
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  }, { rootMargin: '0px 0px 200px 0px' });

  observer.observe(sentinel);
  loadMore();
})();

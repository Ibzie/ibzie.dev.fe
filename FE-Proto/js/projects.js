/**
 * ibzie.dev — Projects page
 * Loads repos via GitHub API, renders cards.
 */
(function () {
  'use strict';

  var grid = document.getElementById('projects-grid');
  var sentinel = document.getElementById('scroll-sentinel');
  if (!grid || !sentinel) return;

  var loaded = false;

  function renderCard(p) {
    var card = document.createElement('article');
    card.className = 'project-card reveal';

    var tagsHtml = '<span class="tag">' + (p.lang || 'Code') + '</span>';

    var linksHtml = '<a href="' + p.url + '" target="_blank" rel="noopener">Repo &#8599;</a>';
    if (p.homepage) {
      linksHtml += '<a href="' + p.homepage + '" target="_blank" rel="noopener">Demo &#8599;</a>';
    }

    var badgeHtml = p.featured ? '<span class="featured-badge">Featured</span>' : '';

    card.innerHTML =
      '<h3>' + badgeHtml + p.name + '</h3>' +
      '<p class="desc">' + p.desc + '</p>' +
      '<div class="tags">' + tagsHtml + '</div>' +
      '<div class="card-links">' + linksHtml + '</div>';

    return card;
  }

  function load() {
    if (loaded) return;
    loaded = true;
    sentinel.innerHTML = '';

    IbzApi.fetchProjects().then(function (data) {
      var projects = data.projects;
      if (!projects || !projects.length) {
        grid.innerHTML = '<p class="load-error">No projects found.</p>';
        return;
      }

      projects.forEach(function (p, i) {
        var card = renderCard(p);
        card.classList.add('reveal-delay-' + Math.min(i % 4, 4));
        grid.appendChild(card);

        requestAnimationFrame(function () {
          card.classList.add('revealed');
        });
      });

      sentinel.style.display = 'none';
    }).catch(function () {
      sentinel.innerHTML = '<p class="load-error">Failed to load projects. <button class="retry-btn" onclick="location.reload()">Retry</button></p>';
    });
  }

  load();
})();
